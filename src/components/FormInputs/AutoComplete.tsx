import { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

const AddressAutocomplete = ({ form }: { form: any }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBLWWsOk4-t5c9Y_zef0OqC2FW6JMkGbS0",
        libraries,
    });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [inputValue, setInputValue] = useState("");

    const handlePlaceSelect = () => {
        if (!autocompleteRef.current) return;
        const place = autocompleteRef.current.getPlace();

        console.log(place)

        if (!place || !place.address_components) return;

        const address = place.formatted_address || "";
        const city = place.address_components.find((component) =>
            component.types.includes("locality")
        )?.long_name || "";
        const state = place.address_components.find((component) =>
            component.types.includes("administrative_area_level_1")
        )?.long_name || "";
        const zipCode = place.address_components.find((component) =>
            component.types.includes("postal_code")
        )?.long_name || "";
        setInputValue(address)
        form.setFieldValue("homeAddress", address);
        form.setFieldValue("city", city);
        form.setFieldValue("state", state);
        form.setFieldValue("zipCode", zipCode.replace(" ", ""));
    };

    if (!isLoaded) return <p>Loading...</p>;

    return (
        <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
            options={{
                types: ["address"],
                componentRestrictions: { country: "ca" },
            }}
        >
            <input
                type="text"
                placeholder="Enter your Home address"
                className="mt-3 p-2 border rounded w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </Autocomplete>
    );
};

export default AddressAutocomplete;
