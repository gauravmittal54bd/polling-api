const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Polling-Api',
            description: 'This is an API for managing polls for each option created for a corresponding question. Here are the steps:\n\n1. **Step 1:** Create a question using the "Create Question" API.\n2. **Step 2:** Add an option to the question using the question ID generated.\n3. **Step 3:** Add votes to that option using the "Add Vote to Option" API.\n\nCreated by Gaurav. [GitHub Repository](https://github.com/gauravmittal54/Polling-Api/tree/main)',        },
        servers: [
            {
                url: global.serverUrl
            }
        ],
        components: {
            schemas: {
                Option: {
                    type: 'object',
                    properties: {
                        text: {
                            type: 'string'
                        },
                        votes: {
                            type: 'integer'
                        },
                        link_to_vote: {
                            type: 'string'
                        },
                        question_id: {
                            type: 'string',
                            format: 'uuid'
                        }
                    },
                    required: ['text', 'votes', 'question_id']
                },
                Question: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        },
                        options: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Option'
                            }
                        }
                    },
                    required: ['title']
                }
            }
        }
    },
    apis: ['./routes/*']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
