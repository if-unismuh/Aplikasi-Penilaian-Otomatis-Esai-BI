from flask import session, request, abort
from flask.views import MethodView
from ujian_app.repository import AkunRepository
import json

class AuthAPI(MethodView):
    
    def get(self):
        '''
        Mendapatkan nama dan role
        '''
        cur_user = session.get('user')
        if not cur_user:
            return json.dumps({"role":""})

        return json.dumps(cur_user), 200

    def post(self):
        '''
        Melakukan aksi login
        '''
        repo = AkunRepository()
        
        if not request.is_json:
            abort(400)
        
        data_user = request.get_json()
        if not data_user['username'] and not data_user['password']:
            abort(400)

        user = repo.findById(data_user['username'])

        if user:
            if user.password == data_user['password']:
                dt = {
                    'nama': user.nama,
                    'role': user.role
                }
                session['user'] = dt
                return json.dumps(dt), 200

        dt = {'role':'', 'pesan':'Username atau Password Salah!'}
        return json.dumps(dt), 200

    def delete(self, username):
        '''
        Melakukan aksi logout
        '''
        session.pop('user', None)