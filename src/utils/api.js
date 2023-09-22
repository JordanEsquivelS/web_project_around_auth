class Api {
  constructor(options) {
    this.options = options;
    this.headers = {
      authorization: options.token,
      "Content-Type": "application/json",
    };
  }

  fetchData(url, method = "GET", body = null) {
    const requestOptions = {
      method: method,
      headers: this.headers,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getUserInfo(endPoint) {
    try {
      const result = await this.fetchData(
        `${this.options.address}/v1/${this.options.groupId}/${endPoint}`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async setUserInfo(nameInput, aboutMeInput, endPoint) {
    const body = {
      name: nameInput,
      about: aboutMeInput,
    };

    try {
      const result = await this.fetchData(
        `${this.options.address}/v1/${this.options.groupId}/${endPoint}`,
        "PATCH",
        body
      );
      return result;
    } catch (error) {
      console.error("Error editing user info:", error);
      throw error;
    }
  }

  async getInitialCards(endPoint) {
    try {
      const result = await this.fetchData(
        `${this.options.address}/v1/${this.options.groupId}/${endPoint}`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async setUserPicture(profilePictureInput, endPoint) {
    const body = { avatar: profilePictureInput };

    try {
      const result = await this.fetchData(
        `${this.options.address}/v1/${this.options.groupId}/${endPoint}`,
        "PATCH",
        body
      );
      return result;
    } catch (error) {
      console.error("Error setting user picture:", error);
      throw error;
    }
  }

  async likeCard(endPoint) {
    const result = await this.fetchData(
      `${this.options.address}/v1/${this.options.groupId}/${endPoint}`,
      "PUT"
    );
    return result;
  }

  async deleteLike(endPoint) {
    const result = await this.fetchData(
      `${this.options.address}/v1/${this.options.groupId}/${endPoint}`,
      "DELETE"
    );
    return result;
  }

  async changeLikeCardStatus(cardId, like) {
    if (like) {
      return this.likeCard(`cards/likes/${cardId}`);
    } else {
      return this.deleteLike(`cards/likes/${cardId}`);
    }
  }

  async setCard(newCardNameInput, newCardLinkInput, endPoint) {
    const body = {
      name: newCardNameInput,
      link: newCardLinkInput,
    };

    try {
      const result = await this.fetchData(
        `${this.options.address}/v1/${this.options.groupId}/${endPoint}`,
        "POST",
        body
      );
      return result;
    } catch (error) {
      console.error("Error setting card:", error);
      throw error;
    }
  }

  async deleteCard(endPoint) {
    try {
      const result = await this.fetchData(
        `${this.options.address}/v1/${this.options.groupId}/${endPoint}`,
        "DELETE"
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

const api = new Api({
  address: "https://nomoreparties.co",
  groupId: "web_es_07",
  token: "6b6ff122-c6bd-4191-9431-3243f5375a43",
});

export default api;
