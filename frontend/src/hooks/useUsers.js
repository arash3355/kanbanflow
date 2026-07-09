"use client";

import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../services/userService";

export default function useUsers() {

    return useQuery({

        queryKey: ["users"],

        queryFn: getUsers

    });

}