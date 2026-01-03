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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2L2ILMO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIBfnVUWdr6FkVSye%2BRWgnDxjuefbVzjVFGzSs5qEZS7yAiEAhtj6LxuG4Zdj8zyogZIPFGIUwp5h%2Fi1OV5IuBltHCRQq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDLHccRJyBfiG0tQZ8SrcA1LGrR1lZT71BDTu957aHczjPzr6rJVUMNzubg9G%2BP8zUbvc7nF5865Jpm37QpCn2FNOUzYPB3ZuTe%2Bw08Ll7P%2FPnN1hXbrZIfpJXEj14hInHN9es13CjkChWLC%2F0V6ubA2xhCieXH9JZAqrTZbyzOPgqrKcZuRyPMMi1W2Wz4iUSeC7%2FI5VOUOx%2B0T01yXy%2BLY5OYqMR2p4Me8PbPj6GKwehm0ZPZRPEHB%2B%2FHx22cbvtl2x%2FvqcT7Z66ssuTdHweSbXI%2Fkspzrd0NRE6p1R%2F9tZQoVhP949gUVncOAE1NLojRV1pkUkYhLH229KjNB3R3fTm5y4X7Hsal2OkY8bsZomfgYEsOeFKlGo70ZfynUdqKbxg5hQWVYIAEasuol%2B6RlWJm75%2Bh3SilPK7%2FYsckl6D8eazZGJqOfiQJeO3oNVVGUxgSWwjxDXVD0Xpmi2W8unlbgr0fOSFV2udvn1Iod3HdeV4dZV9BFKRt5NmAmwvtplUHhl%2B9ElFwDJu3B%2FhAkl0EqKVKw4Zb8L3zhUJvPmt60rUcMnVtwZOmFfiyH7JBg%2F49Nta5I1r%2BiTRQI1F3HLeHwW0kfFUTmbEitxaKUMPUwP9bDC1XrJdboGQs1qfSw1KAVS5VPrsT10MPqn4soGOqUBY9FW9xj1CEjorpcvTrQgPOPgZ2Od8tWB24xCy8%2F7jq%2F7ldrm3TLaQ8qdinceC0CRV%2Fmt7UTzHTzyYNGS94Ic97bhuPFovBOGaOqqWtecs%2FZ6JOdNuWMYWnPDFCpwJ56wQcK3aKIFkjMzBk8J5fyHr0wbpx06YKVAnMSlB6V019XVNMceCyjF%2B4FhTLssKrxNYKb4RG%2BhUVAE0zTIzgulDbBEQGeW&X-Amz-Signature=4093342541fbe8f956d22c813693599f4998f8ada6a9c16688a67763ee0e2350&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2L2ILMO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIBfnVUWdr6FkVSye%2BRWgnDxjuefbVzjVFGzSs5qEZS7yAiEAhtj6LxuG4Zdj8zyogZIPFGIUwp5h%2Fi1OV5IuBltHCRQq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDLHccRJyBfiG0tQZ8SrcA1LGrR1lZT71BDTu957aHczjPzr6rJVUMNzubg9G%2BP8zUbvc7nF5865Jpm37QpCn2FNOUzYPB3ZuTe%2Bw08Ll7P%2FPnN1hXbrZIfpJXEj14hInHN9es13CjkChWLC%2F0V6ubA2xhCieXH9JZAqrTZbyzOPgqrKcZuRyPMMi1W2Wz4iUSeC7%2FI5VOUOx%2B0T01yXy%2BLY5OYqMR2p4Me8PbPj6GKwehm0ZPZRPEHB%2B%2FHx22cbvtl2x%2FvqcT7Z66ssuTdHweSbXI%2Fkspzrd0NRE6p1R%2F9tZQoVhP949gUVncOAE1NLojRV1pkUkYhLH229KjNB3R3fTm5y4X7Hsal2OkY8bsZomfgYEsOeFKlGo70ZfynUdqKbxg5hQWVYIAEasuol%2B6RlWJm75%2Bh3SilPK7%2FYsckl6D8eazZGJqOfiQJeO3oNVVGUxgSWwjxDXVD0Xpmi2W8unlbgr0fOSFV2udvn1Iod3HdeV4dZV9BFKRt5NmAmwvtplUHhl%2B9ElFwDJu3B%2FhAkl0EqKVKw4Zb8L3zhUJvPmt60rUcMnVtwZOmFfiyH7JBg%2F49Nta5I1r%2BiTRQI1F3HLeHwW0kfFUTmbEitxaKUMPUwP9bDC1XrJdboGQs1qfSw1KAVS5VPrsT10MPqn4soGOqUBY9FW9xj1CEjorpcvTrQgPOPgZ2Od8tWB24xCy8%2F7jq%2F7ldrm3TLaQ8qdinceC0CRV%2Fmt7UTzHTzyYNGS94Ic97bhuPFovBOGaOqqWtecs%2FZ6JOdNuWMYWnPDFCpwJ56wQcK3aKIFkjMzBk8J5fyHr0wbpx06YKVAnMSlB6V019XVNMceCyjF%2B4FhTLssKrxNYKb4RG%2BhUVAE0zTIzgulDbBEQGeW&X-Amz-Signature=4093342541fbe8f956d22c813693599f4998f8ada6a9c16688a67763ee0e2350&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJR6BR5W%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQC8LabhKpVR72ALVo6XzbP5xn4BFNMCu0yQ6zCeHu4GPAIhAP6krUbTw6nZrfDT54eCfFOqvzuND%2FkLvB88Rb7f4z3TKv8DCA0QABoMNjM3NDIzMTgzODA1IgzITYDC4ugnkT19HtAq3ANJsRtGusQA%2Fxvs2TSFNGBRpTn6Qe6%2B7DHtQ8pgnCOutDuL7Pmvfh8GoA3PoXUTSoN20D89UqvzOrUDYeDOYNfeBzCsj4THLKTU%2BLTqt5Q5ic0JhF9kiR0n5zZk3NB0grl1PLbf%2BQIz7fq5SNuVKws4egFXpWDElFyJ86fVHCpr9omp5R2C8YadRVkRlGuIs7uCDBoPxl6hgkyShbumq98Q5yAKcFa%2BfIie8Jazmc8xuieW3bUKwOYit7vKqYNp1UuR0wo3YfOYoQAcUBoj%2Fkq3S1RlISqDiGje5N57ijuvLd1dzQOl%2FSTgzDPi9DmCqYuuk3OWBlQsonFTKQeV5GRHYJCfpKQdzcE2E26NOREK4Ci8h6lqOpN%2F5x7Ml%2BB6QdgWUOx0ZKi81JbC5zrV1ZIFLHvVazClUBpB42MqR7Jydb%2F8HZOep13NFfd5g7v9B0%2F7qDuV6doKShDCuHP6PfF4kYYoImxEqTR4GQVv6BwHkyZoQQrN2dtN49%2FpVHZQbiJI0YCh8hL30fFIjQ%2FptCePUlv3rRhGaOGuo9i3wFVSbxA6snSf%2B6JizFYycVDAkA%2BcQCaoKFkAiCHuJNxEe3gxMyXqH%2BLxIxpzbpSbp%2FIotFfkM5E6BtYPPzM24TCEqOLKBjqkAWCoqWsrR1Q584IPa%2B75hkDV%2FATrPVGJEnPy1vn2CpvXdUBuKG5u4TJgMA9KX3kP9%2FR5UhesoSJnPGPbBNLL6Sc9%2B4pkoBpDhpYYzjwIplCFFL%2Fv92vPYL5SzXUXdewbB1rMT5BUQsAvwOho%2BsTXxo2r7gm3lr32djpeaGTlhy4uvc2GI3qVFQa9KnuotNchRCRPpIy4Mu%2F4SX1GVKHepa7T1zSB&X-Amz-Signature=7e9870230df3f72fc90cf71881ec06f645207dc216c9fb826c7dacd22016a2e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEQEPVFE%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDlCOayUVRPv%2FjQjVEGkLNwXcW%2Bv6KjiY4jGfWswsAw3QIgVw8EJReuj%2BsmGKuso5iA6YhagfuDO81DLOTZK6Db7l0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDBawXgLzXOn0Qnrq3yrcA81k1zLoCaif%2BzpCA7IvBCNP8oDQ9gOISy9w2%2FXfHN9ahCpcYWHNTVJj88HgbYFh4XOIC99qzRY%2FW0HtbuL9wJmQ%2BvP%2FOPqeEmJ2b3AfjeO%2FSu7AHc2jdeGGeEHV1szugezl%2BPBjjbpvKy7%2FTOcShpUgbul3tmC8EXQ23RBxM4Bj0XjphMCmgQJxlrgbvFm4RfXXund1RiwmekJ4P045vDPGty90T1tdVdzRQF6rQxqnwjQq4HPhc3iEOcXERL%2BQnlSi426WJLoCnpEnqSvsRLCbiaHZG61IScHwxlIYMCop%2BWXxO8RkVuObpMCihsz7StQ3nMF%2Bgjf%2BjHyT8O6vdHyIQ02n%2B1HDuI1zep73OxQzuYGFZAHFT1ZqK4ka0N8rSSDXBaLOFut5iXVlxDnE%2BJTTmAuXVjkDfR7iAsfh4pwZv35%2FUZ4KN3d06oH3UBC8N2QSmJQMXlSDcYUgZl7lP1Sok7f4l8O6wIbC1vfJCn11kxC8jWDhEbmnv2tAM5xXxFiJ91bbmj6wSmD3QHbeMmwTYlot2pNQgZN2bptHx8mMRszOnJ5MXMpX1PNxq0H24dfeJus%2BW3yhH1O7pk8G6dr2zD6lceJ%2BvC63JACtQMzJwc6a2a7nAqSfBhAeMOSn4soGOqUBzRBOewqcbwhyT%2BEyonlWyd8WB2we5QGlvbX6%2B8C4o6jeGE4usE8%2FvAd4a5DxcT3hNZb08I5PlAoHLrEkKtyDaK54jzq%2BnHeBwZ0MJbTJudSk5kJ6EZZOZTN37w7i%2BbQLV1ItZSRb7ht7OKr8ZZbco6fOhHqffoXHN0UfwH7mrAYfOl32uyFvdVQCj3bOc2ir9Bj3NRorGD86UVdUt%2B4IhBv%2FIQdV&X-Amz-Signature=4bc76f20fe7f3b1dd197a2d241e244f929ddf136a830a8c9e184a8ba48db0457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEQEPVFE%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDlCOayUVRPv%2FjQjVEGkLNwXcW%2Bv6KjiY4jGfWswsAw3QIgVw8EJReuj%2BsmGKuso5iA6YhagfuDO81DLOTZK6Db7l0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDBawXgLzXOn0Qnrq3yrcA81k1zLoCaif%2BzpCA7IvBCNP8oDQ9gOISy9w2%2FXfHN9ahCpcYWHNTVJj88HgbYFh4XOIC99qzRY%2FW0HtbuL9wJmQ%2BvP%2FOPqeEmJ2b3AfjeO%2FSu7AHc2jdeGGeEHV1szugezl%2BPBjjbpvKy7%2FTOcShpUgbul3tmC8EXQ23RBxM4Bj0XjphMCmgQJxlrgbvFm4RfXXund1RiwmekJ4P045vDPGty90T1tdVdzRQF6rQxqnwjQq4HPhc3iEOcXERL%2BQnlSi426WJLoCnpEnqSvsRLCbiaHZG61IScHwxlIYMCop%2BWXxO8RkVuObpMCihsz7StQ3nMF%2Bgjf%2BjHyT8O6vdHyIQ02n%2B1HDuI1zep73OxQzuYGFZAHFT1ZqK4ka0N8rSSDXBaLOFut5iXVlxDnE%2BJTTmAuXVjkDfR7iAsfh4pwZv35%2FUZ4KN3d06oH3UBC8N2QSmJQMXlSDcYUgZl7lP1Sok7f4l8O6wIbC1vfJCn11kxC8jWDhEbmnv2tAM5xXxFiJ91bbmj6wSmD3QHbeMmwTYlot2pNQgZN2bptHx8mMRszOnJ5MXMpX1PNxq0H24dfeJus%2BW3yhH1O7pk8G6dr2zD6lceJ%2BvC63JACtQMzJwc6a2a7nAqSfBhAeMOSn4soGOqUBzRBOewqcbwhyT%2BEyonlWyd8WB2we5QGlvbX6%2B8C4o6jeGE4usE8%2FvAd4a5DxcT3hNZb08I5PlAoHLrEkKtyDaK54jzq%2BnHeBwZ0MJbTJudSk5kJ6EZZOZTN37w7i%2BbQLV1ItZSRb7ht7OKr8ZZbco6fOhHqffoXHN0UfwH7mrAYfOl32uyFvdVQCj3bOc2ir9Bj3NRorGD86UVdUt%2B4IhBv%2FIQdV&X-Amz-Signature=a2b4ef46b848115d73dd839c7a356dcb61f0ecd100433b71eb4aa08af0702417&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV45BWGF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDnj%2B3s8p3bEfvy%2FmUn0CNB0VbvxnLSA1pyybacGfYA7gIhAK%2B9XjsZutiN4bFHp6HNrir7rgy%2BvehSiXnoRSDKcHu%2FKv8DCA0QABoMNjM3NDIzMTgzODA1IgzFCIUcnVyA7ZzpmsQq3AMT%2FcVTt0rViuksFHKu0RaRWFV%2BSTOYdl3ATlWg%2F6ahddB%2F2Qnyl4PQFOwx2Z26HPquqg6L%2BfkvqAQdmQLJQe321SFp8rRiLXGuC5GLRjfYM3MU1h84THsVVBncss3mnQBDOgO0Ci0FPTPI4RKE%2FN3Io%2FpBh5l6LydDfI7fiR9ARXnFtNpmhtm1BfjfLC1u9mZY0%2BFUPAUlTsNlUUTfdHH1xBCyog7NIOjD7YorU%2BghYCRs%2BKnfvaM%2Fso5kAUxEYVcr%2BwBptVaJ%2F%2BFj%2BJabylB4nhOIX%2B6iRau%2BK%2BxoV0ybI93fCfOGFYNjP5Til4UrMZvaZL89PMOFMDJ2A9GvA%2BSk21BNTaNLdjoF7SYn2TfptQ77Y4Oqd1vp2OUBetBuKz3e88PRnfmOlvB891t%2Bf26el7yT%2Fh%2FLp36xEZPdd%2FCFXab4u5Ry7doelLsvLxa6jqE3Tpgs14WrNI1%2BjRIjZBivCYgu0kkXQ9fb6leIH%2FNl8xqTVgR9lW0tTFKRJxA9tr1iNvzP81W2LSMdoyqRDjY3nX1%2B5thg2jzHitoTB3%2Fuivq2EITUPk97HUpovLN3QE3foxNGt%2B8I96wEWmWuLKC9wqNkZfHi3ccUcf3Yp8xnmhGnZremyBcXrdk1IjCCqOLKBjqkAfaj9dN7QX4ScCGqzaVFIiJWlGGAMXezARvYMrp4xLJtZtt7gpyDidEYGKt7fUZ7ZbtqjErHSRVSrLyljN3gAcnYa4uy6Uw%2BjjO%2BFeQei1MZWpDFGCN6O2uE5XLONRwHL7NoUw5i9ghpdsMj2x3mj2qwU7lxXATSE6hu7wC%2Bl1KePBsbkB1qi8S7M93Ps1sDJ2VRwFxUId%2B%2FHWuAw9%2F4FTI2uC4R&X-Amz-Signature=937c550a77aab08477926035abee39dfbc77e28091d380e9a6102551f66c7364&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MTBFVEZ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIEy48fNPgTU%2FNXSzL7cGCfNE5prK3hdOza9BwcdH45HgAiAkoGXPm%2BSfu%2Bdegw4mSzLCTnlvtpMFRsyr7IZHP6taoir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMpqks94voIqESPtfaKtwDPH7pJfJRlaF6EJuXX8Q6eregwXowVAYWoSeo4RhwUYfsBGQff00Zja5mPELeepLv4gbrL%2BSuNuHZHBl%2FCrfFlzqpHSCdBiy2DmySJvJuM5WjUG85dPjzzFe%2BOtECaJDKLgpX%2FL7sbQKJ20dqig9c8QX02W5XvznHQC4462bQ0qs7tB32c8pzwjtrAftdOe%2FOUMwZlv5X7iIPZYrqibWN0mRClazdQrrAvUlXNDS4HUmmoeSNeBOUp2evary3mdcVJsbt3u8FHILYaZFp4tPPmBoe5ZFqGeas8R3WpD5aRk4tjJ5v7KdfhtcR%2B5b4TfGztgajKkhrK44w245sImWd%2F52pkclXeBygq4mmDagzcMVOncx9pSQHGmxeWy%2B9miwD0N%2BDSgqINc5T7toTh3tvR1D63r1z5ifZK%2BKbn4GW%2BsjGxIOTavrXD8go8DVA8VsBZHsfZOjVDLofJPNbXbdmjzQGBKV1URbPvx%2BwSrB5eF9btZvLxh479jg0niC0qqyXsUkZ3MVm7JbSkhbxt0zK4bqPMklR4mV8a6Xgk%2Fwp%2Bhw80ImNADxx7QgGKzCClWUvt0veMVprGGWEMXvE1ifH80xT6CDvAfk6UpZfpDcfcoH6nXsN7Bz4f5eXaBMwn6jiygY6pgG%2FY%2B2O0DLqXv9byoW%2Fl5O7FbhaEkNzxuMchno8IWFEOBGb8unW8aYtN45YI5s%2Bp8pWeUI98ivehoygNZG4tG5%2BhgYJMmEhx9jOUbOTRk70ymaQAzgNOl1DHXOPNjG8ZueNNq6bpqtLOULOJdzo%2BgBsL5wIURULU956Wdt5JxhhjtAyTNs9lHA8X%2BEJBG5y8bFRggtq52%2FlvihduGAALXxoosnhonUv&X-Amz-Signature=9f38d2d2b132d3a1bf6b29cf3c3831b9918a3de85b95e962c5f64899056b5608&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVWJ4Y22%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQCYlcOrfMmplAWije898QMuoNg1rrmYS%2FW1roEm496gagIgJWIX1iQ%2Bat3Z5g0f3yr3DuA%2FUb8CrGzd2gslnzQ7%2Bx8q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDIwe4M%2FjLNjaTU%2Fz%2FircA0pJ2Cq0UO%2BIewcnvxXVmwFcnJXqHj2evUjMc3QRPwzg0Epjruf3p3usIOSa9tTrfXnsHb7S9TSgCx1XEm6FbOzokvsTCnhsnervY4B%2FRcY8WHkAhx5b%2BkOHfdix%2Fgeh6RY7C0QpIEmfN%2BU%2F0OOA3kST2OXq2jPUuHozWVy%2FewAbTBoxTvxoQwIKBrNm8v%2Fha9dgDG9M%2F%2BcI50MGsygCYpYj9tJed2aGhtLiPUaXdasHj0bNirIhYtFNPLOz0ykmtGw3jthNhQe21QsYpp3V85ZwWzVZuZUOm2SFCflw8ygHSkCdlK0j%2FzOz%2FlOSbNEF5x3%2BQUtSj37L88%2FoDdOtpIFOaR6wdKidpet%2BwTkAXw%2FHTVdH3AZiFzPJHui4TcUWfwJQxyoheGgpM9%2BIHD%2FSkmzwXLt3KgQ80%2FV9meeAu0i%2Bm9ZSuEeHkHmy5Bs%2BPk3ss9tBm5hfsnM34JKmLtvUY4o0A4SjQR4XzVLdm%2FBgP5Ej9nWqiLL%2FS6f2Gvfu2j8u9LqsYylukg1Joqm4RYKtLJUliY3R%2F%2BAT4kS2Xz2tyJQn%2BfMjOphwiU9j1ucMxuXUWTdTm2f1%2Fq3gX0Fm2RtvgDdkbW58KbCd2zyncmqmgB8qWt0tSGkj67uLWIAYMNun4soGOqUBcbOKNxqDfqOR1z83a%2F8tLmHHjIl9AK2TIlHWt9e1N3SgvUchz%2FY24RB28%2FaFyZUow2WLg4nDSVkP5kXyMNues5kOkYk3D4fB%2BPeQp6HmbkUoqb3ND5hVF%2BPs%2F7WQ8iL8PB46MVJ%2FbqjYyMheqYCLF2IcjZ5RlpATGKb%2F%2BJ2zHJqkd%2BAEJkZKH4K07jnaoJ0qo4FaU5U8sVcujkO%2Fz7sIZuQFNj3C&X-Amz-Signature=722994bcfee5aad987c85419ab03b03eb4a5da67e6dd2f70c29b0bfd2233cae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRZTJQHM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCICr7IzolA7hS5zPjif70tC9cvZZok34TWxOw9UxV%2BCRPAiBDx37Vmy8tPRYTjxGyCVwQkVv%2FjYT5LFX8c1FX4wXa9Cr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMXBFlLAtd51ASpm71KtwDBUrA5Falq0Hqnzy%2Bh5zlo9KWxBvLdtKOsRiTU7%2FWaQ6G7tMBL3D8q3R3s8%2BvJGB3IQ082O3M%2FKBd4aBbuT85SCxoHGRyTt%2B1bSvNrX2ok3G0EZFDP7rA4eGjqA40UwfpNLTWKrjq9rYD2QmIQQiH90%2FyBF6yeqbjj85rBYMF%2B8x4W9ddf4yYrSrGSOmQnaLXukIEJwELkDBdMAYAg2oxMOA%2Bs%2BKXtoHkpTT%2Bx5vZXwYf1suaEiNbckRuHOkSfS4Kc8MN1ihelFuIwzyBhHN%2BJoEdFugg9wM5nRtpNpMGzdAQpjU0fFurvVgQoZRRw%2FWGCHxYzTOxr3vyn1dvgh1JaN%2BycH1Oy%2FIsr7ztTkMMzEdFlcHowUQM0O26T7QgKdvpk55N1VVrpl0jPi91vb0UZ12r%2B0wl%2FWwoOSqk7iEkAFZHCRUCRF0FS0NIfkCRqV8iZgmPRml65qKYnmu0A%2BnYeeKQFkyBji8VVbsAZeR%2B5vpu2sxlAii0A7N773N9GA%2BtrBwFqg8HlZONKpDQJ%2F7faRy5hrLqlrHg6qWyh1qPs87npixvgrsCF0jNOmks5%2FPQJFBHlaZ%2BhIWPnMxADE9uGxBKxG%2FW4KAlJGDH8nPVfZwZqQFoJ6BFJ%2Bg1Vm0w7KfiygY6pgF7DY0x2yPzLKyMD0%2F6ut0Dryx4PmkCy1gZLVBZkuHso2krBrr6DYV8xuw84CDBoNoHKOxh72Cjn409OXBG%2F1IQQlJVFiRWjrtkEi%2F4Mn9PRmzL%2FGTye7OW5zNmyx9aI0rNtYDslPhKanlArjQYYftOSsP7%2FhkZUuf2wSFpSlUufdlil2IcGmWPKhJn63NFZmouq5XulNYfh4LTiM8Bt6KuFsCYbTpA&X-Amz-Signature=54a639372fdb7e05559797bc365512b278b3582f91dda76cfb0bc415753fb21f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRZTJQHM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCICr7IzolA7hS5zPjif70tC9cvZZok34TWxOw9UxV%2BCRPAiBDx37Vmy8tPRYTjxGyCVwQkVv%2FjYT5LFX8c1FX4wXa9Cr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMXBFlLAtd51ASpm71KtwDBUrA5Falq0Hqnzy%2Bh5zlo9KWxBvLdtKOsRiTU7%2FWaQ6G7tMBL3D8q3R3s8%2BvJGB3IQ082O3M%2FKBd4aBbuT85SCxoHGRyTt%2B1bSvNrX2ok3G0EZFDP7rA4eGjqA40UwfpNLTWKrjq9rYD2QmIQQiH90%2FyBF6yeqbjj85rBYMF%2B8x4W9ddf4yYrSrGSOmQnaLXukIEJwELkDBdMAYAg2oxMOA%2Bs%2BKXtoHkpTT%2Bx5vZXwYf1suaEiNbckRuHOkSfS4Kc8MN1ihelFuIwzyBhHN%2BJoEdFugg9wM5nRtpNpMGzdAQpjU0fFurvVgQoZRRw%2FWGCHxYzTOxr3vyn1dvgh1JaN%2BycH1Oy%2FIsr7ztTkMMzEdFlcHowUQM0O26T7QgKdvpk55N1VVrpl0jPi91vb0UZ12r%2B0wl%2FWwoOSqk7iEkAFZHCRUCRF0FS0NIfkCRqV8iZgmPRml65qKYnmu0A%2BnYeeKQFkyBji8VVbsAZeR%2B5vpu2sxlAii0A7N773N9GA%2BtrBwFqg8HlZONKpDQJ%2F7faRy5hrLqlrHg6qWyh1qPs87npixvgrsCF0jNOmks5%2FPQJFBHlaZ%2BhIWPnMxADE9uGxBKxG%2FW4KAlJGDH8nPVfZwZqQFoJ6BFJ%2Bg1Vm0w7KfiygY6pgF7DY0x2yPzLKyMD0%2F6ut0Dryx4PmkCy1gZLVBZkuHso2krBrr6DYV8xuw84CDBoNoHKOxh72Cjn409OXBG%2F1IQQlJVFiRWjrtkEi%2F4Mn9PRmzL%2FGTye7OW5zNmyx9aI0rNtYDslPhKanlArjQYYftOSsP7%2FhkZUuf2wSFpSlUufdlil2IcGmWPKhJn63NFZmouq5XulNYfh4LTiM8Bt6KuFsCYbTpA&X-Amz-Signature=b280cdf700b0aa7f6a609b08adf3d0f326e367b14306650799dacae7edd1ad5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622KM5WGC%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIFy08m7cDIcSHZgH7jZeq5trpEk5U1kyp9Wdyv7o2K7xAiBwVw7a1zTXKTwlLIpUtFKJCXvwwmzyi1JuWZKchKcoHSr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMvV44rEHqyl%2BDSMI1KtwD8SMiZzPqE4pgUNYhPXQV%2FdEu%2B4TJw53aZNu9w5gnDj0u%2FcXbRbmkIOZpvegXj8D29nJnc4h7h3fRswaqEE1SVx11wZej3VbY%2FfqMYl18IflbiUfh%2F2xhNi6s30aBfZcp9NW9DVBf%2FxZF%2F5yBSt%2BolalFRXI6tbZjSoCIBbkviamyLTN0n8Z57DskBVpJKdPnMsZMOInBzVt5%2BodrfF6EUbIk%2BxBrDez0oWWedpnv6LPdiu6VWGnmo81AwA8BcDACzIIuRcwZvF0WW3268kWcsWq%2BdGcKmsmZUOcyI603fqSPeLENCcEGnapAJyf1qbmpfe1dCF6O4Dfn7ovlsdOLYhoR6qDbuh7cGP36DHmDhpJ2yYUinUTenvm5xh9nlG5t5SDxzGqLTKh7ohOwCCOHfa39y5ygEFPO%2B%2FKunaiWX0hA%2BE5PfCAVsW6fmYCruVPotvHtXp%2FWQz%2BjTehms%2BRdYRVYMeEXBd9D0iD6U56ubfjPIs%2BLD0FnvC4awh2dcJi36gz4Jg7go4MLIAsG7%2F5vCragkyud9UJ2Qb90hd8AartGDIQqeM0il3HD8phxlBsoB82ae39A5D11O3nz9NNqaAyIdKmYKiALw%2Fuy4hpz%2FjzTU%2BEBUurtMqmeNEcwlKjiygY6pgGFrI3ORcq3dFGLI28Lrq2YHua6O6n1IlmAcsggIO%2BBeQ%2B3gd27TuBtZgsa%2BExBhELQ0VeOk3Eo7n6cLF3LFG0ai26q9ljuyb0cFbeEp%2FKncQNagYyy%2FcWZYQiFogbLJ3oA9DREH%2FVhaceB2ccHNMnEzypyXu8IucTM773aHV3xhXXzvVz9AfP6na4cUf%2FWFpFN%2BfM3knHFHZySLN7ZWhq6URybI%2FgD&X-Amz-Signature=d6a18e0e2c6378d92059736a70f997eed8fbd55571e04bc87dd91497d1e2a09c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RD3XXV5Z%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDxv8BnFGkVqsOKpZV1gqHdLDzqDtnVKGKx7uZTpz%2BRTwIhAO%2Fvu%2F2wdcB3CRLFHmf2H2cJmhcDR34POAykLJJLIscAKv8DCA0QABoMNjM3NDIzMTgzODA1Igxgq7Jbc0LOR6aSAaIq3AMub0KfLV1kL9J4Yd6z3zy4MC09IJTwyPwUfJARopgk0BVqTEafjOO4xtA%2F10VZU9goP2d6TbW3PkjIV8cw5OX6tvsUPF1gMEiNnHKbllWctG2Db%2F%2BKRfSvaBplDDYHqF1n1tNfNX6J%2Fqyq2S%2BbPnlz3NUQjMq6nc6sJsSmLnvx3IQXiIv3I%2Bd69PIik88%2B4JOfEeKEk1NeQK6rz2NkkUeS0BmLsBw6dpV1%2B6E4uVzOp%2FZkBV1tLSiwO8trMM%2BG1I8GhMoyTXxetoLhN6nem8ZEBqwC8cIE%2BXcehnLi388gCKulmKK9sBHGa44iRbT9nKg7jOhTbhMkuW8mpNGYh0uJBqr5BZY1mGbZLh0lDnblB1ujhcDgYZhc%2BdrGGY7foFVkqInRV%2BdD7XskpWU%2FASQ2MVcJaf%2F%2Bpl3LjJC73E7Gw1ryC0Lf3pHXU6MJqoSl3F%2FO5TqyPmeh%2BHA3xVNq65NqUMqOOv9DGDdEYdtJ4UlAs78PjYZql3X%2F0KzQcLYyI5dnlnoY8ZqbCFGJhkXH1ule75iR%2BO8AKU4e%2Bx4M0eVLIlnoK61Uu1xuz2Oc7WqAODyJOXCn1RH6rqDeZ%2FAoYH56WXG4bo9r13PA29FlyeE0TGvrSvPb2TI5avbc%2FjCZqeLKBjqkAShueVBI7QM07%2BBzRNnfYMus2EShASr%2BxjuvywPhfYDexIjOUgj1TbpfKTfUVQM1xqAYt5FB5MroUkRBWztLHTt%2BknX6LTjGoAJ3qK8mGPfBA%2B42gUsLKC5TXNRmv4PeDicin%2Bp%2FB1GtH0axU2adQUJGG5OjtqWzBIelhcaJJ1xtR234WiurOa%2BK%2Faccd4mRPrXpxoa9h1H5iMbbkiyFq0ckFqg%2F&X-Amz-Signature=1c9ea28799f93ba901191c68832a4fdbb20757cbb320ea67774232a675fb1318&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RD3XXV5Z%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDxv8BnFGkVqsOKpZV1gqHdLDzqDtnVKGKx7uZTpz%2BRTwIhAO%2Fvu%2F2wdcB3CRLFHmf2H2cJmhcDR34POAykLJJLIscAKv8DCA0QABoMNjM3NDIzMTgzODA1Igxgq7Jbc0LOR6aSAaIq3AMub0KfLV1kL9J4Yd6z3zy4MC09IJTwyPwUfJARopgk0BVqTEafjOO4xtA%2F10VZU9goP2d6TbW3PkjIV8cw5OX6tvsUPF1gMEiNnHKbllWctG2Db%2F%2BKRfSvaBplDDYHqF1n1tNfNX6J%2Fqyq2S%2BbPnlz3NUQjMq6nc6sJsSmLnvx3IQXiIv3I%2Bd69PIik88%2B4JOfEeKEk1NeQK6rz2NkkUeS0BmLsBw6dpV1%2B6E4uVzOp%2FZkBV1tLSiwO8trMM%2BG1I8GhMoyTXxetoLhN6nem8ZEBqwC8cIE%2BXcehnLi388gCKulmKK9sBHGa44iRbT9nKg7jOhTbhMkuW8mpNGYh0uJBqr5BZY1mGbZLh0lDnblB1ujhcDgYZhc%2BdrGGY7foFVkqInRV%2BdD7XskpWU%2FASQ2MVcJaf%2F%2Bpl3LjJC73E7Gw1ryC0Lf3pHXU6MJqoSl3F%2FO5TqyPmeh%2BHA3xVNq65NqUMqOOv9DGDdEYdtJ4UlAs78PjYZql3X%2F0KzQcLYyI5dnlnoY8ZqbCFGJhkXH1ule75iR%2BO8AKU4e%2Bx4M0eVLIlnoK61Uu1xuz2Oc7WqAODyJOXCn1RH6rqDeZ%2FAoYH56WXG4bo9r13PA29FlyeE0TGvrSvPb2TI5avbc%2FjCZqeLKBjqkAShueVBI7QM07%2BBzRNnfYMus2EShASr%2BxjuvywPhfYDexIjOUgj1TbpfKTfUVQM1xqAYt5FB5MroUkRBWztLHTt%2BknX6LTjGoAJ3qK8mGPfBA%2B42gUsLKC5TXNRmv4PeDicin%2Bp%2FB1GtH0axU2adQUJGG5OjtqWzBIelhcaJJ1xtR234WiurOa%2BK%2Faccd4mRPrXpxoa9h1H5iMbbkiyFq0ckFqg%2F&X-Amz-Signature=1c9ea28799f93ba901191c68832a4fdbb20757cbb320ea67774232a675fb1318&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHOQFFHZ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T061358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCICIzPA0erwpMPzXIaVMgGDA0SoJ264SYS23B40tntmEbAiEAmym25dfGB%2B6vZqIrmx2Z7pU8cJYKJ7eb8p1mCOuLrAUq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDMPnV6PinpPyf%2BOYZSrcA02PG%2BkAJf%2BjM5ezqoIByfOc6q4BH5gjvvbtMm7za7RDyoc%2FYlw2AjgISEfoYB%2B%2BieUfHcLaMJqdQE7VWCjYlnI92o61Bn5WRTeHykvz0JrDj96qFxesatL7LWHpph%2FpbtF4BJ9w6owiTiBouR%2B49A7r30gdYdNrBh8kcfC52yX7PN33RE8K3C4HMQ%2FH4qdTzuI8FAcAObd%2FqfPUQ3cKBP4MG0cAAmqXSMBORm%2FJ2%2Fv4mPEGgb3dA5rfiJ1mV0BBA9nseuvngV4sIyRKUWMM8qtKmVj%2F0CBuhc8xrkKIzXnKUWp9dU66Fe9LD9CnJn7RQOGtaKEeR7lApNl0nPuGsjYNXjH6midzOeTMQBT6tSPfwzMvheP%2FC0B3QWTaEOVqH1mkM3UnQy1uXcfXauWJ1tAivuu73QKdsS2JsPr2dZK%2BYmGQPxv65fzocRyDMn2886u2QnrEdjUtDY68LZFpcNwpJsGko3Oh3ovzFEmXMmpkwcR3PjWH%2BmcPfuB4O0qM4PZbeRwIg5vNwN0eIIpY2KYi8YPYnag9ZQGyZZExFRVjpfLk2KHBi2yASt9XExqpWFdaCuGxHvdOjS80Dy7opnVV%2F7N1ZqezyS45wlrAu%2FMAjSOmnUOk9gF%2FbtykMMOo4soGOqUBQJ1AXRBUqKgKc5X77vhAOvvdbPlM97d30AglNY%2BHyfILkuAp1TY%2B1zxUf391pOFajH4cxgAOjWLusF2eTefkpCsGlQAwzK0ATYb5ZOND3hXzU9DRrbk2dp3ljMw3VOIU9qctLX%2F%2BBpvEXh7JQ4Afat7PAAul2nDPH53QO1VroLtpdDDR6z99TBg0V4%2BI1MteL9t0dbNePlVzwb6kYY9C3wbpPYpm&X-Amz-Signature=7c5d00e81586a31f7aaca3238b1ea66ded90d03d7876845ccc0dab97f515c7fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

