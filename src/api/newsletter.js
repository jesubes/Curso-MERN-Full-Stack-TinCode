import { ENV } from "../utils";

export class Newsletter {
  baseApi = ENV.BASE_API;

  //traer los Correos con paginate
  async getEmails(accessToken, page =1 , limit = 10) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;

      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}?${limitFilter}&${pageFilter}`;

      const params = {
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
