import React, { useState, useEffect } from 'react';
import './css/App.css';

export function Home(loginState) {
    if (loginState === 0) {
        return (
            <div>
                <h2 class="center-text">Welcome to Resume Module</h2>
                <div class="center-text">
                    Please create an account or login
                </div>
            </div>
        );
    }
}