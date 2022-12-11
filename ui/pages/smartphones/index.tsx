import { useEffect, useState } from "react";
import { getSmartphones } from "../../api/handlers";
import PhoneCard from "../../components/AmazingCard/AmazingCard";
import { Smartphone } from "../../models/models";

export default function SmartphonesListPage() {
    const [smartphones, setSmartphones] = useState([] as Smartphone[]);
    useEffect(() => {
        (async function () {
            const smartphones = await getSmartphones(
                "vendor",
                "model",
                "photos",
            );
            console.log(smartphones);
            setSmartphones(smartphones);
        })();
    }, []);
    return (
        <div>
            <h1>Smartphones List Page</h1>
            <div>
                {smartphones.map((smartphone) => (
                    <PhoneCard
                        title={smartphone.vendor + " " + smartphone.model}
                        images={smartphone.photos}
                        id={smartphone.id}
                        key={smartphone.id}
                    />
                ))}
            </div>
        </div>
    );
}
