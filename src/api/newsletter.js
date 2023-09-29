import { ENV } from "../utils";

export class Newsletter {
  baseApi = ENV.BASE_API;

  //traer los Correos con paginate
  async getEmails(accessToken, prop) {
    try {
      const pageFilter = `page=${prop?.page || 1}`;
      const limitFilter = `limit=${prop?.page || 10}`;

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
  async deleteNewsleter(accessToken, idEmail) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idEmail}`;

      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
