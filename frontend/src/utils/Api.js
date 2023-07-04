class Api {
    constructor({baseUrl}){
        this._baseUrl = baseUrl
    }
    getCards(){
        const token = localStorage.getItem('token')
         return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        .then(this._getResponseData)
    }
    getProfileInfo(){
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/users/me`,{
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        .then(this._getResponseData)
    }
    redProfile(data){
        const token = localStorage.getItem('token')
       return fetch(`${this._baseUrl}/users/me`,{
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
       })
       .then(this._getResponseData)
    }
    redImgProfile(data){
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
        })
        })
        .then(this._getResponseData)
    }
    addNewCard({name, link}){
        const token = localStorage.getItem('token');
         return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                link,
            })
        })
        .then(this._getResponseData)
        
    }
    _addLikes(cardId){
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then(this._getResponseData)
    }
    _removeLikes(cardId){
        const token = localStorage.getItem('token');
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then(this._getResponseData)
    }
    deleteCard(cardId){
        const token = localStorage.getItem('token');
        return fetch (`${this._baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then(this._getResponseData)
    }
    toggleApiLikes(cardId, isLiked){
        return isLiked ? this._removeLikes(cardId) : this._addLikes(cardId)
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`) 
        }
        return res.json()
    }
}
const api = new Api({baseUrl: 'http://localhost:4000', 
});
export default api