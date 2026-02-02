🌐 API Endpoints


Authentication:


POST   /api/auth/login          - User login
POST   /api/auth/logout         - User logout
POST   /api/auth/register       - User registration
GET    /api/auth/profile        - Get user profile
PUT    /api/auth/profile        - Update profile


Alerts:



GET    /api/alerts/live         - Get live alerts
GET    /api/alerts/{id}         - Get alert by ID
PATCH  /api/alerts/{id}/status  - Update alert status
POST   /api/alerts/{id}/acknowledge - Acknowledge alert
GET    /api/alerts/statistics   - Get alert statistics


Violations:



GET    /api/violations          - Get all violations
GET    /api/violations/recent   - Get recent violations
GET    /api/violations/{id}     - Get violation by ID
POST   /api/violations          - Create violation
PUT    /api/violations/{id}     - Update violation
DELETE /api/violations/{id}     - Delete violation
GET    /api/violations/types    - Get violation types
GET    /api/violations/stats    - Get violation statistics




Evidence:




GET    /api/evidence            - Get all evidence
GET    /api/evidence/{id}       - Get evidence by ID
GET    /api/evidence/vehicle/{vehicleId} - Get evidence by vehicle
POST   /api/evidence/upload     - Upload evidence
DELETE /api/evidence/{id}       - Delete evidence
PATCH  /api/evidence/{id}/metadata - Update evidence metadata
POST   /api/evidence/{id}/verify - Verify evidence hash




Reports:



GET    /api/reports             - Get all reports
GET    /api/reports/{id}        - Get report by ID
POST   /api/reports/generate    - Generate report
GET    /api/reports/{id}/download - Download report
DELETE /api/reports/{id}        - Delete report
GET    /api/reports/templates   - Get report templates





Dashboard:




GET    /api/dashboard/stats     - Get dashboard statistics
GET    /api/dashboard/activity  - Get activity feed
GET    /api/dashboard/cameras/status - Get camera status
GET    /api/dashboard/trends    - Get violation trends




Real-time:




GET    /api/events              - Server-Sent Events stream
WS     /api/stream/{vehicleId}  - WebSocket video stream