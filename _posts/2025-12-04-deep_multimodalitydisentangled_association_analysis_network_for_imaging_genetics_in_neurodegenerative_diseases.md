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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI54OGZ6%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQDsQkJLwWJPHtdWF8DvQ4ndlzL9T3P48YQBEw7Fcx4t%2BwIhAJdUb%2Bxl1NbDWrg%2Fui4tfAHRNXNlk9WhmoWHWxLgP%2BF4Kv8DCC0QABoMNjM3NDIzMTgzODA1IgyZ13DTmwtXPbf2MG0q3ANsfU3XKoaWTmsG7dglATiuy%2BcWZ3NWzkcHBrza2FVYDyx4IVvYuPkBOaWBfrOynsBe1s2i5ahCRSI%2BtM9f7gi%2FrYff%2FyhpondA7cBfe%2F3ICoiQ9lzWhYatOElzOObS5iJ8Fdt5BXEWn4NLRYn6uivrqw%2FIpVecEseUpyQAi7oQdbPy6bRAFh7gS6HLz2E99atTZw7NJ%2BHGjz1R7kP3QqCQdMnUHh33YfDZqfyGtOQdJwt%2FESEkO6LDP3ZoQcnHCXZ4QD%2Bh1JWicpYMGMvNkf%2FmrCu9V932DK9ftWz7mAhVtv26j6NK0G7xysqAr%2Fe90wKnVrVwjfXEpXLRlbypa6G2CX5mA%2BiwIQlUbCUiXKiwcsAOkP4ooN1FPctnraX6%2BXGAOWLrM7lDJcujHM%2F2FOWk%2B2VDPrTVefGs6lk%2BQCnawGbD%2FabEk5qNmUeTtkSmn804QdGSeqDp4J2fOnZC4Gx%2FnXHPMNbmKGvD8C6%2F%2FTAoPS4Cks1jc0VFpvO5qNIcXdE3kERQF%2F08G%2FchWfypWi5vTNFSZ3WSZFCpi%2FzekDl2m6bCyS9qdVG637F8rnUDYWJ%2F8k1%2FQ%2BmEPPeuZC99pQNv4sBUNBEzhZclDQFOncCQmqKFnrbjhFp4AQ052jCX9brNBjqkAQFhAnG3fW7PTHWarJ6aEtct9gsGEg5HATjOtfdGIqz9vcrj0ueOExfC5JymXIpdGuJVOxfRdA5%2FOqgjN3i6jVcvqn3PGceOjXFieNRIffG%2F4sqY6C6LBxF6W6FxoyVbvTj7okzcDyr8Gr%2FAu7jleeBLY0p5LUUDjlv3hRPrBBZSat%2FfRcax6MIO3dGpTISPF557hSMSIgMm8uxOjl0tOYwRxeel&X-Amz-Signature=97bed25b171df5d0f73c0b7e708849f28fc1205d178da5378479134ac50c6ac6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI54OGZ6%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQDsQkJLwWJPHtdWF8DvQ4ndlzL9T3P48YQBEw7Fcx4t%2BwIhAJdUb%2Bxl1NbDWrg%2Fui4tfAHRNXNlk9WhmoWHWxLgP%2BF4Kv8DCC0QABoMNjM3NDIzMTgzODA1IgyZ13DTmwtXPbf2MG0q3ANsfU3XKoaWTmsG7dglATiuy%2BcWZ3NWzkcHBrza2FVYDyx4IVvYuPkBOaWBfrOynsBe1s2i5ahCRSI%2BtM9f7gi%2FrYff%2FyhpondA7cBfe%2F3ICoiQ9lzWhYatOElzOObS5iJ8Fdt5BXEWn4NLRYn6uivrqw%2FIpVecEseUpyQAi7oQdbPy6bRAFh7gS6HLz2E99atTZw7NJ%2BHGjz1R7kP3QqCQdMnUHh33YfDZqfyGtOQdJwt%2FESEkO6LDP3ZoQcnHCXZ4QD%2Bh1JWicpYMGMvNkf%2FmrCu9V932DK9ftWz7mAhVtv26j6NK0G7xysqAr%2Fe90wKnVrVwjfXEpXLRlbypa6G2CX5mA%2BiwIQlUbCUiXKiwcsAOkP4ooN1FPctnraX6%2BXGAOWLrM7lDJcujHM%2F2FOWk%2B2VDPrTVefGs6lk%2BQCnawGbD%2FabEk5qNmUeTtkSmn804QdGSeqDp4J2fOnZC4Gx%2FnXHPMNbmKGvD8C6%2F%2FTAoPS4Cks1jc0VFpvO5qNIcXdE3kERQF%2F08G%2FchWfypWi5vTNFSZ3WSZFCpi%2FzekDl2m6bCyS9qdVG637F8rnUDYWJ%2F8k1%2FQ%2BmEPPeuZC99pQNv4sBUNBEzhZclDQFOncCQmqKFnrbjhFp4AQ052jCX9brNBjqkAQFhAnG3fW7PTHWarJ6aEtct9gsGEg5HATjOtfdGIqz9vcrj0ueOExfC5JymXIpdGuJVOxfRdA5%2FOqgjN3i6jVcvqn3PGceOjXFieNRIffG%2F4sqY6C6LBxF6W6FxoyVbvTj7okzcDyr8Gr%2FAu7jleeBLY0p5LUUDjlv3hRPrBBZSat%2FfRcax6MIO3dGpTISPF557hSMSIgMm8uxOjl0tOYwRxeel&X-Amz-Signature=97bed25b171df5d0f73c0b7e708849f28fc1205d178da5378479134ac50c6ac6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7Y2RJR2%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQDOMjPZAg0irNtavJatOSEI4gpEn%2FeyeDYIJackl4KL9wIhAM9QdYhTEZB1rMDqH6%2BfbgdlN3RuV343IxZ5%2BqoInPzbKv8DCC0QABoMNjM3NDIzMTgzODA1IgxPKQ%2F7PEg3yd%2Bk4Ccq3ANUZNHMIgHXnD%2BjnXgTPf14XUMjlI7UOgPVBzHO%2BOV1QVhbTCk%2FmbpWt1aAPLQi9SBYO4qrs0iIC2LBLauOQjIMCz4QGpZJ%2FvvNfvff1qRi6Gu4qOTUaVC8qBdBOTSh8RrhzNKN7BftutZofvtwKdH8fnvs9oJi2Vm3OGXB0PxYPtUBh7%2FbVgUYf0DCvLBBcY0K5%2Ba%2BUf7CJfMSztHWkPd3h8KGN1Pry5jEGBcy1LRmi4yHj6a%2Bln1MI62UvbLaGTH6R6QSTJ%2B3daD0opaiODVAcgeQnEXBeS%2FORfUw9KH0pfUVjZcTLRwSi1cms5D%2Fyi2B76Xte7T5gC7azwV%2BjkR1EcijAwqBFfY7G23ry6VAW3J5FdTfSBgcVA%2FV4VcFbZB71BV4YeSRLjiRSdfwk2e9JJkWy9VeKk3WCdbU7wpzMW5i0F8AEFEsHS0s3h3Fs%2BeZij57ygQZzjsHkI5xBfQH1Hy4DryUL7auZjWQoTiJa9Dnafjya%2BlFTnnXtKAb39DvhziydQPLlaNTMvFtMiBFwuMuFbnbV5J6Rq%2F4v9bRWu8%2B50Xya2zumzw9wY4%2FJkJd7aiaYZPo4A8Ip9KxCjtjYnsLXBv0b9S4ahG16p0w82KPhcQ5UOOzkwcW%2BzC09rrNBjqkAcniAVec4EH0tlmpxz7acHesAMrpwbwoYuhMfiPLC%2FrUxyg1oNrIAB%2B9P5xQyi8MCLe9BLJT7NNlEVYDxrCUp%2BD2n0ba%2Bk87nwA0WtiR9%2BebyIuwF1eLVlvNAO4HsXZrqO1V7RkSv%2BQq9M9BH7n6JCaGQsekdrrwlvGgvei8X7VU2vHg5nTgTZxMqLRWtXIzsA90GK1FgMZ4y2s%2FrDC26yjOeuT3&X-Amz-Signature=0d59b6cca0f15ee220310ae9ace8f0d56bc11d6adcd75b0fef10c502b3ae6523&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663N6UR4M3%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIE9l9jUvKkgJYtn5FlAX5Am0s8okiO36%2FGVfOzbc%2FAAEAiEAiacUZHPbMw6iWmg5c4UypZSRYBYWI6qRCRJ14AbT%2F18q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDDPpzOTvT8t8xbbtyircA%2Fbdeu1PPFl%2BThyuNG7BfaGRWYCpMZr1tbACsXAZt7KNucp2B0cmWhiFbt7amDMe7Xv8CAYw7LAMX2n%2FoEN1FA1Iqh0jeeY0ar%2FqwVS05LWde9ED%2Far5UHUN1lZwKuj6M%2BecJaRI0qJ5vCPzTdvQiFdy34bD7ZPhfKEBCb6uufVdnthZFmtf1xOLCgeNyPkYadK9rfZqGXvhHxm%2FgzLF44%2Fhpjy2kuDRrLhVJalAFvzqzczJ177qrBfg2fkUseFE3BeGNpZZDm6P9JdzVYklpscbVfkOMoRfImUWi8cTHj5fStpFXl0FaayDyjALadoc2OTCHIcQ53h%2Frx%2FzLYBw7kbirVHughA4IcvlAL%2FxExaEy7Q7tMbGzbG1o0i9P8g6Alys80Z7wnNYJWrmL1%2BHXJWscQiQD8XqDlnjlyA6Ci9f5YVLp9XDpcbzrGH4N8udkqM0BjnGgqCAF7gUTudlhIb%2B2eqGKCFCcvgdCUs345bWlBr6X3IiBifSlTm9i1NXtW8E9QwQPMA4hAoaD1UqPAjqht6OLPDyHbHcSKS4U0%2BfVKdwGZrwLEnnoTn00JxKz4ca0Bd9R4gyN5aCroZx5WW3R7Gn7HAAOgwHhqsOBN1KZhrBVhfBC3VO4CgBMPD1us0GOqUBJV8Rn0MWTBFprfTtmYsaJhlC1rEv8uuYgISaXC0WobHX3Og%2Fh4UtAbHhu77ftuBYWsMk3yc%2BKjLDUVGjQBIrfxBzvXiDLsKly4Q3ok%2Frw%2FukWQNJaNZtOXpu1JgkgUDogG3qbgNd%2BujXwU%2Bix2mjwIr3R1ejemtkgDIKFkjrc4eJZSc2FKv7jB58gZDdAAy5kCFCIny4LyBu05mp9tRepe88gn%2Fs&X-Amz-Signature=9de42bc88bbfe425a101024bfb2be04d08afc68027e486180e009fa612ce9e11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663N6UR4M3%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIE9l9jUvKkgJYtn5FlAX5Am0s8okiO36%2FGVfOzbc%2FAAEAiEAiacUZHPbMw6iWmg5c4UypZSRYBYWI6qRCRJ14AbT%2F18q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDDPpzOTvT8t8xbbtyircA%2Fbdeu1PPFl%2BThyuNG7BfaGRWYCpMZr1tbACsXAZt7KNucp2B0cmWhiFbt7amDMe7Xv8CAYw7LAMX2n%2FoEN1FA1Iqh0jeeY0ar%2FqwVS05LWde9ED%2Far5UHUN1lZwKuj6M%2BecJaRI0qJ5vCPzTdvQiFdy34bD7ZPhfKEBCb6uufVdnthZFmtf1xOLCgeNyPkYadK9rfZqGXvhHxm%2FgzLF44%2Fhpjy2kuDRrLhVJalAFvzqzczJ177qrBfg2fkUseFE3BeGNpZZDm6P9JdzVYklpscbVfkOMoRfImUWi8cTHj5fStpFXl0FaayDyjALadoc2OTCHIcQ53h%2Frx%2FzLYBw7kbirVHughA4IcvlAL%2FxExaEy7Q7tMbGzbG1o0i9P8g6Alys80Z7wnNYJWrmL1%2BHXJWscQiQD8XqDlnjlyA6Ci9f5YVLp9XDpcbzrGH4N8udkqM0BjnGgqCAF7gUTudlhIb%2B2eqGKCFCcvgdCUs345bWlBr6X3IiBifSlTm9i1NXtW8E9QwQPMA4hAoaD1UqPAjqht6OLPDyHbHcSKS4U0%2BfVKdwGZrwLEnnoTn00JxKz4ca0Bd9R4gyN5aCroZx5WW3R7Gn7HAAOgwHhqsOBN1KZhrBVhfBC3VO4CgBMPD1us0GOqUBJV8Rn0MWTBFprfTtmYsaJhlC1rEv8uuYgISaXC0WobHX3Og%2Fh4UtAbHhu77ftuBYWsMk3yc%2BKjLDUVGjQBIrfxBzvXiDLsKly4Q3ok%2Frw%2FukWQNJaNZtOXpu1JgkgUDogG3qbgNd%2BujXwU%2Bix2mjwIr3R1ejemtkgDIKFkjrc4eJZSc2FKv7jB58gZDdAAy5kCFCIny4LyBu05mp9tRepe88gn%2Fs&X-Amz-Signature=63440693848e3ecc7cb9ca6473574316f11b10ad9e2556614457a86938048f95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IAKAZI3%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIBSy3Ignhzrk%2F4nSaa%2B6QzblorxOhzIo95J1K%2BKIGn6%2BAiB7cgCns5yzpDyvRxFCUo0oBXt0MFsxWExNrfe%2FxP2EFyr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMY5tngOkTg1LR%2FIM7KtwDAKiXAv3r0BUpcyIfBibvY9Tu2GRuJULnsSHzQpLCiSAg5MJf2XNxXZbgyDqiSUPQCp2eFtsQAP4RHzyoE4SYdDZktysT7JO7cNRLvew5%2Bt6wkjtJ2hFOaM2WFwTRNsX44g1OPW6qqId%2FYcIcjudJ3afEXJRy%2FyEz0GhU8KQaCeEaJjB2tv%2FySMNSUlRoioE1wWtGyTHoRjrs6TYcfDVKmocytNPXF4dImtu7fq6yXdJBP7%2BYDCHS2TH1HSmsxXDDC22Q1Gqs4tNh4Z962LJ9ImP7k%2FnnRucUTt6HyteNYkPHeoUdnoHaCac6zgnmEtZcdrEolQp5MKhQH17X%2FSrIGE6L4OT2IYAz8imJBdMzXq4XwNxvaZaqrbIJ0fVBBT7Ju1TeSHOQ8odqr1zh%2BzbEi8q%2F%2BKZMDs1buUT%2BGz0WYMF1Q1NeEpKZV0KJA%2F%2F54q5FPSdyESBJ6QM7FDSCh8otW7aC6jMmJUwzqYqvt8hvMiS%2Bya%2Fe0gcTjK%2FE0%2Bujyn%2Bq4YBIulczNB7Sf%2FA%2FlQPSppnX5UaCJQnXuy9sGhdW0Q7gYvHDyc3PjdKCCDwtnTOTOSDhcpG54ACkC3%2FbQChC38l58TmB5BsJ%2Fo8YfQ5O1u6goXjRowvyG0kOAuYwhfa6zQY6pgESl1m0nDWKEHGt8FYWuXWbcCXyHZCkWEP0fxTYEwACanZtdJSnaX4YHvsBMyIsfRP5OTMbVQ%2B47%2BkpELteEPNIcpMPMR4XIidnPNPfks9xIJfOIlNB51nzxCcISam5loJTIB%2F2d3E7JB%2FK42E6FI0yA1VzFu8YttL71uUJED72Z3UBXvyyKfjmX80dewP5nNqN%2B7O71BPBHFgknOM%2BaceoYG5YplGm&X-Amz-Signature=828999f73d6c7a5d110356ee0c3900cd8cebce6eb81577bb1e83b699d7b8ca97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDMGYUH5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQDZn%2FixBks7yphpoHA%2FunvNMzTkdjL%2FaX4nunnqhBEcGAIhAOj1CYbWS%2FLpKOSFA3YHv3riwriortqs4T89%2BuhcOHk4Kv8DCC0QABoMNjM3NDIzMTgzODA1Igy%2BBQRgLVMJqh8aOnYq3AN9AE64qxK%2Bp5EouBHf%2FxwIZ0dBCVpgsuxxNqh%2B25hoSevzCBt%2BhsZkfr9LqsmbDGsuaPv5MdgPBsX5uyOqjtF1mYp6tt8W2uKlz8WczvIOvv4%2Fg5XXo228D%2BskoxDeZxmwQlswkyaJ5ihNtnWqq2tZAPtFLbV%2Fw%2BHw7EjqeCBxIA7uGrwIjGIu2LcEH%2B0xeFS9hA1IAX9XgRDRage%2B9tPVdSWIv8rn8BrF884GlT%2BAagVeG0wA6abBChKUbiuvpKnc%2FldnStj%2BmbiOvYQjfafIuHqkT6Ih9DK5%2FloSuLEZJkAXUov%2BbaUmnbbGMkrcWQvJIJnmq7xLuvNyHJVUI60Zz7uajQgdGjn31ZqffwMt1qWItp8gtJ1d%2Fx%2FKoldpTH4FmvlOWMtyYGT%2F05UD7270UQyqD0k0vosiTI74SJwsHEGw2wPwbgo8RNKgIR1gnz6bWvdt1xM1NLcV1%2Fhb7HaLchYoXfJ%2BkbcN36bu7KgEydY2mjp4cYTuYiJB2aZqM0aJKfnK8%2FkGCuJUjKmP3g3X3jsj8%2BvL64YWN5%2BL0wOBVwmpBIb9KVT7NANOoa2HyjluhkXx8uCs0JjMwHStf5P9SWQWGUU4JNgNS8IbdY44i9i76U9aah8r3sMqezC39rrNBjqkAUElIEj9hi%2BJc71L3qFjvZIbpd4HlRYmfsQFzVcEXxLw7BTGB4eX7F8Mzr%2BYrnq3I%2B%2F%2FoCKxmR87z%2BC7%2FNReFoEi42D9irT09vNz1DtgA3mx7eyOyRKFOjoGXQ66nEIV7H9%2B5aZqn16jpKPt%2BWtS72t1WMwMGLheXYFHw8%2BAAaldPxwqWGPo4aARIfK8hT5K6w%2FxGG5fjj%2FCcnWu5us0EL7MJqvI&X-Amz-Signature=c5ec6b5a888471631e5d6ecb30d9c91f41cbe4b4fdb3b1ea449553047c099eb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVSFWVOH%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQCloWgK%2BamIf4WiVT6gdp8zzoJx%2BmdrjwtquGcXjeLhlQIhAN4ghrVkVbm7qSvRI%2BDewN91VT24mMPKLURz8G%2FZ39Q3Kv8DCC0QABoMNjM3NDIzMTgzODA1IgyGI3fEDXDRT3ZuRJsq3APNPIONdzCXZQReySv%2FAxsuF5Q7uO4t3UMerUEi6aJvqw5AXyuXk6P2j9l0I8eJcpI1FIr%2F%2BcA0mNoiPCnd2yncfS7eALR4VKv4RuyEfTEWyScI0TLAH%2FV1IdkRSvFN1OmlCnWw2UdnvbRjy7EUfMizCvJvdpBNObixu1Xc%2FFn7Z7Yhbt733jcb5g3C9ETf%2F1STn96gEr6EsCgWDM28i5342fh0IE4wozCvTR7QngGoLmnfSunwvtdGQ1yZMn81IhwqPxrOpDvL4bybL7bnYJML1o%2BGlN3X5n%2BaECniKmIudn8VZgE8UpgztOObvFyzYAsjUKPjmDc2CVFjo3T9G0hmDiD8PpqaEN5peOdSTKhIf8WXcLLpcmHQ584akh87HOOCzaRtfPMF2pEKCsQD90Loog8s57AMlCcRgNPYz2zWeX2sffHUpbuCKxUrxJilAzYe%2B7tf2EUhXyoiO7rn8KkCsENxdO5%2Br08gdeA3CPrQfgvaFea1XKckZhurpezIfIIR2YYaky9DbGGdOdvBaSd%2B5S4wRRP%2Be8XP45WiqbCmG1skhiZ2dlwWj3XHn34S5fzNWMNVRyM%2FyWEVk%2BLftjKjvUszyrN5JouxlBbB7YVJSivmlaAw3VVe3bLVHzDw9brNBjqkAVGpQnuLwaYwWJ4fmoJUEksa%2BpBy%2BJQBJ5%2FO9HLX777%2BM5DJ0YLY6SnsFYXdn1rg1hdHCKN37M8JqWnb%2BZI%2FF6OgcnNUSiK%2BYZn0Qzng%2BzqnXrk9bENar8EEYxHtMwXGefSBcrZKTjP16wrus2YFAJ9aV586l2ni4X9KCaRMw%2FG6rsrGKtHZz%2FT9evZrQILXOzbE96LAiKuCHPym6e5vBnDkBquX&X-Amz-Signature=be8adb941650c5da7fa67235e10094d095caa94a6b3e116ef02d5abfd882d973&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LWKST6J%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCyIzyQBqIi5FUC4ijHyDNfLUbr7IqBWHOC7CyRtwcV9QIgbFjGwWev2NFW9e7BKBPWljTnRP5u3SpGcuKI9m%2FiLQwq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDC%2FPPdM%2BrGem1Dp4eyrcAxplNtlJ6ZgxMojNoouFZ82MKWSbANmx%2FWFaRPSfXLbi%2BFXSMUXRI%2FqdxwLGg%2F%2BctXcrvm4a15wabmfrNLtmBLMxrhCxg9YDvgANK%2B7rqX3alK406fWYLbPl3b11MQs1kGRLspuTTktI524oFcXX9fUWZewsnlqpdCKUa9H6HI6kp0ZGR2uBi%2BYXzXlv60PfPLcErC3lT1Awjgh7SwZYTadKNxk11%2BehAB%2Fjk2MhvG3az%2FH9JiXYVHEfF4DpC98lV%2FDKxAz1RZtpWOy4UAZ077qN%2BwJR6whnP9kETiOLv13Kw4i8rMcHr2ixpCY2oqjdnh2vDO1ZOroFRUF6Pw62dcQ0LoLVtGAmoiq7lquOU5%2FlSpILQKx4%2FC2Z8md1m1yx8Yr9o4hvK%2FtUSuGlDDGcjQ5phbQCVaOUfb5HH72HFjoeyIV6c0YuYkRt4Wx%2F5Ha6Yeg8X5QyOvXnUsBGttot5nk1pqOOqrI1lTPl2nyp9WCJLtFwyoQTmA5J11qPIobUKUQX%2B19qBaWUJpkUJVZJyHMG5F%2B%2FDTkyTC%2BAjTy9iGAIFallhbAKHeB4VytN0vBP6d%2F%2BIHZFjwRoGSNa1bil%2FjySMvUdVr1kMVKFp0w33mUb2oksRlwxfBIJ0zAgMLX2us0GOqUBJVNGm21gssQN8z5A6L3%2FSIJOL4%2FVHTwVA65gDKueZLVCEBMgBf5c6wwUsrIdM%2BAS7sIvETGxBGQnLWFTJO9%2FK7kL8DJiygVPMI4m9sUB%2F1kh%2BnHkvsyDv8RD3iI4D8CvMSCbxYNAHPTA%2Bbz9qaVbjl7P0a2mmUp4bOlvgv2%2BwF7j84DvTMQVl%2BiccomNB%2BgUEwr3QRYNNO21iTD99HBhkiYyYfKL&X-Amz-Signature=97a8d34e179d0c9a6cdeb849c28adf3426f26a583df97530e7f335de37b2711a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LWKST6J%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCyIzyQBqIi5FUC4ijHyDNfLUbr7IqBWHOC7CyRtwcV9QIgbFjGwWev2NFW9e7BKBPWljTnRP5u3SpGcuKI9m%2FiLQwq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDC%2FPPdM%2BrGem1Dp4eyrcAxplNtlJ6ZgxMojNoouFZ82MKWSbANmx%2FWFaRPSfXLbi%2BFXSMUXRI%2FqdxwLGg%2F%2BctXcrvm4a15wabmfrNLtmBLMxrhCxg9YDvgANK%2B7rqX3alK406fWYLbPl3b11MQs1kGRLspuTTktI524oFcXX9fUWZewsnlqpdCKUa9H6HI6kp0ZGR2uBi%2BYXzXlv60PfPLcErC3lT1Awjgh7SwZYTadKNxk11%2BehAB%2Fjk2MhvG3az%2FH9JiXYVHEfF4DpC98lV%2FDKxAz1RZtpWOy4UAZ077qN%2BwJR6whnP9kETiOLv13Kw4i8rMcHr2ixpCY2oqjdnh2vDO1ZOroFRUF6Pw62dcQ0LoLVtGAmoiq7lquOU5%2FlSpILQKx4%2FC2Z8md1m1yx8Yr9o4hvK%2FtUSuGlDDGcjQ5phbQCVaOUfb5HH72HFjoeyIV6c0YuYkRt4Wx%2F5Ha6Yeg8X5QyOvXnUsBGttot5nk1pqOOqrI1lTPl2nyp9WCJLtFwyoQTmA5J11qPIobUKUQX%2B19qBaWUJpkUJVZJyHMG5F%2B%2FDTkyTC%2BAjTy9iGAIFallhbAKHeB4VytN0vBP6d%2F%2BIHZFjwRoGSNa1bil%2FjySMvUdVr1kMVKFp0w33mUb2oksRlwxfBIJ0zAgMLX2us0GOqUBJVNGm21gssQN8z5A6L3%2FSIJOL4%2FVHTwVA65gDKueZLVCEBMgBf5c6wwUsrIdM%2BAS7sIvETGxBGQnLWFTJO9%2FK7kL8DJiygVPMI4m9sUB%2F1kh%2BnHkvsyDv8RD3iI4D8CvMSCbxYNAHPTA%2Bbz9qaVbjl7P0a2mmUp4bOlvgv2%2BwF7j84DvTMQVl%2BiccomNB%2BgUEwr3QRYNNO21iTD99HBhkiYyYfKL&X-Amz-Signature=75469b596b96da4094d7015124e84db4a9f8f788d72123d18374d9a5929d5646&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBKAQOWQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIBVas7dP%2BDcIC8hmm4PdDC%2BczmxqDc1lAkNuOspzMqUrAiBG3iQ0rz5fSYNrAS3ZbDdONNdy2hheEUnpUYQoCjk%2BVir%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMKSq4DOA1b7EncbwRKtwD%2BwZUphtd8fjmgbB%2Fk2rRbJWU3fuKA4wjdTgS261UWmOrkA1gnuZfsN6cqQy9Uvy2Z5JUuj9PVgU%2Buy0D7xkVUw0KKqkqEIZlcxJhwTcslGoHQcumrcs32pd4%2FX0RiLJxk4FY6x54oaw6oBUMDfFMHRgGmY6EhSpRGAJhie2v0WlhkaCUnuf8Tj2JtQIXMHhPAj%2BnUQxCteleVG0BHr3%2FG395a%2FQ%2B7bEMBiGDrFx34AiYA5DOOzx0l91X6vqy15zklsyzI3FXag56MuWoc8VESEl5MrGP9ArYKU7ilGDYYTfpdszI6CFqa4i858OQYnUCZV3rsR3leGEJ9D3IClG2fOdhjjRrlsUl9bisgS%2FTTHOJAxReo7BAJX1feOb3A%2Fd9tr5H9mXi5e5iHa7UAkna7Jlx38vcjmS8%2BBie6FMDjFt9npy2bfYJ2Mi7J6cSIT84%2FQgpAnXvDjTbI8cMO7gfL3xdRsLCGFEJmvV%2B%2BX6fFSBW4wzzUU2e0SIWdUOj%2Fy5tL1dc6hbKcXGrWg%2B4Rqy9ALMo4eEIoe%2Fkygacw6zwllWU1oBM9hL5361x%2FAALTPqlcqe2500Sg%2FBLbiTd2lIT9f7vTQ2vbBJL4fx0lRqIHKIqMMFouR2SdJej%2FLkw7%2Fa6zQY6pgFHdzXAm9g0AFVEk1CaxxocVAAI39LYt1BJ6YD6wUdAV4hEQOc1VQcLEgL7GInravffP4PwBcILdTrdbz696nsCyoYdMNAQQjyzy3hE89ZD34nzunOdFP3POyJ30b%2BRm2%2FnnKNlsH0N4jrlPzK4KfpX%2Bvw1YD4YLPRLKXjEm9IOWQVLadCLyqZ8us%2BbskptTB6h2kZEx%2FwALwnykIcbcP9EONGGxsxO&X-Amz-Signature=f45b445199847211fefa520e4d7c5bd0ac9715672bae55d0b9f5cf252503fa5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXEIQF54%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIFas5MIHq%2FAYAFO48o112A3oDMF15oYpkA9Ndus2LDWQAiEA%2F3HbPZrBA8DADagoUs0hFISJD6OdBG47Ndkza3xeyE0q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDGLEUiK1Nwq5MRKfiCrcA%2FrzOp%2BXBD1yNuz%2BQ9APLswi%2F1Us3s12724y097Dk3f%2BJ1rVni%2FL3KuulCZmuYUtv4%2BYWNexR4xYRzTJKTxBj1eKkubUVk0YumOzFUMefWhoRPZOu6d7bOu2KRO7eBRBcHlmO6%2F%2B2uGCYTIBBUeRSQreyxRCasi1Rok9HB21n7vT%2BkxhczMHIOpZHbC7JJwdHJmllrx8ecG3bZ9m1jynxaXc%2BXiGIdHTs3G0N%2BG%2FAPJja1%2Fo0Xthqdna6VXJqmQz84pUPnWqUrodKLaqQ%2FCr%2B6UkE1urv5jTKMjKfSQ4NaUlnaJD1EsMzVKCng3ibG07o6%2F5BUAYScl825jqI2AITDUKMvNWK04CHoz%2BIZAhe35Ur%2BRjNjfINzDfmgPeSC1J1QWdDbYJDZ%2FkAuoVxR%2BZhRAtHebzunQZd0%2FwqBFsmqA9SPUNDRiEksLmEMIp%2BF5oaLjEM168McAkqWabsb3GlFjS8lV52Mkt0vWO76J%2By%2FVU%2Fv6DFqpwhiH8Kp3ef3s1mkyfgAyuC35KZpFIUp9xuQbxt8N7Q1ToTMr69J6a%2BCuyA3c5b1zjPevHwl%2BWWtvg2z28L7jHSXBf2nyHOExehm3ZCAvvQm1b29TIQGBc8%2FwroHFVfp4H0iK1lEY7MPz0us0GOqUBoU5S1CRMGH2K0eTSynCM4jn0uXYgm6GW%2Fp0aCALEyrADlUVcUhUOf4cdQkRFyyKqSHSrdtlr%2BiIV05uLrVx7E3cQ%2Fedn1eZFAK9VdFrJzO%2BBdVhHyKoUuooHrADU0RDQlKZylDuq444nFhEkYy%2FDW6Ew3rb2qHZiiBe9La8DMjlOA8OMAW%2FlaccXBpOF1p3L7Cnlm6ZnI3qVTIa75Qiv3MuQDawR&X-Amz-Signature=737794ae473ce97791922549904b9cd59366949d5c5f2ce9944acb36979e4424&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXEIQF54%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIFas5MIHq%2FAYAFO48o112A3oDMF15oYpkA9Ndus2LDWQAiEA%2F3HbPZrBA8DADagoUs0hFISJD6OdBG47Ndkza3xeyE0q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDGLEUiK1Nwq5MRKfiCrcA%2FrzOp%2BXBD1yNuz%2BQ9APLswi%2F1Us3s12724y097Dk3f%2BJ1rVni%2FL3KuulCZmuYUtv4%2BYWNexR4xYRzTJKTxBj1eKkubUVk0YumOzFUMefWhoRPZOu6d7bOu2KRO7eBRBcHlmO6%2F%2B2uGCYTIBBUeRSQreyxRCasi1Rok9HB21n7vT%2BkxhczMHIOpZHbC7JJwdHJmllrx8ecG3bZ9m1jynxaXc%2BXiGIdHTs3G0N%2BG%2FAPJja1%2Fo0Xthqdna6VXJqmQz84pUPnWqUrodKLaqQ%2FCr%2B6UkE1urv5jTKMjKfSQ4NaUlnaJD1EsMzVKCng3ibG07o6%2F5BUAYScl825jqI2AITDUKMvNWK04CHoz%2BIZAhe35Ur%2BRjNjfINzDfmgPeSC1J1QWdDbYJDZ%2FkAuoVxR%2BZhRAtHebzunQZd0%2FwqBFsmqA9SPUNDRiEksLmEMIp%2BF5oaLjEM168McAkqWabsb3GlFjS8lV52Mkt0vWO76J%2By%2FVU%2Fv6DFqpwhiH8Kp3ef3s1mkyfgAyuC35KZpFIUp9xuQbxt8N7Q1ToTMr69J6a%2BCuyA3c5b1zjPevHwl%2BWWtvg2z28L7jHSXBf2nyHOExehm3ZCAvvQm1b29TIQGBc8%2FwroHFVfp4H0iK1lEY7MPz0us0GOqUBoU5S1CRMGH2K0eTSynCM4jn0uXYgm6GW%2Fp0aCALEyrADlUVcUhUOf4cdQkRFyyKqSHSrdtlr%2BiIV05uLrVx7E3cQ%2Fedn1eZFAK9VdFrJzO%2BBdVhHyKoUuooHrADU0RDQlKZylDuq444nFhEkYy%2FDW6Ew3rb2qHZiiBe9La8DMjlOA8OMAW%2FlaccXBpOF1p3L7Cnlm6ZnI3qVTIa75Qiv3MuQDawR&X-Amz-Signature=737794ae473ce97791922549904b9cd59366949d5c5f2ce9944acb36979e4424&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMJUL6EH%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T122910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIE9C6vZkp7f8mHP9LHjLUORuKCJ7P17E3CDpOzdYQsKHAiEApfhkQaft2Pa7EmTtpzYaqxVzPK28hOuFw6GM1zybsogq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDC2JS6MEvgdKlGbCMyrcA1FjWiBRGs5B3YTcNjXV36j%2Fpt5kK61OGQa7gLDNycxui86hhXURxzHUx%2BT5eiUTP5prVyR7JhWcR9y8Q9UizExFH4ylP9781CmJELwqa9QAPE81Qx4ml1mTI24qGWtAJoFvKh1OapJlc8ExFA0XhmhuFJ4Vc9Cd%2B5VbXvO%2BHugiPP92zfKE3xXrNXXJxLrk%2BbwGyt8pt7fXy8MzVBiAJ8Fb4oOahaFo%2FEtiF1rajw6uPJ6LgUE3ZgkwgIBwPFZO%2Fj6ljBK79MJe5e7WezRTZ29rsGFVJI0EOLjlMOFJjmNvRYo6TB6ydhxo1ZeoA4PZYd1WxYCYORuyW6of88NEoirFm9n02Qnw4k6fo9OigsZnt7t7%2FtbGSLISmT1UOcf6%2FedgQ3EJO8SF17F1vsjA1j6Z5nFY5QkWXKrcVOyZvaEKUY%2BxzkuLCAgkmJ4SpDAXQZ5DTNBXNxcfCQNuBbmtEGkwWx%2BadpXKkMegtDdXgEkCc1iG91qguwyhpvKF1lMu0PrrOEN9iFWtd7iQvzmrIj59gWLEcnlod9%2BQqif3F3k0ucLrgRvV5LGoEYlQkH42cGQSjoM1N28DldL2XbZIZX33oGXqT3M2LjPC0Tm%2BRtNLNO%2BUr6mXPbWKOUzpMI31us0GOqUBQlc9UZPaHlvY8g9WajzaIq95byCRa7hmmjD8hayEqj0D7lt7Dy8jKgF9%2BIKrRSfg2yc94KdvpOnpxKfxA%2BarNgi7Gv3VRpYTNExrXIxEuXF7py4unfzrd5hBB3EV6KQNsgK8ANvdAgnmtx%2FxZhr6wtqHjL6g6yBUZK93TRs7%2BRony2bw0IIdzwfwDyUPsGg15HqJO5dr2UFCtsvGGsm4C5S11D9Q&X-Amz-Signature=72aef0759f7166fc829d4b708170e550fd45625cf1db7bb9e0f7240c015065ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

