interface StringMap {
  [key: string]: string;
}

class context {
  setItems = (params: StringMap) => {
    Object.keys(params).map((key) => {
      let value = params[key];
      localStorage.setItem(key, value);
    });
  };

  getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  removeItems = (keys: string[]) => {
    keys.map((key) => localStorage.removeItem(key));
  };
}

let Context = new context();

export default Context;
