const {
	selectTopics,
	selectArticleId,
	patchedArticleId,
	selectArticle,
	selectArticleComments,
	postedArticleComments,
	deletedComment,
	selectApi,
} = require('../model/model');

const endpoints = require('./../../endpoints.json');

exports.getTopics = (req, res) => {
	selectTopics().then((result) => {
		res.status(200).send({ result });
	});
};

exports.getArticleId = (req, res) => {
	const { article_id } = req.params;
	selectArticleId(article_id).then((article) => {
		res.status(200).send({ article });
	});
};

exports.patchArticleId = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;
	patchedArticleId(article_id, inc_votes)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch((err) => next(err));
};

exports.getArticle = (req, res) => {
	selectArticle().then((result) => {
		res.status(200).send({ result });
	});
};

exports.getArticleComments = (req, res) => {
	const { article_id } = req.params;
	selectArticleComments(article_id).then((result) => {
		res.status(200).send({ result });
	});
};

exports.postArticleComments = (req, res) => {
	const newComment = req.body;
	postedArticleComments(newComment).then((comment) => {
		res.status(201).send({ comment });
	});
};

exports.deleteComment = (req, res) => {
	deletedComment().then(() => {
		res.status(204).send();
	});
};

exports.getApi = (req, res) => {
	res.status(200).send({ endpoints });
};
