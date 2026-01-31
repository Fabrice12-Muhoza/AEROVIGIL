from .mongo import get_db

db = get_db()

users_collection = lambda: get_db().users
vehicles_collection = lambda: get_db().vehicles
violations_collection = lambda: get_db().violations
evidence_collection = lambda: get_db().evidence
alerts_collection = lambda: get_db().alerts
stats_collection = lambda: get_db().stats