"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

type props = {};

export default function RespondButton(props: props) {
    function onClick() {
        console.log("bruh");
    }

    return (
        <Row gap={1}>
            <Button onClick={onClick}>Да</Button>
            <Button onClick={onClick} red>
                Нет, я хочу к маме
            </Button>
        </Row>
    );
}
