import { ENV } from "../utils";

export class Post {
  baseApi = ENV.BASE_API;

  //traer todos los blogs
  async getPosts( page =1 , limit = 10) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;

      const url = `${this.baseApi}/${ENV.API_ROUTES.POST}?${limitFilter}&${pageFilter}`;

      
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;

    } catch (error) {
      throw error;
    }
  }

// hacer eliminacion
  //Eliminar un registro de mail
  async deleteEmail(accessToken, idEmail) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idEmail}`;

      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
      
    } catch (error) {
      throw error;
    }
  }
}
