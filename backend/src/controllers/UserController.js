const crypto = require('crypto');
const connection = require('../database/connection');
const speakeasy = require('speakeasy');


module.exports = {
    async index (request, response) { // usada rota get usser para passar qr que é utilizado pelo google auth para teste
        
        var secret = speakeasy.generateSecret();
        return response.json(secret.otpauth_url);
    },

    async create(request, response) {
        const { name, password } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('users').insert({
            id,
            name,
            password,
        })
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const user_id = request.headers.authorization;
        
        const user = await connection('users')
        .where('id', id)
        .select('id')
        .first();

        if(user.id != user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        
        await connection('users').where('id', id).delete();
        
        return response.status(204).send();
    }
};