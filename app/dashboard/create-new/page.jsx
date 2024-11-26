"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";

const CreateNew = () => {
    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);
        setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
    };

    return (
        <div className="md:mp-20">
            <h1 className="font-bold text-4xl text-primary py-3">
                Create new{" "}
            </h1>
            <hr />
            <div>
                {/* Select Topic */}
                <SelectTopic onUserSelect={onHandleInputChange} />
                {/* Select Style */}
                <SelectStyle onUserSelect={onHandleInputChange} />
                {/* Select Duration */}
                <SelectDuration onUserSelect={onHandleInputChange} />
                {/* Create Button */}
                <Button className="py-4 mt-4">Create Video </Button>
            </div>
        </div>
    );
};

export default CreateNew;
