import Button from "@/components/std/Button";
import style from "./Search.module.css";

type props = {
    onClick: () => void,
}

export default function FilterButton(props: props) {
    return (
        <Button className={style.filter_button} onClick={props.onClick}>
            <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1,0,0,1,-19,0)">
                    <g id="Artboard3" transform="matrix(1,0,0,1,-0.119407,0)">
                        <rect x="19.119" y="0" width="18" height="18" fill="none"/>
                        <g transform="matrix(1,0,0,1,16.1194,-3)">
                            <path d="M7,8C6.448,8 6,8.448 6,9C6,9.552 6.448,10 7,10C7.552,10 8,9.552 8,9C8,8.448 7.552,8 7,8ZM4,9C4,7.343 5.343,6 7,6C8.657,6 10,7.343 10,9C10,10.657 8.657,12 7,12C5.343,12 4,10.657 4,9Z" fill="#fff"/>
                            <path d="M17,14C16.448,14 16,14.448 16,15C16,15.552 16.448,16 17,16C17.552,16 18,15.552 18,15C18,14.448 17.552,14 17,14ZM14,15C14,13.343 15.343,12 17,12C18.657,12 20,13.343 20,15C20,16.657 18.657,18 17,18C15.343,18 14,16.657 14,15Z" fill="#fff"/>
                            <path d="M7,10C7.552,10 8,10.448 8,11L8,20C8,20.552 7.552,21 7,21C6.448,21 6,20.552 6,20L6,11C6,10.448 6.448,10 7,10Z" fill="#fff"/>
                            <path d="M7,3C7.552,3 8,3.448 8,4L8,7C8,7.552 7.552,8 7,8C6.448,8 6,7.552 6,7L6,4C6,3.448 6.448,3 7,3Z" fill="#fff"/>
                            <path d="M17,16C17.552,16 18,16.448 18,17L18,20C18,20.552 17.552,21 17,21C16.448,21 16,20.552 16,20L16,17C16,16.448 16.448,16 17,16Z" fill="#fff"/>
                            <path d="M17,3C17.552,3 18,3.448 18,4L18,13C18,13.552 17.552,14 17,14C16.448,14 16,13.552 16,13L16,4C16,3.448 16.448,3 17,3Z" fill="#fff"/>
                        </g>
                    </g>
                </g>
            </svg>
        </Button>
    )
}