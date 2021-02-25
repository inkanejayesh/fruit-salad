import {Container, Box, TextField, Button} from '@material-ui/core'

export const Welcome = () => {
    return (
        <Box display="flex" flexDirection="column">
        <Container style={
            {
                width: 400,
               margin: '0 auto'
                }
            }>
            Welcome to Fruit Salad
        </Container>
        <Container>
            <TextField id="username" label="Enter username"/>
        </Container>
        <Container>
        <TextField id="username" label="Enter password"/>
        </Container>
        <Container>
            <Button>
                Login
            </Button>
        </Container>
        </Box>
        
    );
}