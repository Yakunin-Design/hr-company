import Card from "@/components/Card";
import Button from "@/components/std/Button";

export default function Settings() {
    function logout() {
        const confirm_log_out = window.confirm(
            "Вы уверены что хотите выйти из аккаунта ?"
        );
        if (confirm_log_out) {
            localStorage.removeItem("jwt");
            window.location.replace("/login");
        }
    }

    return (
        <Card>
            <Button onClick={logout} red>
                Выйти из аккаунта
            </Button>
        </Card>
    );
}
