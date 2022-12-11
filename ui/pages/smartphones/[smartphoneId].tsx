import { useRouter } from "next/router";

export default function SmartphonePage() {
    const router = useRouter();
    const { smartphoneId } = router.query;

    return <p>Smartphone id: {smartphoneId}</p>;
}
