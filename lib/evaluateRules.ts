
export function evaluateRules(rules: any[]  , user: any) {
    return rules?.every(rule => {
        const userValue = user[rule.field];
        switch (rule.operator) {
            case "equals":
                return userValue === rule.value;
            case "not_equals":
                return userValue === rule.value;
            case "in":
                return rule.value.includes(userValue);
            case "greater_than":
                return userValue > rule.value;
            case "less_than":
                return userValue < rule.value;
            
            default:
                return false;
        }
    });
}