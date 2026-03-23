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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V44IJO7Z%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCTbLMil4ImZnj8rCr1bpfy7D0v5wjdPgf9sK%2FCcDaOYgIhAMotZeJ%2F321XqIpGxf4ujGqA9XXJ2qsTJCJj1aR6P1OAKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzHzpbEIAbSlic18lsq3AOAl%2BnT0Zha1Q3A4Y0tFH9ZVQPCos8cpq6ubxUbBKwo6UqPiS%2Fs5gy3IL4ZMHsvKa%2FiZcWMY%2FKmqWvjwTwhtBsaIno68jOYz2z9NcX8evFPvdUizznwdGQ1a%2BDYDrWWZkOmqowyNtgG9C8WFMrHR7OnsviolNeVT%2Bd5TRsvR%2FZ5uhP2FAVP5fhjQ%2BhLWomnjYue72MYpuZSeIyVTnXZ7PR34%2F3BHWLXSHFh0yocjnST4Fnn1RkdAJgB8dXgvj6FSaE6%2FIxgX1qZgdQasFoIfCl73b85EcQgJtmt84zw088HSiPTltq51oU3arGn%2Fg5RB02yjeQs0Hi4dPr2ZmiY4eHT27HAhxHam9l4EahxRgNjiCjUb2wpskE4PmPf%2FBAVz3ZL376%2B5fgBovMCRAYuj1EDqKiYAsq%2BRSWWp%2FuCr2iI%2BH7OFCrMmNRCrVGR3K28BhWaZfIT%2Bg3ky6%2B8mDLxyoPN6vYNehhZ8IGbnqDofG40GjloUCSwEca3iPbTGF3mcd9eLEBbRyGah4FyWQA%2BMAEkZzkgpvIoHUCgJZrNgpcekaxxX6EMLdwv62zA%2FISGj2diLvkiAQHWMBx05HhM%2B9P%2FfS72B324k%2BQbIkeVolFgYsz3PTlED%2BET1Mc8VzDS1oXOBjqkAYb8s1KM%2FDu7lhNEh6rqDEkQ2SKihqPRfIrCF22wSUSH1zFbVfJjZBQ5KOzRHmVZhekNs6I%2FAK%2FCuSdf%2Fz3fmC%2B%2BHeJPXkbCegpThT9wVVwLCv2LtDsqVWj6Z%2FFFav1lQ5bAewctUTrg2nrNiXPH%2B7j2LY%2Bwz%2BE5fqPbxReKxUWrrAVkTDIxsuqn0DUfJGI%2FgvZcL13iG3bC1QrvrGL9QjUWwu0L&X-Amz-Signature=28f91f16fc951e543423b3ab942bb03420d8b3010e48a33c63fbab5552031574&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V44IJO7Z%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCTbLMil4ImZnj8rCr1bpfy7D0v5wjdPgf9sK%2FCcDaOYgIhAMotZeJ%2F321XqIpGxf4ujGqA9XXJ2qsTJCJj1aR6P1OAKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzHzpbEIAbSlic18lsq3AOAl%2BnT0Zha1Q3A4Y0tFH9ZVQPCos8cpq6ubxUbBKwo6UqPiS%2Fs5gy3IL4ZMHsvKa%2FiZcWMY%2FKmqWvjwTwhtBsaIno68jOYz2z9NcX8evFPvdUizznwdGQ1a%2BDYDrWWZkOmqowyNtgG9C8WFMrHR7OnsviolNeVT%2Bd5TRsvR%2FZ5uhP2FAVP5fhjQ%2BhLWomnjYue72MYpuZSeIyVTnXZ7PR34%2F3BHWLXSHFh0yocjnST4Fnn1RkdAJgB8dXgvj6FSaE6%2FIxgX1qZgdQasFoIfCl73b85EcQgJtmt84zw088HSiPTltq51oU3arGn%2Fg5RB02yjeQs0Hi4dPr2ZmiY4eHT27HAhxHam9l4EahxRgNjiCjUb2wpskE4PmPf%2FBAVz3ZL376%2B5fgBovMCRAYuj1EDqKiYAsq%2BRSWWp%2FuCr2iI%2BH7OFCrMmNRCrVGR3K28BhWaZfIT%2Bg3ky6%2B8mDLxyoPN6vYNehhZ8IGbnqDofG40GjloUCSwEca3iPbTGF3mcd9eLEBbRyGah4FyWQA%2BMAEkZzkgpvIoHUCgJZrNgpcekaxxX6EMLdwv62zA%2FISGj2diLvkiAQHWMBx05HhM%2B9P%2FfS72B324k%2BQbIkeVolFgYsz3PTlED%2BET1Mc8VzDS1oXOBjqkAYb8s1KM%2FDu7lhNEh6rqDEkQ2SKihqPRfIrCF22wSUSH1zFbVfJjZBQ5KOzRHmVZhekNs6I%2FAK%2FCuSdf%2Fz3fmC%2B%2BHeJPXkbCegpThT9wVVwLCv2LtDsqVWj6Z%2FFFav1lQ5bAewctUTrg2nrNiXPH%2B7j2LY%2Bwz%2BE5fqPbxReKxUWrrAVkTDIxsuqn0DUfJGI%2FgvZcL13iG3bC1QrvrGL9QjUWwu0L&X-Amz-Signature=28f91f16fc951e543423b3ab942bb03420d8b3010e48a33c63fbab5552031574&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IPPY6T%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICZ07cuf%2Fxz35%2FPcnhBc%2Bw72VdD9amVrFwxTBv2%2FnmHgAiEAo7xF8UvO%2FuKzmsN1R9NQiIkNV96QqnNefga25kdWC5cqiAQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG7y%2Fp%2B13Y382icVMircA3s917jp7R52JFGAdIdIHO6e%2BusExjLsuvuTt%2BoQRQgevAYk9oYf5RIiG88qXJ1cMloWgOdvnd%2FOU7sYqF3NWXPUO8i9pI1XxkeST%2BQ197pcbV1yLLRIiWfR6snmFzwoVQEWzKEzro2ryRQs4JPFuHc7%2FzCX6GYI3KUKNvQWs8wm3wAEuSjbVdAdlNQXm5xwOt0TrhOGIbKXhOS9xB024bFLliaRRRv7fApLqBZAz3Fbbe1wFGih8BxPrUWoGYeAFAgmXjAmXtZN9JgDd0PAAPOqS6B8xmnEdPtKaFru53csh7gEVHckaRHFkfIMM9fZFJ9vTSvHDQ7zrlHPzvxYRbHnswgrmjr6fb3r%2BXwu4sW9TKQRJ%2BotV2gYZAcHBYYqzb1TALkqQY1wD%2F%2FNmp1g3RUjhHwmZEmSFLXGVGxwZgZKVjwA4ikWyu5qn7fx2FpsMNFIvvC%2BVD1LyhStTaBXPYaf2bpM7RVBqP0lXZPXd5tYQxdS5TAAJpAsCdwK50vMssgFfbmoSIp1m%2Bij5K4R8Xp22prE%2BMJh2bCNR0fkFY9zizdb%2FhfWKytKHafNATtP%2BWuAMOQRYvjo0Ro9GMeKOhSj%2FlEWifjPdQqEgDirLd4sOswHiyOcWBJmkdgwMIbVhc4GOqUBZ7l066mZEZkViCYAmimmho7KAQK03cnUvnE8PYUG1K2Sxt5cZ2Gmv8oAx1t%2BJ%2BJqDmou8DrgGV5C4EnvZFB%2Frc8cc6Qla14pPv7y0LswrkcfBjtwYDg1%2FR0v88V%2FlFIjX5uRUTPKZ05JNMg8532Nt8PsNpUK9ykA4HOYwLhdA%2BC%2FkTHYqoEaxpTpvpuGBNuoD4qQIku3dpDzJAs1%2F2UbWV0VxYaI&X-Amz-Signature=2bff56abd65d853d438e401e22ef15d343a01fdd008421bf7070fd4975d369e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUFLZPTI%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVE71%2Bm3HVitAmnjH76Gaq8JPuRfOx%2Fruj%2BVef3UUcNQIgRrVbgUGZxmls308iov%2BEx%2BoUbwYH6gZjl9GJQ8WtJAMqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI003LAaGUeuO4h%2B2yrcA0CleldfNCW9ZUpfFYALQC62SS7Rq7b9eFpWQLlUaRo2Ko9mfHzGckF%2BWTYHU2yHG%2FymBJl9VZbXyGbnTyzOZGiooaelZf1HD5hgqgca5UW5ykpxYdhIh244m5TGz%2BP8JUFrANYONaOW8SloaoSveVU5e1y7TGepaccpyBMF%2FwHWFTXoWN8H6Foro8M5g6%2F9QdWZDlczaGQQYnaYL%2FubRDgWlKfE8XmPkmc2pB%2Bpkfqh%2F7xWiK4M63W18%2BkUkta3ctIoR1Hi%2FSqSNnGmMXMoBuhkmAB32yF57t1rRuAM3%2FH4JrJuepeHvMn8b%2FEph8VcH7MjI8hufvfppc%2FHdxfJUVhSdRhf7z%2F8HyPNaPd9VmNKglZSF1klQ%2F5yzkIaMTFbVmHkfrL0zeCUqXpVB6bIMOjz0Dh0yc6rxVBHWLzCwTFFoCI0LqIgwepAjhqPRfwXwuxrVbVuexgTOo%2Fh98mCbl86ROezZmCtunLVP9HAJnODjm1PmStAWOc8pCneL7JCN5kpMwkkO9eAh0GqWE%2F1RUXBNzUSiEoqLPsa44L9FiXiKvj8066B2Glcrhe3kQLr9QiyDWeslc5YGLFt0oz8LhJosWiX%2F3YFuQuEwkvc7P8Sy2zOWI1TF861CcJfMKvVhc4GOqUBlAfDaVyno%2FZkaQ0LydU9p7IqscD6mtFOOEU0buMB%2FE1U0KZcnvMrMH%2BNHXlJtLeihPa4TsYxwVKsFRm5iUJov5tZ0KodW6K%2BGtQ9FmnmLTHTLWxsTu3K54PIH1OaAZ3c4hschYqHApfg4OfUMHjHKVU85yXQJf8zuqbj04b5Cs2NRZ3Krg0EUguDjyCtSDT6%2FmXSmZO%2F2g4XhHbJAoc1upBvQOqS&X-Amz-Signature=7c87fb05f426b9b24c8c30e4ba5f024332d34cb73a6df015c4cafa95c4270f84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUFLZPTI%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVE71%2Bm3HVitAmnjH76Gaq8JPuRfOx%2Fruj%2BVef3UUcNQIgRrVbgUGZxmls308iov%2BEx%2BoUbwYH6gZjl9GJQ8WtJAMqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI003LAaGUeuO4h%2B2yrcA0CleldfNCW9ZUpfFYALQC62SS7Rq7b9eFpWQLlUaRo2Ko9mfHzGckF%2BWTYHU2yHG%2FymBJl9VZbXyGbnTyzOZGiooaelZf1HD5hgqgca5UW5ykpxYdhIh244m5TGz%2BP8JUFrANYONaOW8SloaoSveVU5e1y7TGepaccpyBMF%2FwHWFTXoWN8H6Foro8M5g6%2F9QdWZDlczaGQQYnaYL%2FubRDgWlKfE8XmPkmc2pB%2Bpkfqh%2F7xWiK4M63W18%2BkUkta3ctIoR1Hi%2FSqSNnGmMXMoBuhkmAB32yF57t1rRuAM3%2FH4JrJuepeHvMn8b%2FEph8VcH7MjI8hufvfppc%2FHdxfJUVhSdRhf7z%2F8HyPNaPd9VmNKglZSF1klQ%2F5yzkIaMTFbVmHkfrL0zeCUqXpVB6bIMOjz0Dh0yc6rxVBHWLzCwTFFoCI0LqIgwepAjhqPRfwXwuxrVbVuexgTOo%2Fh98mCbl86ROezZmCtunLVP9HAJnODjm1PmStAWOc8pCneL7JCN5kpMwkkO9eAh0GqWE%2F1RUXBNzUSiEoqLPsa44L9FiXiKvj8066B2Glcrhe3kQLr9QiyDWeslc5YGLFt0oz8LhJosWiX%2F3YFuQuEwkvc7P8Sy2zOWI1TF861CcJfMKvVhc4GOqUBlAfDaVyno%2FZkaQ0LydU9p7IqscD6mtFOOEU0buMB%2FE1U0KZcnvMrMH%2BNHXlJtLeihPa4TsYxwVKsFRm5iUJov5tZ0KodW6K%2BGtQ9FmnmLTHTLWxsTu3K54PIH1OaAZ3c4hschYqHApfg4OfUMHjHKVU85yXQJf8zuqbj04b5Cs2NRZ3Krg0EUguDjyCtSDT6%2FmXSmZO%2F2g4XhHbJAoc1upBvQOqS&X-Amz-Signature=0f7a6c633aa44a4599918dfaebbe7c403f239332201df78aad068c0413842e4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VY6JW7XM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA2UOO1eiiiJoTFiAgwzyQPLNqx%2BtjxrsB9sxGMB%2FNKxAiAhEHL%2Fawy9WFXCGGbwJPlFk%2FqaDnEJS73BNmFenVoFxiqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoYm94eWGxaL97jHCKtwDQ2X4sF1uLE3nX7lcejXhIuzMHZht4nGiGvfXEAZnd2ZYjkFNYJFXGmlaLCYP%2BQNw9D%2Blvcc%2B0NOrzzFspChrs9Gb745LaAwQpsetmq0%2FEUalZ92axdObf4%2FOdKl1BoalG%2FIrT9mf9uBsaCofEvvXLvjTJUBMD5VxYtQ4mkQWAxXsa9nLpwpwx64s5kfASuIdLMCpAZ1wUBf8OzlIfP24%2BnUPetGFBI8LVoO%2FS7qWbK%2F8FlA8ej8pDVodkPwMvE8DJlfwrWEyYAj5PUgmsS0gBOVIHyAn4RHRf2%2FC90r5hz2%2BmsJiyll5%2B7CP4UBTrUkZ1gs2ZNF4otbp2YDUN%2Bzxsh0vulctq1FjwL%2Bh9PCapi%2F%2Bi%2BBM5Ap2ZRP%2BFZO486o%2Fz8EmCCopzCWcxfQOLasgDDSt61m1UHoumBjXYXizzvi%2Bm0Bq3fcw%2FNJqXbr02UafqGu%2FwHgW39oLx4cSLTW4lZxDHdyO1NytNaL3hr%2Fi1hJY89z3%2BY6KzgtXM%2Bjaffp%2F7KzjNEhUnYiIUdvRhQB9%2BDcMVfExSsV5aV3r0vkg8xdcCvYetenb1Oui6CzZVfv7duO897wIzLHa5iGoOZPcmxqvofLvsBz3SJ8elpnu%2F62OEyiZwLpHf%2BMxsnMwvNSFzgY6pgHuDe6cyM6KsbmUJLLQ1E0cZF6taJj0FliXk0PKZ03ESjJowxckMOpn5QramDOvaxHu7A7z%2BZp6DcJutCNZZmvexXq%2F6TPz3DCWKFi%2FJ%2FeGr1iaZFGTyNpZi3awuha8so%2BIOFuFDQbjd0DWgMrYljibE7e8%2Ff%2FkLgjTUWPMzgGkoIMqvkCiMxROCZ7ni9mwLVd%2BbnDAWJovRTGIopJWiCd9MexIA5Wp&X-Amz-Signature=fa2b89cf6be0fd27ebfdced325dbe86f496794dc7d0085f17c1b65e03f939866&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XZ44NMJ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDiBRh2oGooa9BIbdyhHtCCScMpelHPc%2B%2BpjMbRsSZqiQIgLbMn16TYN7e2wF3UlS6kId6EOZlGMVgV%2FvgOmfENEycqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFJC2tUA12DsLwApHSrcA83LssQIp7JYT5XmzHXwY1wW3Q1OwL%2BD5TT%2B4IImqlDKiZk4q3rOC%2FpMABq7Jtj%2BuUd%2FDz6UN%2BlMfwvN0fU7dgs7ZUw4EYDe2Cgk08qkNL1ayUKTJi%2B7FvctQQIFdXucfigkFRvYXQ4UHG%2FfwzJlZKGWxbUZNfYD4HF1ja3YXJUHDsRBZNA%2BOqwQPk4tK0jd3cDrU6R3wiXYZNT4JrdJjGIgivpoxdaA5%2FHU1EA7hSgxW0A0M2Hddz%2BsfGG%2BcaRtxUle9rR2iVXCwSgd%2BoNUHr4XcotAXJT58oNdtTFgztC9abCDn854ttZ6wz7a7olNrYu2N1Mnq%2FCgs2xBknZ4c7%2FdlxyC2%2BjZ20RcWyCX1X5om58Reh81awzctwhUcZYllmZ957jh%2BbrlifdvirWoffSe6AsIIZsxV1RjVe8xZ6cYxAMOGArYTCB3E%2FoNgmgfQGbBGTJCwmlPdJ3TPbzyI1qZ1ADOKOjldQ%2FGcaYK4RkoTLteRv7%2BdNzOEaijVW5XqYL%2FNGpx3jHfXoADIV0x42X%2FOG0NzG9XHufOnpqBHcftmx8yE%2FLZ4kY5JnN4DssvjddxHniq%2BTJWJP0eT%2B60vWehaMIv2fQc9IcMKzkr8KOW1%2F502JAr9IbnW81PMNHVhc4GOqUBHRxOoipXYJEQatJjzwAgTvLOqddXFBa%2BJDwbpkP1atDnR0xn5zXN9baZdrDTavDtT%2BikvTmKbYoV6QnJBVaLHVhW3Cigxlfuipwr6cM0ThMoCwxa%2BjZTM6M8w0sQemSgGtY6XdxLYSnCFy0OXXOBcvjBuvDrapoztLJckodlj8NiXEnZe94%2B%2FQPBbvOlimTR%2FO%2FdkWo%2BvXhzZKQ0XjmwBdg4tVY7&X-Amz-Signature=efcef2b40b5946a41461c938f7c9809f1a1d8452f8ce2ead7c8ecf1b4673a396&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DZ4PACH%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2BrOpMasgSbM259SIOblD2Cloh4vhNhAaz7b2gchisnQIhANBv5hflHqCBsN8kuzuh%2BXX4GJrYKgdFmlC6GwP9Ig7mKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoPMEveR1uRYm%2BKoEq3AMTYI2Ib83FobnDY%2B0IxARL7uuGLJcKqOu2CsuABcautnpUryYq6acJTbL8c8Hmn%2FQLI8cPGTUE7DLZiWPlyTIua4gVhAAlYn5xE7pMOdc%2BSXMTKY0o0bmi26LUmu%2FoIHJytgxn0prFF1GervCIHI6S5EbGlE0e%2FMAlbB0Mp%2B1MFXaABOFovmRqy8pWA7b6avAFAxAD%2BNUMht1Fz3Yu71hg7gexplGVQWAWjQRI10CdOztibDD9GOcgGp%2FisVCCjpV053l40Gm3XNxtqghEVfZtYCBUri7OT98VtU8tr%2BQlnjOM4JOyvdnxeUKZyOcfNbeUN%2BjTqhgkJL580mjKXTHq%2FFNQW%2FKD09uyJN%2FnoCqr2shj0ZRuVjVy7qo2dDJujldnl5enGmwlLhq3RFbqZtT%2F%2BFXyAS7BpvIaZXzAv0tPoFsAB3%2BIq2FYYNM6HtY6BYV059NzDoDMStS9aCH1gU3ro9dJGGNh0A1R9e4k34qPR9n4OHdFAXRdQxtbue21kFsBIQbXsWYDDG1uEgELHeem6APqjzg0bXJPT6tHuy8pWQ4NLj1%2BzcwntpdspGmYdpDMebRqL2xxlsmqeVdKogwx2bYEoX8cUANjyNpRIoH4KS3TusAEXQ%2FeqnyKpjCO1oXOBjqkAVFIxqVw5MVYiq01tE9BNnS81SYJqw7DtZIATgpyvMJ1u0KFz8tmEt%2BPwoYnWRSKuiQcPH0VhgMu41o7dI%2FwIxyrh6L6OTEpz3l6F4ajSDrG3%2Bt2gZMox35hLfwe4NZ52XXmqXNREMygkBonZcJIGmhOAh4QXDBx1%2FeWCThEgJslB%2F%2By0Q9rVnWaFQTP1Ct8hcoPSnLKEvjLHoBIHrig9YMq3Tkg&X-Amz-Signature=2ca64f43a47ebb7a7a6d1f38bb4f4148cb91b8529a16d96c671c43631bc8e84a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNQEG4SS%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGDDr3In0XyoaZNrck3KuYPmRWPLBcBHCXuc4VdpxIGWAiEAg%2BVlIBgEj7tH5HPCZ254Gs0V3%2FLCKTn0C%2BZiIHBmUKoqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDiuQu2CeXo%2FBaKGircA44K6aR9NUEJotb16wXGAQVb48ypivy0c6KxA5My1W%2BAbQ1VdqOeSFskgkBKOJMfPTEln3lRWIAikmVon9%2FwKWfDl7EFAkLvCLqWuU76DpteYU%2F%2FOn7AZ5J0rMjmrnoBlcw5C%2Bi2Ye5%2Bv6jfeBYAhusL2Q2YxCxTfyRUdL4UCDymRLWImkroh4wvaKiJewoV35WEdvdauz3rs19iL7u8XTm2%2FTNGaPlaFf%2F8tjJdwTJTAP7BEb6yJVPISjXhBTFW3Pm0Ii%2B1GQ3%2Bs46mgL4FWYhTldFbCFNyAPs5KqI%2BtYfqRgawuyXeykCtYGrCX5SGx9WeaKqiCdfWGZpJeNi1ZueSOYVzIl5kICW24DY6ujmVioTpoTjfYG0WzkBwnQIQb0BZKilR%2FZMyBA8SDuRr70RloVvIfb%2Fxh72z4DYowly%2BzRuzTfMhyi7ksKBX8lHoctcXJP%2BLfIUWKhOHqIBRSwddZTC1ZEpxxUnkUUsg748JI1eAUj2iDQy65eXGN9zjksVbXK4ZTXchdnaWe4JE8f44YsgcPu9fNsAwM2oiCFA9PNDnEfQ4h%2F%2F7DMm6cm9XruTH7heOy%2BWbqAcR%2Fwh4Q1WVvGLxSeED7nVz0xjB0PdtilJaFY%2BQWYi%2FCPRLMP3Vhc4GOqUByKSfVWFItJfG%2FdeKvEOgHpncpz8HTgWyqO%2BACw608McZCcfoHdM3p7GDOMOPUKvo27oRcBVhgF%2B%2B%2F64aKdzVeivCh8u9F1XQtWK9rB6qFjHz1H0MTrE1YJqSbAhbVxKu6ivXAHs3vg%2B6lb4HokVjpiidjgNZN1Vx7Lqwl7pQe0q10YqMedCCNu3uxwL3iZsTYD7o8glk4smkNjcykzZAwsIu3zv%2B&X-Amz-Signature=4101a00b332e3798eaee9730164271552e128290ddc985207bc5e7754ddfe3e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNQEG4SS%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGDDr3In0XyoaZNrck3KuYPmRWPLBcBHCXuc4VdpxIGWAiEAg%2BVlIBgEj7tH5HPCZ254Gs0V3%2FLCKTn0C%2BZiIHBmUKoqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDiuQu2CeXo%2FBaKGircA44K6aR9NUEJotb16wXGAQVb48ypivy0c6KxA5My1W%2BAbQ1VdqOeSFskgkBKOJMfPTEln3lRWIAikmVon9%2FwKWfDl7EFAkLvCLqWuU76DpteYU%2F%2FOn7AZ5J0rMjmrnoBlcw5C%2Bi2Ye5%2Bv6jfeBYAhusL2Q2YxCxTfyRUdL4UCDymRLWImkroh4wvaKiJewoV35WEdvdauz3rs19iL7u8XTm2%2FTNGaPlaFf%2F8tjJdwTJTAP7BEb6yJVPISjXhBTFW3Pm0Ii%2B1GQ3%2Bs46mgL4FWYhTldFbCFNyAPs5KqI%2BtYfqRgawuyXeykCtYGrCX5SGx9WeaKqiCdfWGZpJeNi1ZueSOYVzIl5kICW24DY6ujmVioTpoTjfYG0WzkBwnQIQb0BZKilR%2FZMyBA8SDuRr70RloVvIfb%2Fxh72z4DYowly%2BzRuzTfMhyi7ksKBX8lHoctcXJP%2BLfIUWKhOHqIBRSwddZTC1ZEpxxUnkUUsg748JI1eAUj2iDQy65eXGN9zjksVbXK4ZTXchdnaWe4JE8f44YsgcPu9fNsAwM2oiCFA9PNDnEfQ4h%2F%2F7DMm6cm9XruTH7heOy%2BWbqAcR%2Fwh4Q1WVvGLxSeED7nVz0xjB0PdtilJaFY%2BQWYi%2FCPRLMP3Vhc4GOqUByKSfVWFItJfG%2FdeKvEOgHpncpz8HTgWyqO%2BACw608McZCcfoHdM3p7GDOMOPUKvo27oRcBVhgF%2B%2B%2F64aKdzVeivCh8u9F1XQtWK9rB6qFjHz1H0MTrE1YJqSbAhbVxKu6ivXAHs3vg%2B6lb4HokVjpiidjgNZN1Vx7Lqwl7pQe0q10YqMedCCNu3uxwL3iZsTYD7o8glk4smkNjcykzZAwsIu3zv%2B&X-Amz-Signature=cac21c46fefa10910d39581204f6d4d4aaa5baf06cf68a80ea6de1157e72c6e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFJUFRIO%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDs9toCaTyHik9FX%2FxizHbZTa5a9O10HkeXG3WlXi30iAiBxXIJDAw9UPFUZ0TtJ3MX2a016sGfsVLCG7xDpV3pavSqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRtkrpWiqUbgGYAllKtwDNned1e8318asn4oREp2WxLcoCMrmxm4wuzqoJKoGoNnXLHB%2FTPL7u7kV%2Fsdxm2T67g4pHzRLWrE5VjtAB%2FRpCRYy%2BV%2F5Sd3trscjAHVwJNUIDZx3M75yQFi%2FaX17Wz8vOlaKSgEXhaPAbH0vfCmiDY0pRxBGTc%2BjDktOHzFXfvMXby5v85DCty0Pv9G3%2Bpir4m3j2eLNijySOkYX2xXrHHFhiGy6KSWkebD%2FAJWhIaby6KQsmoCAAOsnuhazDl4szvuQjy79PZ1UMRy%2FwOpO%2BWi0u7bUiF1AGLV5hFTl1TGseQduIrEGvSqq%2Bvy5t2XenxIS7dwMrhb6GjkZM7eBNWnPl5%2FefvMD%2Bx8qNLkTru4Qf%2BMvQeIQrtVnoPxQXEmGXZb3xAbOv2BIOAHgelPlzM2kc2byz9q2u%2BTA4DyLq3go5QJyyjZA9uCbp9PV%2B3hQYCnMEc6unGTD4mh2U9aRfYwyHxpJc8HAbRjeoj9OptwoRz0oKY3AWQDVxvaW%2FM%2BVLMpJKMYRXYeRY8YOO4gr8qyPKLODwnTkz5Nb8KxjdCNZom%2BdkBWzo9nbQsZoChqQP9HKG2ExfbKIaYSzAhnYJSlE1p7UTygdfu2rowrzH8atoV1X6g7RmbFjAuww5NWFzgY6pgGBnv3uAAOKvGC%2BREmOUq9bDbJxrDg0ZJ1AVdkpBUxnr6vuqNP%2BA3gsSWK1iX82%2ByDYjZ8V%2Fpvcj%2BWXJUrCEc1UGeX7GcGjrMhdkCXaShQD7t5d5QOcKH85jdhxjdISstM3F6niSuFLDrZFuRR0H7cn39SAaeSWYTxc5CcGKwJtKLTpwaT5AQiid5wuObDY6d%2Fm1iIBjXrrr64HWeUJSt91dGU6%2Bzel&X-Amz-Signature=cfbd54fb2a34fff5cbc5f076e325fb1e029f95ca58ae1820d3fbbfd28f2f9992&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y45WGNL%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEBTg6DaSwinZIILAZBsgUFeUzMdAEZfXa4XoQOrPjCMAiEA5jsV8GCe9jnj9CBIZxOzXHQQGl6PyhaOZIYaUSpUC4kqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKHaFbkswKGqE7N5YCrcAy5zzXMJMPFdTnycZWc1Q%2BJw1iu%2BOXAmP6i4LNpj2mjUTkCtmeOQIQ0RHPU93oi91ATddyMSwEdzEp6oWiVjyMYiRASP0mC8nw1SvhugFGuaKJ7%2BFv9qINjvyKQ37k4BeSaZ55Tkj8U4fwogE5bHM8Tvry1Txnz7v7EHmqi2rhRIcehXhQSWe60ZkHDKY8pa1O23Jc73EQeyofoD6UQxMhb3J5bc01hB%2FwT5AgTQnTP4XY2%2FFp3ZBG4u3a9ruDH2eGof1GpwStz32FZ74cabsXd7JX9dRuVIMrBbbOeqGCYZmVYDwPvXRTT238eH0T1VnB0fndJOQUUeaD0J50O6LNnNRWeiZporDoyLVivzFZksp6IvqFvzNwbpvAPVsV%2FGFwEiZ3mBF%2BewYG9MYnSYfA%2Fuxp%2FysPW%2BbOkEtK7mhlF9Zz9NS2b1c38TliB4c%2BOef0QvwakBoVwKuSkPJ9MM0lmBKfGKjhjxgQX6AHj4jjgMhb2gYjcFII8svW0Z2LSflJQBdnjdPOpxY%2FP3slp%2F6nZUAVOHbU2mNilQnngf2xd6vcmnzvlyd7LERzZbTQ3%2F5HwOgHyt0jYN8PNXGu1ieWSscSdWz2N2HUaZFtjL2IEqrRf3lvUe98hRgVGtMOnUhc4GOqUBjzWDhqbEA3inbVlv7d19Xw45Y9FSKXWKCqy2DshiXm8d50ou2fQhxKMRpw5hq1qf%2Fn%2FsgrQZkLG5OmvfZrlfKb6a8lGnJjjR8dNaAmbHIYtUzqQMAxPO8SeMNRjGpWMakxMx3LvWAVJVTcgEpmz97m%2BvkgHo4ZozoyyATb185R4Gdz9ta2%2BGFwX8igHAww0dYBhr6qmAv4PsTiyYBHKSM10pQRzV&X-Amz-Signature=7bc95872c73733b924171a642fea2a77dd43913b526aa84cc30db4e37079dc05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y45WGNL%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEBTg6DaSwinZIILAZBsgUFeUzMdAEZfXa4XoQOrPjCMAiEA5jsV8GCe9jnj9CBIZxOzXHQQGl6PyhaOZIYaUSpUC4kqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKHaFbkswKGqE7N5YCrcAy5zzXMJMPFdTnycZWc1Q%2BJw1iu%2BOXAmP6i4LNpj2mjUTkCtmeOQIQ0RHPU93oi91ATddyMSwEdzEp6oWiVjyMYiRASP0mC8nw1SvhugFGuaKJ7%2BFv9qINjvyKQ37k4BeSaZ55Tkj8U4fwogE5bHM8Tvry1Txnz7v7EHmqi2rhRIcehXhQSWe60ZkHDKY8pa1O23Jc73EQeyofoD6UQxMhb3J5bc01hB%2FwT5AgTQnTP4XY2%2FFp3ZBG4u3a9ruDH2eGof1GpwStz32FZ74cabsXd7JX9dRuVIMrBbbOeqGCYZmVYDwPvXRTT238eH0T1VnB0fndJOQUUeaD0J50O6LNnNRWeiZporDoyLVivzFZksp6IvqFvzNwbpvAPVsV%2FGFwEiZ3mBF%2BewYG9MYnSYfA%2Fuxp%2FysPW%2BbOkEtK7mhlF9Zz9NS2b1c38TliB4c%2BOef0QvwakBoVwKuSkPJ9MM0lmBKfGKjhjxgQX6AHj4jjgMhb2gYjcFII8svW0Z2LSflJQBdnjdPOpxY%2FP3slp%2F6nZUAVOHbU2mNilQnngf2xd6vcmnzvlyd7LERzZbTQ3%2F5HwOgHyt0jYN8PNXGu1ieWSscSdWz2N2HUaZFtjL2IEqrRf3lvUe98hRgVGtMOnUhc4GOqUBjzWDhqbEA3inbVlv7d19Xw45Y9FSKXWKCqy2DshiXm8d50ou2fQhxKMRpw5hq1qf%2Fn%2FsgrQZkLG5OmvfZrlfKb6a8lGnJjjR8dNaAmbHIYtUzqQMAxPO8SeMNRjGpWMakxMx3LvWAVJVTcgEpmz97m%2BvkgHo4ZozoyyATb185R4Gdz9ta2%2BGFwX8igHAww0dYBhr6qmAv4PsTiyYBHKSM10pQRzV&X-Amz-Signature=7bc95872c73733b924171a642fea2a77dd43913b526aa84cc30db4e37079dc05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DC7SHPY%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T164139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFlRZHrIgqt3G6U7D2pRJjx2jZ1xCtnBWyU%2FLMlY7jFiAiAmiqZ%2BivydFriHkpfxyzdl0%2BWLV2PuEhYlZqJb0gi3zyqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMs6ARS8s4SmF06XXTKtwDmHpCPK3W7vuEAKoZLrbw%2FboDlw1uQxd62VrxsSXvs1hh0JWDdaIcaXGb0AOkvb5OnFJU4wzlE3KblV8PkizkfstEvhZYpeJSwvCeDUy0JPQJPZK1%2FO7Qul7qO6xiu77iPUoUATTyF%2FTKHfTWR4iaLqKrHuufd4GhqIX3FzIcdQuNDZcXCT6GLu7BuWg53EGbRsiKfWs9SY1Qkj7u%2B42rP1RPcaWbAaaeHSPmny2%2F77%2Fqyhpyv2e0RA1CzMpPMTzcGOmhovPaBHT%2BpgXNL0RjD542UNTk8NDQePW0aiR6pl5UCFc8FsqPNaVy3T6aOvqqZ09VGHetN88xjlv6BLGfqaR1hZy7DZXyiBPYEC46JNC%2BgDk8lHmNa%2B7LNP1S67mEViqw95RsvIG85PWfg%2FXkpQJCXza6xxv%2FwVZc4yrppyxUtcklhh%2FCTc7tjew0wOYNdNhKVJv%2B8cliM%2Fxgnz%2Bi%2FwhCLmE46Sg9hA1sL8Mbq3cdskxRegOAguNKpAYSweeHUAxLDUghxcjnXdb61%2Bg5%2FZoZLlnphmjOlRuBxuC%2B%2FAbHC1OBudJCGhcCZa8bWvZz%2BYJVso6ccwEiO2fZA8qBZLQ%2FRMeMh57nOlJ3lQFokyRw%2BXx26z5n8BwdK6owxdaFzgY6pgEndA4bcD5mtkpHt2GoeQoe7f8ShxeXnG97asuDRd2J5vGHaDnfICQgZtamAolDvXUymolNG0rLYhaqqR0ZCrYiqqmCq2G%2B7qQXHRB4N9TtkG1Q02Vxfv0VjVjqwGfw3nh8beNTeNTP%2FCubYYeMG1vA74zFXuY99Ybda36lTg5Ang1zGSxzT44Xei6vY%2F%2F45yAaZXN3CSAUYXYrqlUQTW1XvVro4hlk&X-Amz-Signature=e2e4c68ec8069bf1e6b8d8e46bf2f4b3c7f596bf99a75937b5c565e98a54dee5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

