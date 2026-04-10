---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDC6IV2P%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIGG5EwI4NNhO9PN%2BN6k85qanbr0Xck0VrOluHAb5FRirAiBulEBD0gNK9%2FhtlLAHl1LJLf3M5DE7fvDc6ihrRFNxNCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMReyNhm3j63aujFQNKtwDrmGZDiz6l2g17D3%2FDH23dhz3y8EjpMuFxxqZh%2BboNQPTuro8QbWbVUBJxAkoFlc5z8b%2Bge1LFEmSL4BM7dEhcKmwDYxHg7420S3A0AChoDy7XFKYsg%2FJguNWD%2BGBb%2FEakHFaPLaZ71xht%2BaFgIFN8vvuRew6Uf7ZsfPc8jknnCv%2FEZxHvYLlDCqQKkB2HPzbhOSN1QXxuaUwGFA0AF06kheOVHO8Xx%2FZZxq7xrZoeCbpT%2BfTyjgbhC%2B9VvdraJmvGqw1SzMmpByWwyay15L153sCQAnKiewOx7RwKyrbS36XiRsE%2FNCnAGid2lDFC7xmS%2B97Khl50zOG3WdK6vUvbPf4BwgvtoWQIyfBXe4JrLTQbMEAHsb%2F0gWQUDe42t5vYmu1UR2hUC6crwRZXejwIRwhYCuUXjkqe6xW9JH8htwMJ%2BM6fNfWzDjDfTldmImu7v7VrPOjt9PycXQBKqvkxoULkCSGQUAxIzxrmv8hTfKduczcqmhQ9gfe8d7wbXsqn5hMPRc3jOigdLf9QW27KxHgwdShe%2FABk7YsrBaYV1y2IYK8CvrysEa%2FA57VWYQ4Rfy2v1dTfn1MQzIzqlCrV5%2FPh3kSb%2FJif2rHmsyyBpElxAyVfzJl50WfwPYwlNLizgY6pgGjVIEJoAm65e7NtKePkNIegmCoBQ5RuYuSgHJgMgQtu5UAGuYRGKPQjc%2F6LPjIDKGRUBNBvD6t0ehln2UidVcD2kKIUbPY7MyX9VHGPWtY7huIARCyRCLz6ptbTeY7zRdVR3WOTaLpXAxSzgYXe%2B3AbfnLlVU4MB1QOXGp58JdgbLF%2FaQc399%2BcUSUJZhhGEv3PgMDB2ER%2FLjDEqhjr%2BcpJCD%2FOpmb&X-Amz-Signature=865d0b593696e60884753fe296f792f2b80024f89f4dc66dd8ec3f0459e73abc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDC6IV2P%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIGG5EwI4NNhO9PN%2BN6k85qanbr0Xck0VrOluHAb5FRirAiBulEBD0gNK9%2FhtlLAHl1LJLf3M5DE7fvDc6ihrRFNxNCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMReyNhm3j63aujFQNKtwDrmGZDiz6l2g17D3%2FDH23dhz3y8EjpMuFxxqZh%2BboNQPTuro8QbWbVUBJxAkoFlc5z8b%2Bge1LFEmSL4BM7dEhcKmwDYxHg7420S3A0AChoDy7XFKYsg%2FJguNWD%2BGBb%2FEakHFaPLaZ71xht%2BaFgIFN8vvuRew6Uf7ZsfPc8jknnCv%2FEZxHvYLlDCqQKkB2HPzbhOSN1QXxuaUwGFA0AF06kheOVHO8Xx%2FZZxq7xrZoeCbpT%2BfTyjgbhC%2B9VvdraJmvGqw1SzMmpByWwyay15L153sCQAnKiewOx7RwKyrbS36XiRsE%2FNCnAGid2lDFC7xmS%2B97Khl50zOG3WdK6vUvbPf4BwgvtoWQIyfBXe4JrLTQbMEAHsb%2F0gWQUDe42t5vYmu1UR2hUC6crwRZXejwIRwhYCuUXjkqe6xW9JH8htwMJ%2BM6fNfWzDjDfTldmImu7v7VrPOjt9PycXQBKqvkxoULkCSGQUAxIzxrmv8hTfKduczcqmhQ9gfe8d7wbXsqn5hMPRc3jOigdLf9QW27KxHgwdShe%2FABk7YsrBaYV1y2IYK8CvrysEa%2FA57VWYQ4Rfy2v1dTfn1MQzIzqlCrV5%2FPh3kSb%2FJif2rHmsyyBpElxAyVfzJl50WfwPYwlNLizgY6pgGjVIEJoAm65e7NtKePkNIegmCoBQ5RuYuSgHJgMgQtu5UAGuYRGKPQjc%2F6LPjIDKGRUBNBvD6t0ehln2UidVcD2kKIUbPY7MyX9VHGPWtY7huIARCyRCLz6ptbTeY7zRdVR3WOTaLpXAxSzgYXe%2B3AbfnLlVU4MB1QOXGp58JdgbLF%2FaQc399%2BcUSUJZhhGEv3PgMDB2ER%2FLjDEqhjr%2BcpJCD%2FOpmb&X-Amz-Signature=865d0b593696e60884753fe296f792f2b80024f89f4dc66dd8ec3f0459e73abc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7SRFGL%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIGM0RHF4LFYA845FxHEfDB7jS7l6zbS17%2BlgHR6ud2MmAiB4lpbuoAPM4n9zi9YpCVTpRVTAfVH4c8bp0KHSW3faxCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM8UhLrXWY%2FvhAjS8dKtwDTgDZlkPv3K9%2Fl47GvbSW0Utp0gFY9KFmeP1zHp8fjat5d925L9vCN3gMCbwXVhnYEzmCKZia9PmBcrSmxbszrudRqJr3tZEJYB7BdWVWxbSERTInrtMx3DPB%2BkNNKgK2Cc%2B8jtQctdT0jjg0%2F7WlOa3sV9%2F35YgcfcvQfsyTv5r%2F1HETtX%2FOsG6IaN3Z71TsyFuMNNx0Xyns9KIKeOf9CtAg6dlT1HkbJORWsRcIkqTu8208wMD%2FZQv2FmR13xd6XK%2FRmoyE01xGk6TpjvIInI9xwKzk2SvJAG6HauohMw9asRivpQdWHVkTeJISAd6u9XjlRSFVhfcqNTk9oj1ar%2FfZxoIGrEP6L7CsfZnDXXqXRdiuHpCaf9nsIznLI8YufCpo%2F12LzAAW7doV%2BllUFGFqh4dcFfQPDwMoI%2BqOmtcLY1dVC3guSiZQiReihGAvp8McVUKx1DhIMbq7BnSSy2gz2FoqxSg1ejIgqO5FAtD32bRJZl%2Fq6BjrwWvW4y5dtJNUx3AVfo%2FRVid%2FPCfY05ngEmpapUPx9TaPCChfkapbOhesfYcKZFljGJCnxHxJy5sDvNKZYEyuRZoUCQP6cVtVWKRbly3YfFRHd%2Fm%2B1P9nDlrlLRy5TW0CnZswkdLizgY6pgG%2BT99pAtZAbQ%2BGYpSno2RAb9xRt2dFuOGZ8Twx9%2F2n0u9bkPmXU80dLGIc0vI8DQG05Lky%2Fb79F%2FJyn4MmUrvi8dnA35h7xyOthhI1JU%2FrwAQPWivR6W9Az0rty2EUERuLU97a%2FptSf8yIK3gWVMqnfMI3pmSqAnLsAyFM0vPBfxXaym0dJjVO730w8UILCRMLR8hcy6ZJyxbYOHGyMiXWLgalR80Z&X-Amz-Signature=96f9d373175bb3451e3702fd23ba2cf8a7e02d66b439934f8edd03fb5206375f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664A4DBPCR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIB4PnZbz0USFKTJ6Bq60I5pbt2omtmpf8CIHCgRsBlUUAiEAy64rtu6g10%2BgivEKh5XIiRN%2BaqvwOTEkGF4IhbEYNSQq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDJzkBitZtdRzGMjocSrcA4dWgiOr9mV2lxgdCCLlMwQY3exaxQi00O06O4iaubdz1WLHLDKf1I0mqUSXUA0DkKx29P6X7FGXG6OuRuEdMfEZBYtB82t6yCNjaCcqvZGuKEyTzKu4VO5qzt7nGB08IrO0ndLDyIqSfKVK0txb1FpTt%2BiZtEtuzv5ClT3%2FhzQdTmzA6im%2F2oPvv%2BtMr0coMkNhgXth6Jn26yw1OtWWemk5zN5OsauL3zKyJ9x5z6X4Zli35KmoP6%2BZ%2BsHJLGDuezOE7iH9c0jSuyAl7lXfuKkBE13rjEfFnO4wBFBNHK5t0zVCauVwGBGgv5vYztULYVOVHh3gWbXFtCCrJJ37qnwjmfv2JGxC4diaqr0I0NKY%2FwVBKujPjUhvitB98FTgSAq9eif6NQJwJHkZVHtl8iiL99O9hlpuzRaDohkXRzs9PmtPmL0uFK4Zi9TsHcCzTX23xyOG90NoKpvrWEOoIwH0IOnphL2sA3gFwzWFHRm8YyQYARVjm6%2ByLWaeqbnHVla%2Fey4vAWOCfSL7McQ7jFCDDI3fEK8%2FKZZ%2BGaKy7zfE92mSAOB%2BY5tVVV%2FC6nvLuxl0ieLbDoqdEsDwc48aT6cWGJ45XgOE3CqFdZzOQwjbcFzRvfYwZX9J7prmMNfR4s4GOqUB60HNSed6K9TEd5O%2F0ouFKXu%2FBZFktg3wc6xSTwy7uwhWOd7t8xiLyVcdGrrVHhXpdcQS3d3TJ5TSRKTd%2B7xyOWoawKyhPdu6KrPR9j5Msv8oPby2s06HX2p3c9yVWtPQoTJvAeSp5WX%2FOPjqiBfftRdqWGQR4hlqgwZyzcgchJORWcMQw4k7fiJHpLnvDyIdeeAdP2h4zV72z8zTG2QyPvypqZdV&X-Amz-Signature=8038787e9470d7909303eaeb68afe3aca95505fb342cca477670604d0a804b48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664A4DBPCR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIB4PnZbz0USFKTJ6Bq60I5pbt2omtmpf8CIHCgRsBlUUAiEAy64rtu6g10%2BgivEKh5XIiRN%2BaqvwOTEkGF4IhbEYNSQq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDJzkBitZtdRzGMjocSrcA4dWgiOr9mV2lxgdCCLlMwQY3exaxQi00O06O4iaubdz1WLHLDKf1I0mqUSXUA0DkKx29P6X7FGXG6OuRuEdMfEZBYtB82t6yCNjaCcqvZGuKEyTzKu4VO5qzt7nGB08IrO0ndLDyIqSfKVK0txb1FpTt%2BiZtEtuzv5ClT3%2FhzQdTmzA6im%2F2oPvv%2BtMr0coMkNhgXth6Jn26yw1OtWWemk5zN5OsauL3zKyJ9x5z6X4Zli35KmoP6%2BZ%2BsHJLGDuezOE7iH9c0jSuyAl7lXfuKkBE13rjEfFnO4wBFBNHK5t0zVCauVwGBGgv5vYztULYVOVHh3gWbXFtCCrJJ37qnwjmfv2JGxC4diaqr0I0NKY%2FwVBKujPjUhvitB98FTgSAq9eif6NQJwJHkZVHtl8iiL99O9hlpuzRaDohkXRzs9PmtPmL0uFK4Zi9TsHcCzTX23xyOG90NoKpvrWEOoIwH0IOnphL2sA3gFwzWFHRm8YyQYARVjm6%2ByLWaeqbnHVla%2Fey4vAWOCfSL7McQ7jFCDDI3fEK8%2FKZZ%2BGaKy7zfE92mSAOB%2BY5tVVV%2FC6nvLuxl0ieLbDoqdEsDwc48aT6cWGJ45XgOE3CqFdZzOQwjbcFzRvfYwZX9J7prmMNfR4s4GOqUB60HNSed6K9TEd5O%2F0ouFKXu%2FBZFktg3wc6xSTwy7uwhWOd7t8xiLyVcdGrrVHhXpdcQS3d3TJ5TSRKTd%2B7xyOWoawKyhPdu6KrPR9j5Msv8oPby2s06HX2p3c9yVWtPQoTJvAeSp5WX%2FOPjqiBfftRdqWGQR4hlqgwZyzcgchJORWcMQw4k7fiJHpLnvDyIdeeAdP2h4zV72z8zTG2QyPvypqZdV&X-Amz-Signature=c40eeb89c95c4f85f1111f24a0f75c1b1068cc0d12b78c6f3cdf84a08ab21fb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7YJ7XLO%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCICl%2BbPiAa2WYXvrndONQ%2BCDHP22%2FjMpF9UtTsDlKUdzpAiBZEXnO7KNF8o4qpbLWWT5%2FMi3z9Ps3NHsg5IhCe3emdCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMzC%2BNWUYKeS%2FFvG36KtwDDVMcudZG9UgGj1shySBRI0EuxsQvnFh5j3zIDYUBf4WfKoGR2LSamjl2woREX%2BCytLq7uAWOA9jERw4RjvfKyfpoyVCGS%2BY2Gig6ZaiPboZ3JhcChjqlyFby4GTX8J7yGBoP9L2Sg9Cq1h78W1y3NQ086CjnztY4HDeyUr2oyi2U7K9DzxQeAkj6%2FkXxjglWWG88zRZqurjZ1hQacTE1XpxRKCMks%2FlwIeB7H%2Fo84v8PUY56eVuihqpWWgyRWvhhj%2ByhO3ERvay89QM%2BD6vJWl8fKVXLBX7SwGMa5Npbi%2FFBkSwYePbeC6vT3TlV%2Fz6QoeXnlpk17hlMW2zzNH9Ey9Stx3uduixGZFhiWDc9sOWsXPPWoy45PbfBfPtvniYiPKjW7RXxNm2QiqoTzQbodyTNMQ2ztCGA7rzUVmK%2BqPGjRjW68EVmGnwreX0WhMzvQLB5SamOzQvblfOIrc4XEydWD7F0L0B14v2nHpXVKZPsLWec7fqAH6bt%2BNeKT5bBWR3jGZYbw0JM2YRWRiVdlIl6IogAyQB029rdE8YCWV65NXUGyihwZwZjE7aExhRJ2TDjOwRHfZJSlwhS35l4vXmx50pOhcfha1OuloXzuLdfgVmOOKZOmvy1fkUw5NLizgY6pgF7mvj%2BTCdC4a5emkn1qb7Kp4I7C0pdKZt0xtfA0gr3oAwI3h9lgSanYafI8pz4V8zD7%2FXOmWGijQgR3SJbluDl6jEAkNMTSCxqx8tKeAjr%2BNPcXoFMQotbkM%2BsC%2FabQ70Lslz9Wv8psWMEU%2BlKTd0MCYWzCYZYamtidaoTMg6iTQvauBsGk%2BDxEKoEGkStRPoHJK1fsXm5R0sh5tUqes0G4DuqvWNQ&X-Amz-Signature=0085b16f3c1753add0c79a3d9e148246b24aeabde1ade67b929f4332ad93f2c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GDBVKUX%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIA4MIQV1DADvL%2BJCZG7JRGGzmMOlXRxGN%2FkbHyJ%2BTIVlAiBGLyRRtGE8Eb0nLMxYeGP4HkqD7rwwTFTXTAD6ofodiSr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMam56AJFFsJOHOtUYKtwDktUV62xjQr62RZVFOFn35kqxevefGFOm5pq0S32kQbojwYt0GOykjWhw2EIV02voyux%2BhSbAkDabTjscH9rLTDUQq8XKZCnEVAv2i1gm0xfV5oH06IS39TZZBIXMOseA85oAx9fVtqPHilhj%2FmEPWFF2LbETHakj9BuFrgraGzfBuxyDXuz46U1WJX%2FTDbybJmu3PsTpezZsL3xVE7sC5SInQ4DfHrtSSd4MsTykEtXhdeSSQkw%2FY7bGBCaA89UsjQZmOXoUs3RbVVGDfZUuV5A%2Bv1io02PtsYnfLuUgI8lpNNp5ghUei77hHAmiJtMqeKqwAldo6rBvwVHEWRCaGSZQCv33%2BgQW3pVb010yo3XaDNH9LSI7mGuIx%2FkqMqsVcFzU5cOgqwij5PkXbmYSaq9EZS7Da48cnQuIDspI2BlD2nO3D%2BcWbiWk4fPiAljilu1NyeoAJsSgzmBxLc2rH0FNsi2wlIG3fL9hfu8EQYOiJIvxKT9QAFYIGO1LtrMkLz7Xp8eL%2BQYcHRWTwcOLWB79TTCs2yZOEeoxh0JbNguownqC5G6Mp%2B%2B2Pclx9YheG7d05%2BgpImUSUp1vE43xnSo2g%2Fn5difGYH1zlhN8fvgcS%2FhbJFYXEzs58zQw39DizgY6pgHrekg08n1w5xNR21DfmYy0kHPZ%2F7trFCV8emdV6PzERW79ZnlsVpVuLSBbBhbFxe%2BZZfwbpHAJei7drmulEwZ67P2TtF4wDgp6YerOEE%2FSAaOmnpTbkW0gaPJsrKuRteg7hze7oN7j0oEfPoWs6ysusFQd5jH46KymyZL646zjPn1WkwYuNt4zOSlIMgCs5SDuRDqRHtK6TzXnSMicxQ49DOEMx2Kc&X-Amz-Signature=7bc12bdaa10aec594d8b66577effd31f5ad20d11607f344f5b553ec5da68eb2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VNNWGHH%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIEgSBt1DKnIVbMwS27hELIMoLlyBRZ2UjbxgqOFhHzNEAiBM%2BVZHZ4SKQbNZHi7NL%2FFgRJ18QD%2Bt73oCvVPWqeTGuir%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMsvNFoixIsGQ5%2BNERKtwDdVU3DltB21XNStig4gdJ15czv7fyQ%2B9%2BfbWNfJppbaqP36OoIFSr1dojuVQCzen4LWsbaGn%2FnTfniYLngWrBsgCKIkk9kjsMR%2Ff%2FWXNtktACrxe5bm%2BDa86JMguw9Y7KZLmJ%2FZCe2HFMNUZpbLwmBZhtBdxHRnvezyVV6ay%2F%2BxAgFjqN5tHauriLPVAUScAgJk9sVlG%2FAJutz82zwzDulRet6gVx5mwywIQTXFPVh8AUCI7GxVOlOv3AcjnstfQqsEpoCFuTrn14esZHwTj7o9nyVHEoFaKwEh%2FletBu1x9zqzBcHuj3VcV897H7Z6nAcV7mf7UI%2BIa3Bg%2FOsIoaxknl3qXHQ%2Bt3xionmzE6JefFCijeh%2BhgSjB3a2%2BLM10fCCoLD1kzSyroTg4v3bTFJ2wlJmkyy4k5V9MhkcfNfFq8ansLdnJpzGhTvegVVjCGM%2B0Sok%2FkfQN0fsiqH4kDR2wwZ4eaBIwLe2BGV8q7Z%2FmTg1d5ZLaXuNz57BMH9Cbj7Tkjtt6%2BSrWI28TMPFVxm9QkEBD9zVldi%2BP3w5UIiJEDcxpqnfDAcCpVDRb4Gw2JAkw%2FlIHqDiZAjcIjQVA42NThVFpKV3h4GHBptzMD5xzecv3AuCvTCMOzKJIw6NDizgY6pgFN%2F8AoOHgVgtX6bgOqCrblEW%2BfWsQtTBus4DC27vIXvvw41aa8XCnC%2BbXfyBFb%2F8yGkkueZuTJZanLGhImXhAohoA9wsISeN5AQW2bf9PFkEvylyuZse0keBu5z8zgk7HKatdRc6y1PcxHOqY7FQ4IAiJUWP4N%2BZJSWHr3%2F%2BRe%2BbocWmKaDU1yZ700NLFEAbOQxXOXH9M3L5cGyU4A1qqy7hfIW5Ji&X-Amz-Signature=0256b6826bd1dab6de9b56ed7a91b642cc54c88ea1bcfc183218c80137303643&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KZ2WU5P%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCICizLjwjJuoni8xqTB1qJ1m2pltX04aHeIFF62heSHNqAiEAv73lPD8Dct6nbcJ3gxw3PPIokfz6qz%2F%2Fkz7p7exnF8Iq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDM718yyVf%2B0tWTCMRyrcA3zKIJ7ksBJlbA2kduScBrCMXc18sDM8%2B9vMDYUf7AwXkumJMRzcX%2BHt1QQwkgs3ytvp%2FqbGRgKjI2XVWgN%2F10KEw0tKxIJGg5258nDNSvo%2FSmLhWFUJyRFpFaA39YdHCRrkM36tKULvEkumMwU3dJZ1YaZkMWxxGfYanqJM3E7gMVFRIobR3ygU%2BKFrO8JGcd33wDjDeOtYQ8c%2Fdsb265ZFaniHk%2B6zhnB3S3%2FcdFt4gwS6GbPXODA6lwTTmFM94SSUWtcqBXfqVHzlI0rDLF8UnBU%2BnFAd4ix81YccQW3FXF1in9jYFQSH7TzpGqL5gTum%2Ft9uSL2PblcosPyn5NT8H8kPtIF6IKSSgX6aVKjb6HngYY37z7wteP1Jcj9ellXlbuKTx118vCdGZmuzcGHd7gBKXD4W5jJJHKRIlvI2quilPdd1dcC30hrh57HBY6DLvUg7SPbB0trcApWrEN98bFNFcaRvMzrWGOxiOaQ6l6MaDaEYRSUOrJ9MGBGoJ2vlxbIo5Nbcdz1vTeHkzDZTv%2Bskzm97C5%2BhdewxFaci%2F3zZPoiiLTeyk020QVWJErG6BZ9URzHwgZadL%2BhKx19%2F2yEomOkA%2FX6ZskdWF6%2FTJdTS6iNKuBpgEV8vMOPS4s4GOqUBCtYVnN5sCNTPpY%2BceFAhnu8ag3ISOKMMLbO5IEmK10IBsVFV%2FuEpN%2BBDuvB1U4zXlWOX86mWQxwd1SRgPcZZxF5GvO07l7zv6CMIcJX%2B6RuVoJryoXnMlw9RZ4EQtxP6swltfoCA2kxQAWA7CjROVdHnOzMrTTgbo1NLw58LPp8W%2FfGi41Hi9%2B9EHKUDyhn0HtWzOq7hD9nASDzKfOoDVyif%2Bch6&X-Amz-Signature=8f531b3e95f6dfbdad544f2b7c9705a3a061972c321f69d4f2a82314dcef76ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KZ2WU5P%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCICizLjwjJuoni8xqTB1qJ1m2pltX04aHeIFF62heSHNqAiEAv73lPD8Dct6nbcJ3gxw3PPIokfz6qz%2F%2Fkz7p7exnF8Iq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDM718yyVf%2B0tWTCMRyrcA3zKIJ7ksBJlbA2kduScBrCMXc18sDM8%2B9vMDYUf7AwXkumJMRzcX%2BHt1QQwkgs3ytvp%2FqbGRgKjI2XVWgN%2F10KEw0tKxIJGg5258nDNSvo%2FSmLhWFUJyRFpFaA39YdHCRrkM36tKULvEkumMwU3dJZ1YaZkMWxxGfYanqJM3E7gMVFRIobR3ygU%2BKFrO8JGcd33wDjDeOtYQ8c%2Fdsb265ZFaniHk%2B6zhnB3S3%2FcdFt4gwS6GbPXODA6lwTTmFM94SSUWtcqBXfqVHzlI0rDLF8UnBU%2BnFAd4ix81YccQW3FXF1in9jYFQSH7TzpGqL5gTum%2Ft9uSL2PblcosPyn5NT8H8kPtIF6IKSSgX6aVKjb6HngYY37z7wteP1Jcj9ellXlbuKTx118vCdGZmuzcGHd7gBKXD4W5jJJHKRIlvI2quilPdd1dcC30hrh57HBY6DLvUg7SPbB0trcApWrEN98bFNFcaRvMzrWGOxiOaQ6l6MaDaEYRSUOrJ9MGBGoJ2vlxbIo5Nbcdz1vTeHkzDZTv%2Bskzm97C5%2BhdewxFaci%2F3zZPoiiLTeyk020QVWJErG6BZ9URzHwgZadL%2BhKx19%2F2yEomOkA%2FX6ZskdWF6%2FTJdTS6iNKuBpgEV8vMOPS4s4GOqUBCtYVnN5sCNTPpY%2BceFAhnu8ag3ISOKMMLbO5IEmK10IBsVFV%2FuEpN%2BBDuvB1U4zXlWOX86mWQxwd1SRgPcZZxF5GvO07l7zv6CMIcJX%2B6RuVoJryoXnMlw9RZ4EQtxP6swltfoCA2kxQAWA7CjROVdHnOzMrTTgbo1NLw58LPp8W%2FfGi41Hi9%2B9EHKUDyhn0HtWzOq7hD9nASDzKfOoDVyif%2Bch6&X-Amz-Signature=610693546d04b363d5a8f58eedb986601d9620b9d0cf4f8ee9bf34cd0b828f5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXGJUUXB%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIHvrDJf%2BE06Jm5fxdPS2LW9ytPM27yP9T4u5TVmj6ylBAiBI6K0lVNNOZHT6GsHNjgASZ%2BDM8WGe7agfVTiMuLxQqyr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMPmqPrninbC8OEDXgKtwDHB1ZSOh16NRmoGLHqLDLznfchxTOO%2FLdTvZUoQ1QwV1oHj%2FUjlSrfnRAtsUb2GwHSj1BS6%2FgXqsd7HKyqELoyV0t1sFIyl985DbdmNN1fhpe9ZLxxEUN%2B14IfSRN10%2BVyztfceDRU%2FpqqzKh0bXv4Za52CplFCHlB%2FprCFiMbYlMUa9nWEUd17mTt521EhLurascVKaz8XJBosrsXq%2BMLJsQD5RloZrdfQFlgbScuVYK1f2Tzd3l1holC%2FDabaWTMCfLVDUSKtzDZ8WD5ndvLxZmb1ldypBJqsJ%2B8VkY7qe8ea0JHOonD6gr%2BjivW6AqY4rlCPgLoUYKRt%2FxTV1wBxDju9gdLJGTbkgWvUrXN8EFYzDU9X2EQSm%2F%2B%2BJb%2FHtsYppd54lnpanvgwqAfANt9Wq53ZuK%2BSNS7xi7HayaOBjWpY9gVDxCEIla3dWylaI3Z18r8S8cm6Obv1gSi%2BUjwZI%2F5Y1s4xs7%2B1RWDN0M0tZ6wsbF5PpOoxo155XPBIP%2FGPecVB%2FO7xyZf3sx2QQvWy6ORpxtuRbmnOpn4h27VxsljUQKavGBbsMkR7w2R2cJsFzoSkirXI81KpRT%2Fbr6N4pXo1IYsuKxumw5vp1V%2FpPo09tpBKUHvQDkxkcwstPizgY6pgEklHGelX%2F2V5ig%2Bw%2BwSgEflNO7gGZ7qQp9XnuhZRwcA052OVfTW193wbd%2Bvgekherf%2BL%2FrPvBryb4dJc8DvZkwBJYPna5zmWxfC4Il%2FpBVNsAWP2oyEldc5yYm%2FuWbIcLcNE%2FGWnQQdwr0rwClHn1muDbvtwW7P3m%2F8%2BhPRB%2FPhAIYtGy1j%2BojpQTbRFGskpHbnEU4v6kykmuDezHnReyusOwrLF%2By&X-Amz-Signature=3708d00a1054be6854266600a905733d5b0132dc5fd021b64cb6e8e5a98f9d5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLN6PODV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCGQ8OKWIkD5I%2BlfRNPidQkxBg3AlLV61fwjFWylxDTMQIgEZKcWqBDMAlTx251tyYelLpATBxFfSpdaB3%2Bbs0IIUQq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDIy4cuh%2FpR%2Fg2nNDSSrcAxfXGePtAuObDvqULF2oklWoWmUhHlzaoifmXYUyem0TPUe52vTljhJo8jsyBlzSI9as7zbQE8YxFTBwpM597YHTYAosnVpSmaSi8r83uFuK%2B8Ep4UUly%2BUs8PwJ%2FwIGS%2BcE1f%2Fw%2B%2F%2FByn2WstSpqyMcG1mes8MkieNoX%2BS4AhZvZFSVXDIMcF7HWVKwYle4mugp5lCaFUgNATQ0OlW%2FWgqLvBvIj91cYluMQphtdX8WwmZSkc8E8Mt8gdy3VbQ1tLC5DRQcmq4tXTGggLpVCV0mMLT%2BFYQj9ByGdh%2B4rQtO%2B6ZMTM2EQy09S4sjHNjlEVj%2BGKnu0qqvFCBMHYjazq%2Bzb1pL0a%2FoemPPbbTRLpejrGIkT14BQZA06%2BOh4MPw2pIzXL1mXXLI5op3SbYl%2FAFQ6H0oxpyBDl6PZ60lFohf5Ypx7j0OjC9gm5xoLL3jKKh1bBVmhbxvh0lWNeaEDUrWD0HBZ9J%2FaQWH7Ax%2BvpzopgrOO9WcBBB0A95Q4Kvc8tt9VTjX%2FgB1pfE2oRPvyxpVJW1mAYvuO5b92GfT%2FgEWYHiJ9nIavxLLcS2zoz0Hnsl23sAFfGMR5BuHUkMbaLzhnLF1HMHJ3IXF%2FYca8Lm7MlzW0hrT%2BuwuOgCKMOnS4s4GOqUBASgN4UOsmunlOLdpojRfRw807%2FsRmyroJ7Ivt%2FMxZJwH8ChDJl6e04dAj8sjBX%2Fb%2FqkVXonRFmgSKgIGVnWSVWOJITs7pprokNfHcggkV616UATDnBdE%2BCeOMDIrCmVkls3IYLdow2WjOwk5FY5d3w9F2hpziCWDV9phjajQjWq79Lwmxd5aICHbRSKRs89imc33xWxozn6%2B6X9GxUFECBnJCQuD&X-Amz-Signature=80f9490b58556cb3d05e83b5e8ee81f98f221688e2c06e29b05ab6e2976bb81d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLN6PODV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCGQ8OKWIkD5I%2BlfRNPidQkxBg3AlLV61fwjFWylxDTMQIgEZKcWqBDMAlTx251tyYelLpATBxFfSpdaB3%2Bbs0IIUQq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDIy4cuh%2FpR%2Fg2nNDSSrcAxfXGePtAuObDvqULF2oklWoWmUhHlzaoifmXYUyem0TPUe52vTljhJo8jsyBlzSI9as7zbQE8YxFTBwpM597YHTYAosnVpSmaSi8r83uFuK%2B8Ep4UUly%2BUs8PwJ%2FwIGS%2BcE1f%2Fw%2B%2F%2FByn2WstSpqyMcG1mes8MkieNoX%2BS4AhZvZFSVXDIMcF7HWVKwYle4mugp5lCaFUgNATQ0OlW%2FWgqLvBvIj91cYluMQphtdX8WwmZSkc8E8Mt8gdy3VbQ1tLC5DRQcmq4tXTGggLpVCV0mMLT%2BFYQj9ByGdh%2B4rQtO%2B6ZMTM2EQy09S4sjHNjlEVj%2BGKnu0qqvFCBMHYjazq%2Bzb1pL0a%2FoemPPbbTRLpejrGIkT14BQZA06%2BOh4MPw2pIzXL1mXXLI5op3SbYl%2FAFQ6H0oxpyBDl6PZ60lFohf5Ypx7j0OjC9gm5xoLL3jKKh1bBVmhbxvh0lWNeaEDUrWD0HBZ9J%2FaQWH7Ax%2BvpzopgrOO9WcBBB0A95Q4Kvc8tt9VTjX%2FgB1pfE2oRPvyxpVJW1mAYvuO5b92GfT%2FgEWYHiJ9nIavxLLcS2zoz0Hnsl23sAFfGMR5BuHUkMbaLzhnLF1HMHJ3IXF%2FYca8Lm7MlzW0hrT%2BuwuOgCKMOnS4s4GOqUBASgN4UOsmunlOLdpojRfRw807%2FsRmyroJ7Ivt%2FMxZJwH8ChDJl6e04dAj8sjBX%2Fb%2FqkVXonRFmgSKgIGVnWSVWOJITs7pprokNfHcggkV616UATDnBdE%2BCeOMDIrCmVkls3IYLdow2WjOwk5FY5d3w9F2hpziCWDV9phjajQjWq79Lwmxd5aICHbRSKRs89imc33xWxozn6%2B6X9GxUFECBnJCQuD&X-Amz-Signature=80f9490b58556cb3d05e83b5e8ee81f98f221688e2c06e29b05ab6e2976bb81d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCX2RRFJ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T081223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDM%2F6Qe8PY76I0Bnm1%2FpozOdkFKtnW3m4LtDj6oIq4wtgIhAMGiEG6um%2FxC303vvbbEczdWUJrONVma9nndL43HK9cwKv8DCCkQABoMNjM3NDIzMTgzODA1IgwOwDQtn6oGYdZmwagq3AP0Jt6Jle9kUlPXK8QO66GNvJlXIgDobkw2mgeyu0QyH3gLYp%2BQq%2F1GKpc4nbGY3UHRQ3RGTD3S5zCR7oyJZiF%2FHinXAV8PLGMls8iyeLkdYSpCMx3WU8YcwFs2NS%2FlBzl0O1VJW5dLwiAGVkdQASnDYQ4qWAKVMgxHZa8t87EkbL%2BX61%2FOXjbUAoizgKgTGjyw8Byc%2FRLE4PRuDm1q4Dczgn4vFVYd5fQs6BLwUm8EDvy%2FzvhHqCCUrcL3s37Zs3hW6NR9GUzNTTm4QnODUBClZT8bb4wub0ZOA0dURk6hJpP9QDSGZedbw6mRlyHaXLhxtxrprmbZja5cDswJwErwn%2BA9GCrw3gp1Feewjpyp3G1GYGPEhbxUjy2NZ0d43vho2XWSH1Dy7eVp1ffl%2B6uc%2BiaNe9iPpvCmgIKqSF75jKO%2BMvKpAKrOYsDu%2B5SJRKE7yZHSVHxOGPwyPuHg0cC2RHgUTxdZiazdr65MMkJer9w5Kgd9XLDxxrVyPmaixi1JqqMSfC541mOzk4qOvJzc9EyhrJ%2BWFOK5s92Ovjrv0KsJrUlbddfw0BqSqKTf9YfuG6U4u5330e%2BmqQZu4kC8YDDc4BbqylNIWoXQ3H1bXNeHmfa3l9KFNz6F7jCo0eLOBjqkAQjYZ8rz1ZztIb4lKdCCHaPgduCNHBim%2FFXlCNv9G%2FTFR2x1q7a0YG52D8m4H9wWcd9TDlellveLy1wfHgBdnUxSHH0Zv1yMOT4prV1VKdibrAJrqBR4gWglDd9TiIhd%2BCsAdAPzqYIknUVhhF%2Fq5dUW%2Br42ZDWt1t1SnC%2B4d4yjSCfeQslVNnwWZfiKfiFAt0OuO6Hum9JC%2FHDHvIQVqncmbMGj&X-Amz-Signature=0aa370432ae84e26f0ffc539f39f9321a8cefa0c1703ab4ea063688073e7f254&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

