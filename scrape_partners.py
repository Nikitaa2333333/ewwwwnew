import requests
from bs4 import BeautifulSoup
import json
import re

def scrape_all_partners(url):
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    records = soup.find_all('div', class_='t-rec')
    partners_data = []
    current_category = "Организаторы"
    
    # Categories seen on site
    category_keywords = [
        "Организаторы", "Кондитер", "Ведущие", "Декораторы", 
        "Фотографы", "Видеографы", "Спецэффекты", "Диджеи", 
        "Стилисты / Визажисты", "Стилисты", "Визажисты"
    ]

    for rec in records:
        # Check for header
        title_div = rec.find('div', class_=re.compile(r't017__title|t-title'))
        if title_div:
            text = title_div.get_text(strip=True)
            if any(kw.lower() in text.lower() for kw in category_keywords) and len(text) < 50:
                current_category = text
                # print(f"Found Category: {current_category}")

        # Partner cards - check for multiple possible Tilda card classes
        cards = rec.find_all('div', class_=re.compile(r't-card__col|t686__col|t686__cell|t-feed__post'))
        
        # If no cards found, maybe it's a different block type
        if not cards:
            # Some Tilda blocks use t-col
            cards = rec.find_all('div', class_=re.compile(r't686__table'))

        for card in cards:
            # Link & Name
            link_tag = card.find('a', class_=re.compile(r't-card__link|t-feed__link|t686__link'))
            name = ""
            link = ""
            if link_tag:
                link = link_tag.get('href', '')
                name = link_tag.get_text(separator=' ', strip=True)
            else:
                title_tag = card.find('div', class_=re.compile(r't-card__title|t-name|t-title'))
                if title_tag:
                    name = title_tag.get_text(strip=True)
            
            # Description
            descr_div = card.find('div', class_=re.compile(r't-card__descr|t-descr|t-text'))
            description = descr_div.get_text(strip=True) if descr_div else ""
            
            # Cleanup description (remove duplicated name)
            if name and description.startswith(name):
                description = description[len(name):].strip()

            # Image
            img_url = ""
            # Check for background image first (common in Tilda cards)
            bg_div = card.find('div', style=re.compile(r'background-image'))
            if bg_div:
                match = re.search(r"url\(['\"]?([^'\"]+)['\"]?\)", bg_div['style'])
                if match:
                    img_url = match.group(1)
            
            if not img_url:
                img_tag = card.find('img')
                if img_tag:
                    img_url = img_tag.get('src') or img_tag.get('data-original')

            if name:
                partners_data.append({
                    "category": current_category,
                    "name": name,
                    "description": description,
                    "link": link,
                    "image": img_url
                })
                
    return partners_data

if __name__ == "__main__":
    url = "https://river-loft.ru/partners"
    data = scrape_all_partners(url)
    # Remove duplicates by name
    seen = set()
    unique_data = []
    for p in data:
        if p['name'] not in seen:
            unique_data.append(p)
            seen.add(p['name'])
            
    with open('partners_data.json', 'w', encoding='utf-8') as f:
        json.dump(unique_data, f, ensure_ascii=False, indent=4)
    # print(f"Scraped {len(unique_data)} unique partners.")
