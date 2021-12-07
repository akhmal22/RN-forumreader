import * as React from 'react';
import { Appbar, Card, Title, IconButton } from 'react-native-paper';

export default function Header(props: any){
    if(props.header==='head'){
        if(props.index[0]!==0){
            return(
                <Appbar.Header>
                    <Appbar.Content title={props.title} />
                    <IconButton
                        icon="chevron-left"
                        size={20}
                        color="white"
                        onPress={() => {props.index[1](props.index[0]-1);}}
                    />
                </Appbar.Header>
            );
        }else{
            return(
                <Appbar.Header>
                    <Appbar.Content title={props.title} />
                </Appbar.Header>
            );
        }
    }
    else{
        return(
            <Card>
                <Card.Content>
                    <Title>{props.title}</Title>
                </Card.Content>
            </Card>
        );
    }
}
