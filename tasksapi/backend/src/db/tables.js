class Tables {
    init(connection) {
        this.connection = connection
        this.createTableUsers()
        this.createTableTasks()
    }

    createTableUsers() {
        const users = `
        create table if not exists users (
        id int primary key not null auto_increment,
        name varchar(45),
        email varchar(45) unique
        );`
        
        this.connection.query(users, (error) => {
            if(error) {
                console.log('Erro ao criar a tabela users...')
                console.log(error.message)
                return
            }
        })
    }

    createTableTasks() {
        const users = `
        create table if not exists tasks (
        id int primary key not null auto_increment,
        title varchar(45) not null,
        status varchar(45) not null,
        priority varchar(45) not null,
        created_at (45) not null,
        id_user int not null,
        );
         
        ALTER TABLE tasks add constraint id_user FOREIGN KEY(id_user) REFERENCES users (id);
        `
        this.connection.query(users, (error) => {
            if(error) {
                console.log('Erro ao criar a tabela tasks...')
                console.log(error.message)
                return
            }
        })
    }
}

module.exports = new Tables()