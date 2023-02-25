"use client"
import Container from '@/components/std/Container';
import Spacer from '@/components/std/Spacer';

import styles from './loyalty.module.css';

export default function Profile({params}: {params: {name: string}}) {
    return (
        <Container wrapper lk>
            <h2>This is Profile - {params.name}</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem omnis minus, numquam dolor recusandae alias quibusdam quam eveniet libero earum!</p>
        </Container>
    );
}