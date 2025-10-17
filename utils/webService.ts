// utils/webService.ts
// encapsulates Rest API calls like fetch menu items

export interface FetchResult {
  uuid: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export async function wsGetData(apiUrl: string): Promise<FetchResult[]> {
  try {
    //log("wsGetData.ts: 1. Start");

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const json = await response.json();

    //log(`wsGetData.ts: 2. resonse.json = ${JSON.stringify(json,null,2)}`);

    const menuItems = json.menu.map((item: any, index: number) => ({
      uuid: index + 1,
      name: String(item.name),
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    }));

    //log(`wsGetData.ts: 3. Menu length = ${menu.length}`);
    //log(`wsGetData.ts: 4. Menu JSON = ${JSON.stringify(menu,null,2)}`);

    return menuItems;
  } catch (error) {
    console.error("wsGetData.ts: Error", error);
    throw error;
  } finally {
    //log("wsGetData.ts: 5. End");
  }
}
