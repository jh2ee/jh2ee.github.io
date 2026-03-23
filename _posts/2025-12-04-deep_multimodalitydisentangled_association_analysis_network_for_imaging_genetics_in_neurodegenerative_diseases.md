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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6ZHMLM2%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2B1dZK3j7PHN%2F9mmlY3TqSpT8Gdf1gpcVYWuLuu%2FSRrwIgCENVaR0geJtdlmRoZmzHnubSV5kAz8W0i%2FpwDsOOKD0q%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDHYE4ZmYdl3Oe%2FQrsircA8LGgjvVGHJAhnnfxqnr8Gl7%2FVbkjGvaJy7JinxkYnWAHzR1m2WvTAQA8ZIYtkHh0d4h%2BXMvTS5gVc6wmnS0jPGNPRD%2BiPdhdLlGNqCmEnfEHcTiQT3X5FGcwhxBGoClSqvC1jNCks4QNDWYVgKlGtQaT%2BgvjeRKoSwM04E%2Bwjtoovu1lWiJ9XRfdBHISc1FC4uxq8U%2FO5UbustKPuVALaQNKyt0x4bdHDB%2FD8LS9djTJ7EpE6Y9WUDXdpx4OwxIh2tkuSincoIV%2Fe0n%2FFd7KCGyopJVKt77f%2Fmiq7NQz7rPpSSSGlwoNfV%2BKtB5HxidFbuULm6OVvOtb2gVq9qNodlyxO60JMAeRQyFod%2FGWk7gNAWA3ekCQnmh7VZBf%2BUwCQSRkZLGlvxZHUEzycjZ%2F5tevulTs8pCTe0NBOL0ZH%2BKtuNiuJjiNM1%2Fo9VkrfQNI32moWiZgYs4IjHJjYx40rkMTrQbdxf8xrRGOVcf07hg%2Bic1SYwnd2KUQx%2Fk%2FdE88nINUGfFXAtGTvoXY9KFUuVa89aHY40oFyeeZ49UQyUZsun4QwxGUa%2FpwZ6GJPRgBZsmVafeZ9u3FXPj9s3fgqKFb4rTTeG3xjDAV3cZizp2fMR0PN%2B55BzTFj%2FAMKqphM4GOqUBQaqS2clGfDtKrph3OnE6uNAa7%2BCueJiexpq%2BT0Xyn%2FDzQaZP1cyJeCutySPM5Q7J%2BRPE24Y3gSWRqRRxqFTGBNci0MOUNV936tvdrXRzz%2FIWaAQrzbyHbCIyRbBap4eKZnlhiHNrzhNLhv3HDLQjS8B6OzY3OvF3UfgEmKJk71ux3NeonAYfBusBFSa%2Bhz6LnifBKMIquVDgQyPky%2Fj1t5%2Fgcudl&X-Amz-Signature=f38a9658ce4bc9a140b4082dc0518b7b85468a1f8e19c76f7edac2be371d42b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6ZHMLM2%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2B1dZK3j7PHN%2F9mmlY3TqSpT8Gdf1gpcVYWuLuu%2FSRrwIgCENVaR0geJtdlmRoZmzHnubSV5kAz8W0i%2FpwDsOOKD0q%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDHYE4ZmYdl3Oe%2FQrsircA8LGgjvVGHJAhnnfxqnr8Gl7%2FVbkjGvaJy7JinxkYnWAHzR1m2WvTAQA8ZIYtkHh0d4h%2BXMvTS5gVc6wmnS0jPGNPRD%2BiPdhdLlGNqCmEnfEHcTiQT3X5FGcwhxBGoClSqvC1jNCks4QNDWYVgKlGtQaT%2BgvjeRKoSwM04E%2Bwjtoovu1lWiJ9XRfdBHISc1FC4uxq8U%2FO5UbustKPuVALaQNKyt0x4bdHDB%2FD8LS9djTJ7EpE6Y9WUDXdpx4OwxIh2tkuSincoIV%2Fe0n%2FFd7KCGyopJVKt77f%2Fmiq7NQz7rPpSSSGlwoNfV%2BKtB5HxidFbuULm6OVvOtb2gVq9qNodlyxO60JMAeRQyFod%2FGWk7gNAWA3ekCQnmh7VZBf%2BUwCQSRkZLGlvxZHUEzycjZ%2F5tevulTs8pCTe0NBOL0ZH%2BKtuNiuJjiNM1%2Fo9VkrfQNI32moWiZgYs4IjHJjYx40rkMTrQbdxf8xrRGOVcf07hg%2Bic1SYwnd2KUQx%2Fk%2FdE88nINUGfFXAtGTvoXY9KFUuVa89aHY40oFyeeZ49UQyUZsun4QwxGUa%2FpwZ6GJPRgBZsmVafeZ9u3FXPj9s3fgqKFb4rTTeG3xjDAV3cZizp2fMR0PN%2B55BzTFj%2FAMKqphM4GOqUBQaqS2clGfDtKrph3OnE6uNAa7%2BCueJiexpq%2BT0Xyn%2FDzQaZP1cyJeCutySPM5Q7J%2BRPE24Y3gSWRqRRxqFTGBNci0MOUNV936tvdrXRzz%2FIWaAQrzbyHbCIyRbBap4eKZnlhiHNrzhNLhv3HDLQjS8B6OzY3OvF3UfgEmKJk71ux3NeonAYfBusBFSa%2Bhz6LnifBKMIquVDgQyPky%2Fj1t5%2Fgcudl&X-Amz-Signature=f38a9658ce4bc9a140b4082dc0518b7b85468a1f8e19c76f7edac2be371d42b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VYS7KOK%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYAtPPY0gnuE370Qt5DNR5QKP8C03H7HnMjZPu2SxFtQIhALoMe46EmITSvBqftNEexTZ23XPodbOGeaB6IDdehDUCKv8DCHsQABoMNjM3NDIzMTgzODA1Igy6DoPPxthFp823%2B2Mq3APh5ZxMevP4zXpEX5qWm7jnSAmQvBwCoOr9xeKUh08xstQ2HQVVu3lIDWhUiW5iVxCBjoEvsjNFENABBWYz6LUxjRFr5HGaxEeyTlMhfYqUX6n4NKIot7GrFwLsimBiRrC8w8xj2UpV0NvQH7j0Lxl3H1NQcXYEpQmMdn3CJpWccxQBXwSVH6G2WCnObw8B7vAH0tkHvknWgQ%2FYO6NNz4TSEcn%2FawV3DFPOuHsvicbDGmXb6DjThEJqvEXq3%2BhuZRS8NP1w2KO%2F4hbay9xprHkWB2wo8qL6aqbsn4QW9c6thw3Il0s1TrvPV4%2BS9jYNH0ftYBgNxA%2BKeoWe1gND55UGNVDHcYjc3RFUq9GnENg2Y90QTAGOkxjd0aSyXplh37aEFLDtqNB9bGm8DM2Bs5lbKjv7HsKwOH0wCOzFgu1Uf7%2BcxfDnZ1u4AjFAIFf4FSr9O2brOaF2Ty%2FIrIE0ZYE2oENKrRrgxzl8U5cU1r7JTSwLg2DntdZIUUbCLMuEIe%2Bnljy241st1L3THWQ6T6Y9SCLvRiKcrnURSU6ZYXIXL0PvXQLkrgv3Gu2LUHApvUw6yq2ZZooZs1RjUqwR7AuGxvwacexV4Vf1%2BQeTswKXhPa1m%2F3fec8x0aygWjD3qITOBjqkAXoHY%2FfN%2BwTd%2BjXRK6BdbE7%2BoAFdYORGJTADCHZcM%2F9rnbZE7YYWWa2mKejcgKDAK3C9o0YkBWNSSNEwuWnxyOQz%2BvR2%2FyaQryp7acEWYbigRD412P3zBI6CXhW5dovqKm5YIT9BcsrYe1kMNkuLG9J8f4lKmkNnbqh0xVcHCrmmy%2FNJjy8pMyrI0g2mj7QN716hBBIYiLMx1pRWFXgJLQ%2FEnc%2Bm&X-Amz-Signature=d1a2529c3b933b1d59b91c6fbe0809eea9257155e44486b1d2c723dfbe47c893&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XN2RVRNB%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDGV0XX5GIV3OqRVS1DSzFOI38Tyg8Jv7U%2BUDj555xptQIgEVa6Xsa5up5vMZrrzCmPS%2FlEwPhpHRQQl5Rh8FLD4s0q%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDAJns20WkgfqyuvPrCrcAw%2Fn4sfW4y0eT8IBCwA5nsDOe%2BDHbB4yRpTurJb6HilDRM1YrDC06RCAN4%2B4cOPTqw1lLAzNnEA1cQLcX3YDFP3XFEhbrqvo0DLAgkiVtmVY3DqF39L5pgZrIuI0seFHrL4SrJ460DJdSriiRrBUmF92fpkAKoSXfBu1CDwH9TAb1nKiE0fnFXPMYiR23irv%2FbGg6n54vzamtHVAghUJBOSyAKjMq7tJAZk9oGR5QcxMNPjPLPNMH6%2BmSzX6tbDXghtMtngz3Ny27QiS3%2BROZAkCbsMMoT6rg%2FGYaxOIdjE%2F7eNyGEFP0liIkmGNriF0cWHn14O23jBd2F36LTm5sNstZPQiFnm7eSMr8igoBoClPCaBtAKCP%2F0Mmurum85IMb2q0Ri1VcswCzaRR%2F4nlACr1hCoa3RLNUzS6h7JBPZViHDd1unFiU%2B1YcWHgzed4pWuLR734S470qBFTqXlTlmemMtL3qrxBckEwQQEV%2BWws12EFiE%2BKZIoQ4QpC6CXSvqzRwC8WpIbQ5y2BlJ8JFbBI8jMkKxpkD2Pn30scPBUddzDf99ioWv0rn3ZVOfX3dx12qU%2FJ7wT8NB0st188jjxyHUffoFUnfzRg10lA94Ko09oehNRoxebVgO2MIWphM4GOqUBfyIECDnUWJjz9CLgN1d9AcJUEukXhHezZgrp3kb6JM%2FZzcmmx54dcgEQnn01dmfW1xLbPkYOctBkR6RZEpup38cF96wqtv%2FTm5OZkyq9qxd6bLXpaDZFMtugFbC2JtY6AIyUUxhbVn39bxh0UX24FqenzNb90PBO1Be7eSpekdppEy7OdAYk3gPnMLW6v%2BJTP12cm7mFC%2FbbxAb3GkZoCjaDrzln&X-Amz-Signature=0960bb559720ca0c8ca86737e46eb957219304fde2814d4c3d76c9c908dc9e06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XN2RVRNB%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDGV0XX5GIV3OqRVS1DSzFOI38Tyg8Jv7U%2BUDj555xptQIgEVa6Xsa5up5vMZrrzCmPS%2FlEwPhpHRQQl5Rh8FLD4s0q%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDAJns20WkgfqyuvPrCrcAw%2Fn4sfW4y0eT8IBCwA5nsDOe%2BDHbB4yRpTurJb6HilDRM1YrDC06RCAN4%2B4cOPTqw1lLAzNnEA1cQLcX3YDFP3XFEhbrqvo0DLAgkiVtmVY3DqF39L5pgZrIuI0seFHrL4SrJ460DJdSriiRrBUmF92fpkAKoSXfBu1CDwH9TAb1nKiE0fnFXPMYiR23irv%2FbGg6n54vzamtHVAghUJBOSyAKjMq7tJAZk9oGR5QcxMNPjPLPNMH6%2BmSzX6tbDXghtMtngz3Ny27QiS3%2BROZAkCbsMMoT6rg%2FGYaxOIdjE%2F7eNyGEFP0liIkmGNriF0cWHn14O23jBd2F36LTm5sNstZPQiFnm7eSMr8igoBoClPCaBtAKCP%2F0Mmurum85IMb2q0Ri1VcswCzaRR%2F4nlACr1hCoa3RLNUzS6h7JBPZViHDd1unFiU%2B1YcWHgzed4pWuLR734S470qBFTqXlTlmemMtL3qrxBckEwQQEV%2BWws12EFiE%2BKZIoQ4QpC6CXSvqzRwC8WpIbQ5y2BlJ8JFbBI8jMkKxpkD2Pn30scPBUddzDf99ioWv0rn3ZVOfX3dx12qU%2FJ7wT8NB0st188jjxyHUffoFUnfzRg10lA94Ko09oehNRoxebVgO2MIWphM4GOqUBfyIECDnUWJjz9CLgN1d9AcJUEukXhHezZgrp3kb6JM%2FZzcmmx54dcgEQnn01dmfW1xLbPkYOctBkR6RZEpup38cF96wqtv%2FTm5OZkyq9qxd6bLXpaDZFMtugFbC2JtY6AIyUUxhbVn39bxh0UX24FqenzNb90PBO1Be7eSpekdppEy7OdAYk3gPnMLW6v%2BJTP12cm7mFC%2FbbxAb3GkZoCjaDrzln&X-Amz-Signature=6bd2e5c735f2f6182a41425928255f2cedb2bad4aaabac862a826dde637cc066&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JMXHFEJ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRwQQWgxvajWaXRKT4ZTtTzTIWWkH%2FtAvueckD5LfdPgIhAPIoYXdaIgkmFh5dJvgF3t3E7AQBTTf%2BWapirfaiNgopKv8DCHsQABoMNjM3NDIzMTgzODA1IgxuJv684UZ0Vo6EqXoq3AM%2F%2B2Rl3%2FzGpJhPyl8HGA3t9oQnmwKYUpWu%2FQROtixgHwietMRXBolou85gsBoCkJRnUlnH5PdiCj2tXJNqZoXBq7WFJ%2BqGallUHugxYrlUjWreWhh4w%2FNYo6j%2Fs9x23cZRbFPfh8B1hO4yHh19nZJoEDdgpZjZAFXAnQ4ANfLxwlwp28AHYakXQIY2%2Fl4WCog3y%2FvWWNd6RgzaowfwIoO3o4ro1JJutuQKO6%2Bn46EB6uv%2BwSkJ4n6nuyF54PTM2sTCq0H3zEoh3igVcnZA6RoNisdHbEhSNZTk9YNuKq1lyUaeEYyiDo16XbRPh2YS1VqKhel1TCR3qQPn0Qy17F5hsWhIZSO9%2BMj8QXut1%2F%2Fj9HhSrdiW5usPASbY95rgKFx57%2FmBXGoU0F%2Fo5W4yZe6Z1pRVDmfSqvjAnptmO7TISeUXOnjYTWDla5pvG9PbrSKBJr4zT1HrH%2Fp33FbOLUgF1bqoA%2BMHhBFDKR7WFhTYAK8G4yh3I%2BD12FzfQ7gWP8HOw5ZpydIbPuWNOMcK0KJyQx4g6en100SfV3Lp%2FNYmUJEdfY%2BmpWeT1aUbdlbY6ei3ciu0zulXTKZO8A4y5FKi22vd8888Ydv53aQm8saMbJKpD6tRluVlIzbpIjD3qYTOBjqkATewR2peLSYhihQEG3qgadV9H2KIFcWoOniNF9t8tcGL36vI%2BDLsnhat9D1QpSprNdA%2Fu0R9GzFxJtiDBbKMsns5BodvUptZ9V%2BpifDMkjl73hZt1vqehwUdWJc2bLN0trhEP5%2FjxWqvPYPeTqGJlaa%2F20oHaewP39n7E2XXYkLWS%2BEXa%2FT%2BRnUIGUMlKH%2FKlr6XHzdBj%2Fz8Htun69oCIP5ZsKZg&X-Amz-Signature=cf9c653c5dc1b6c280d6761ddc588268d0745e9615cd72c772143f734ebbd79c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LAHEDM2%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCxKZZEb6rkUG2EWOFPAB63MKhlMFXmH6ZbaFn5b2ECjQIhAOV8WXPFVbeCRsRyTrRJgnSsj5T0cZbdmzTasvCr5H3jKv8DCHsQABoMNjM3NDIzMTgzODA1Igz3MX0bFvpIE%2BFb3rAq3AO1Y%2FX8QLJoEl4f4zOj5DfVwzbQhpAoTM6U4hiDHPPoNxywy2zolqKO9IohvOtXKOc%2Fm8XBZpuCQssGf8FCz6PDZPZEomCbrcZ8IiKgmxXOd%2FtklCZq077OgoF1qfi8hHrzbXNZFwuKwKk%2BT%2BL2A7LrINKd0Ly43kQ0qfbDjlqJlQYAyYBtLFVHFWgEppVK8%2FbBUgSnXLBFj%2FMkg50Lvw0rM%2FcITvCIAq3GbcYYqbbqv%2BBw6K5SevtWWhCBJfgZfVr6ANbi6Zxj%2FwpmJ%2FuMFDhgABW%2Fl2caOUKqtZGVFwW9q0T3dS%2FadS9TV%2B%2FXyf8NcnDBEN38PuR6BeHBHHCpYdTxe7aXCaTaSZfMYuYj6QqK79Xj8CPEB5u8m1dT7AqSOaqHIsL0DYPz8ngdXMnqx8nbuIbwPp531Dc8LQ%2F%2F9aBpCHevuwBFrR2rGwu63jMzD7uQNaV%2Bl33LoMr4IxVfCQM51wqjVAp4ftymrUMZfiffT%2BNW0Uotpq76D6jyl2V3lto71DWDjNhWjG43C6n0tl3yjpbjGv7LLRP5MMpSkZ6AoWiKvoxdS0fpT5k%2FjphoXWhv4kUJhXbrh0ODQ6C0tyf7RhikiDCIZYQa%2FRr5ThZPCsNumQh1UBn9jkakxDDOqITOBjqkATDHB2otKsQnoZ%2F3Tk1BpONlqEY6CgQkvb%2BHjQ6AWwnBV0qcabAOpiMCaw9oPIsSeqGZ5EnljhSXaxaY%2Bmukib%2FFg7ruWmjNS0jRBPoupwqFj5FHJPAPXuZleiqxJf0iV6CEkEZif1wHwQQ2tYiv10ZoISbvAgdEPdFtKe%2BaEyVxPLPn7TcKpcEBtYlKeGVc7SZAsrDBqdqF%2BBPxvvaiZYEeZ5L%2F&X-Amz-Signature=b5a3e2fd40425ccc0c89897966c2292572ba5e46dd036a975094a142d8406364&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666S35TS7Q%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEFEA%2BE%2B9XjJsuAzn0ZEDWyHhSvmmBUrnyrqALJfQJ1MAiByM%2B%2FDobYHGjBrZo4ni3IYgrVyoSHuP%2BHUwIaJsAmpPCr%2FAwh8EAAaDDYzNzQyMzE4MzgwNSIMtjYAkeQ0CusjWPuGKtwDRj%2BGZO8f2iL%2FEkQ33zvYHUaXsUftrrz87BF0Y4MpDKKsKfUeHSTkjtUB5cxqzrG3yliq%2BBb3Ry%2FzYtur5PREPaGVruhP3XCTYl5XThrs46MYiqRRR2zn6Wc2ammoiWRxfnAGZTp0ycVp45SejPMA5OQ37YrwtFfOsowqoFxQv%2BCAzT3lwMvcTrcq3eEysdrUBAePkSGxjrW8f%2FLYGkZo3QImIypxTS0BQXqayXuGKaJMcHYJ8ymbPnW6DpLvhBucupOH269LldNAcP6lp8oT7pZaRk%2F3rqYR3ql5%2Bsu62MQYfKyf1G4PXViNMMH4ZWQvcihB5wxgAbRf9X1UR4Tg08th6F60f3grCYEt6I%2Bxx%2BrLDjlilTHi29ccHwu8uWs4v%2BNO4jU2TBzhYA6HQo2p3oDLkWsGOdk1wujfdaHTe3stiCNZ%2FF8OdsCWHW%2Fd1ohd4iakwYWpBtn3UWDvCP%2FZAAGEvlXLbJYh7bcz6IqYnUV5LTyeo%2FnAL0BcM%2BkYIkW%2F66%2BEYgRqTKug5t0P4jhd2HsgPe306NUwcblpoLI13hfaDnxxkNDKoKjPT5agVRbBFA9P%2BhKS5lgxnP7X5ShGAeq6uvfYKESZyBtbkNtUrTJnapoV%2Fe0%2FyXtcvZIwnKqEzgY6pgHwzBJSw3gKupG2d9fIY%2FiLq1D%2BijAEVHhpeYcBdbXuCAKCOCmC4EJJWGFw%2Frne3fPn4xp7Jo6RGmDoOz7sFPeHplAaPMI7M55G2nrWhjdluLkb7jkVYt%2FtbwMAZ1I9tyjpTXCU3L1MSW0CceoeUMlptBU9iJo6luaheBsgmMMWnu0FmnsYMMR038OrA63bV3rorDFgMDY7FOwlUKcKfTOEJoszXNNX&X-Amz-Signature=6195ff4e3372237bb342b2a9faec0a9593d4aa12df6bff452874f3151d1a793a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKKYIYFC%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHvooO7vM7JKjE5nC2LPooxoqPpYa1F0%2FIdEJiBYTSheAiEAy9%2B2az3GjtAYgTuDoD8uH7kT16NdCUohKzgyCqt%2B7BEq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDFUAFBXy%2BUIN4lUI%2FircA24BFbahTM5JyYz3lNf4fcDf9al%2Bs1rEw0WEzjOoPgIMcaE%2BuTgh5Iv6B1iBA1fhemOaVv6Pz0PE6KEs%2FtH9W3%2F%2BXw6cNEjRrQlLOQb99lumhTTUKW9I6apUorDL3rESsJ6uOC45DOz2ytcCYFgZykEBYbuvY9CMq%2B0tiHRJojdqT1wXeZbAwLLjxiOz1Ncx0vyNpKn%2FioYA81Cj8Mtr%2FqMKk%2FPdRvPNaoWCrxKRS3Bi7pPhq6TCVbTcr%2Fhn4aQbb7bz%2FQlzmYFucZulcyd7boABY6yqYeVCKwT%2F0rdXUfcQIEZZqcGw0948w6o3zhMHqtKXjyALfVkxVOIMDdvIJzUNOMPszJsyX0Q%2FIRcKKwQwQ%2BLsqEMMY87Mx0cp8my4MbqxfVrQc0yr6Uc1HL0X6zwl%2FY78dWAx9sXDgUQ%2BoqFKakHwew7O2i%2F8WzyXjXw1KB2mmBdA%2B65%2BG4wJpROsr35%2F9IrbieCvlaY7n8YdluxGcgFFwP41GDPIFzPAZAMrchGfYAswyajrrkwZUQGHcDmuKFTxt8rDBxcLSW9djpParlTRLr59cmNJNZZVQ2IUjEkuWxa26XXf5QOCHfSCIUONKG4ybB%2FQWZns5gyMRwEGTjAkSZDYuefFBfa2MMqohM4GOqUBmyK1QJ6ecCTQ2l4gBEMcRTNfuGHs4iwFkdS7rMTlXbQ%2BDuVHeFscIN4TF3WR9nS8Fp7dzbfTj1X3s9fySGj1KAtPAl7zQmSdaYQ0lDY1RFmJmdr8W9iYeMGGgoA84H8SOFMkRQq4po0KUXtUZxRg7PmoYnAu1SNagEOeQPIhhrpl7o2i%2FMZdfpP2%2BNqsgaL86nga1xzR4JL7GsL27gPfsKf7DLoO&X-Amz-Signature=2f5b6364b0aaf3820cc24f62f4694cb4aeef0336ed8336fd43c59f2630d68fc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKKYIYFC%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHvooO7vM7JKjE5nC2LPooxoqPpYa1F0%2FIdEJiBYTSheAiEAy9%2B2az3GjtAYgTuDoD8uH7kT16NdCUohKzgyCqt%2B7BEq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDFUAFBXy%2BUIN4lUI%2FircA24BFbahTM5JyYz3lNf4fcDf9al%2Bs1rEw0WEzjOoPgIMcaE%2BuTgh5Iv6B1iBA1fhemOaVv6Pz0PE6KEs%2FtH9W3%2F%2BXw6cNEjRrQlLOQb99lumhTTUKW9I6apUorDL3rESsJ6uOC45DOz2ytcCYFgZykEBYbuvY9CMq%2B0tiHRJojdqT1wXeZbAwLLjxiOz1Ncx0vyNpKn%2FioYA81Cj8Mtr%2FqMKk%2FPdRvPNaoWCrxKRS3Bi7pPhq6TCVbTcr%2Fhn4aQbb7bz%2FQlzmYFucZulcyd7boABY6yqYeVCKwT%2F0rdXUfcQIEZZqcGw0948w6o3zhMHqtKXjyALfVkxVOIMDdvIJzUNOMPszJsyX0Q%2FIRcKKwQwQ%2BLsqEMMY87Mx0cp8my4MbqxfVrQc0yr6Uc1HL0X6zwl%2FY78dWAx9sXDgUQ%2BoqFKakHwew7O2i%2F8WzyXjXw1KB2mmBdA%2B65%2BG4wJpROsr35%2F9IrbieCvlaY7n8YdluxGcgFFwP41GDPIFzPAZAMrchGfYAswyajrrkwZUQGHcDmuKFTxt8rDBxcLSW9djpParlTRLr59cmNJNZZVQ2IUjEkuWxa26XXf5QOCHfSCIUONKG4ybB%2FQWZns5gyMRwEGTjAkSZDYuefFBfa2MMqohM4GOqUBmyK1QJ6ecCTQ2l4gBEMcRTNfuGHs4iwFkdS7rMTlXbQ%2BDuVHeFscIN4TF3WR9nS8Fp7dzbfTj1X3s9fySGj1KAtPAl7zQmSdaYQ0lDY1RFmJmdr8W9iYeMGGgoA84H8SOFMkRQq4po0KUXtUZxRg7PmoYnAu1SNagEOeQPIhhrpl7o2i%2FMZdfpP2%2BNqsgaL86nga1xzR4JL7GsL27gPfsKf7DLoO&X-Amz-Signature=9a0ea3e5358c83d0c952697e27533cf143d2a594f70d78a13ddfce354721990c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCDXWVYZ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T103947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVBAzMXYljagSDu207IvMrwiGJJVYSskocXyZ1%2BwEOzgIgd4dRKHIfBKcB2L6U3Zw1Sby8JQIGsXuxwJBblgjhCUoq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDOjI0rh1qQcx1o2dQCrcA6PnqQn3I7v37blp7%2BvBn%2Ba9qtHPOaWuHl21y22nSabbmco%2BZzkyWE6zUaNejfVHJnJQ5H1TgfRDvqSL7OaBxwRqWAW6i4hj7J2dVx6uwxpdN84hmzcxYg6MPUv2xjOzkEku5EVkODqC8huet3F%2FHMO6LnworQt2kho%2FJaVRHe5AYdwLOgsa%2BYo%2BgAQjQcfrRanZGwkaGeM%2FaD%2FZypiW7NT5K4%2FUzLWyMM9CRtTc1kwmRtZRFwyFxSNftVpd5PZHjuYKzgy93P%2FI07HCZ1zIyI6cdCmOvwyz88ClfyaQ5%2Flo1guv5fz6hlZj73DWoGMO%2FCs8ycOVdobfLk4fQ%2FPVZJcOF1LxJ%2FWZ4B06wnPpFhEB%2BL9uGCk0efwRcEThb0MTX1E%2Bkiiqr1qXU8G7sqqNfwX%2FczzGpH7mMNOjxwRF3srasHC5yQA9XUitcmgpQ5uK3Dt%2BD3U54l%2Fh9PZW0Igjn%2Bj%2Fb2Aejzz6SouNyyBZOJtNcN%2FaQArS63h1lKaK6L5rWOYhe10mBKbexV%2B3AKPTxSawy5RX3ClEo7ztB0sdfO57c4MIDSzX3ODqw9bMO1rbOekG3m8CUX6eShh1bs7EbIG6uryijJfxO4CK6jCQ7%2B1LLvFOQMbMOzHt7qEoMKOohM4GOqUBQ5VMhcJbCPM9oW%2FkAuZJyDsOg%2Ffso5RvV77%2BKAXd%2FeazPYU5kfID3mFdo8xLj7Ned52QkGkhvtxPE75tErAPhGBr0GOZmkMYkKrLl1okNaHA%2BrWrRQTKwN5%2Fl%2Fhw8lCI1JWuSc4PPPGUYhLSgc0zP8%2BEoSJGUP3jIIztEnMGSNWVKzzNjpxk%2B9iDc%2Bg8AGebp5mBB%2FxUY%2F3Uu98F9b%2BzxReUC25S&X-Amz-Signature=357e1cb39df0850b09b8b520475ffd570c8d878df29fb2ba05a65f26fa60f6a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUEP5ALN%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T104001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDCTGa1sB8I8SIuPq5Z%2FavxAEX1y60jkkXTkSG9EwMvmAiEA4lkiXezoEy8DO8X6JYrNQUhZrjS%2FAyE4gVWR6er03Ysq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDJiZWsi1cAjOfZXd1CrcA9z0I3t6nV3p71jTBZtgaHu%2Bjny%2BL%2BekJeZy04RCJBq2uWy1i2EZUZnpKsBwi543yoaPXbv9ZuIwSfHr3kIwI0UDBlq5FUBf5MGl5nLquq48j%2FxKW6UlpSWoUEOdUXmb6LZeLNU%2B%2FIwSG5jOtKngM7qzNEZJuLIsnujLdTWzelPQ4lOdyQeu%2Fppk70PGNz8rHNkryaRdkFN3zY9Y0qK%2B9lelzOrZQ8ACsGLSybI940uXn2fzgLoTiy0qKNlip80F98Vp%2BtTA4x56uDF2D0huq8kUU72occCt2zXHRNHapjSyhBo0G9H9cI1QllVjvfclKzRFmzi9xax2K3TofHF2%2B0IRuMoG8Q1uwKKujKQIwNHHU82MqfgAUdZEWZP9gu34P9uSVBpx8fSTv4toBSxDwIv2XMAvDqwrTfZWAfxmBFPUSSKqcZgebl5exVhleZHYxDygjasv%2FrgiwrI9254PRNOtXQwuQhoVRYWWRqZQueZ8k3UMIKrGvj3FkWoz9%2FEEcV%2BLLsUs4U4xvOmxQ%2BXPlIiQ90G6BYuCQatcw6lC4TuxPnNMgSL8Br3wIYcnlQb2KosAW8PN9d7Mzz0%2BbTuM9pFu%2FcOLHXSzTmZPMHFyGnxnSKag%2BINGNiUf2xazMKiphM4GOqUBhLKPgDlu0ZX9sBspLNAicCrVGfPHmUFDMW9ExM4qUj%2BnE7tPUijXrFoNhWvXiOF2MJIaKieAIFKkahSRC4OT0hVzHwYZKdqPh2u48IMkK9jrA8Cld%2FLv6fE5hymptpUgmW2uw4Se71EVIGXQwVz8YT7CDB9SCveST%2B3VdEErzrQdJifkyCFZThRP8y%2B%2BJAUIKHhhmQ6hihB2GEB1LHqIuJiC93iL&X-Amz-Signature=3d29144794594d28fe550163b46fbdbfd2d94cdb54180891e9770c2a23fc4b03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUEP5ALN%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T104001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDCTGa1sB8I8SIuPq5Z%2FavxAEX1y60jkkXTkSG9EwMvmAiEA4lkiXezoEy8DO8X6JYrNQUhZrjS%2FAyE4gVWR6er03Ysq%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDJiZWsi1cAjOfZXd1CrcA9z0I3t6nV3p71jTBZtgaHu%2Bjny%2BL%2BekJeZy04RCJBq2uWy1i2EZUZnpKsBwi543yoaPXbv9ZuIwSfHr3kIwI0UDBlq5FUBf5MGl5nLquq48j%2FxKW6UlpSWoUEOdUXmb6LZeLNU%2B%2FIwSG5jOtKngM7qzNEZJuLIsnujLdTWzelPQ4lOdyQeu%2Fppk70PGNz8rHNkryaRdkFN3zY9Y0qK%2B9lelzOrZQ8ACsGLSybI940uXn2fzgLoTiy0qKNlip80F98Vp%2BtTA4x56uDF2D0huq8kUU72occCt2zXHRNHapjSyhBo0G9H9cI1QllVjvfclKzRFmzi9xax2K3TofHF2%2B0IRuMoG8Q1uwKKujKQIwNHHU82MqfgAUdZEWZP9gu34P9uSVBpx8fSTv4toBSxDwIv2XMAvDqwrTfZWAfxmBFPUSSKqcZgebl5exVhleZHYxDygjasv%2FrgiwrI9254PRNOtXQwuQhoVRYWWRqZQueZ8k3UMIKrGvj3FkWoz9%2FEEcV%2BLLsUs4U4xvOmxQ%2BXPlIiQ90G6BYuCQatcw6lC4TuxPnNMgSL8Br3wIYcnlQb2KosAW8PN9d7Mzz0%2BbTuM9pFu%2FcOLHXSzTmZPMHFyGnxnSKag%2BINGNiUf2xazMKiphM4GOqUBhLKPgDlu0ZX9sBspLNAicCrVGfPHmUFDMW9ExM4qUj%2BnE7tPUijXrFoNhWvXiOF2MJIaKieAIFKkahSRC4OT0hVzHwYZKdqPh2u48IMkK9jrA8Cld%2FLv6fE5hymptpUgmW2uw4Se71EVIGXQwVz8YT7CDB9SCveST%2B3VdEErzrQdJifkyCFZThRP8y%2B%2BJAUIKHhhmQ6hihB2GEB1LHqIuJiC93iL&X-Amz-Signature=3d29144794594d28fe550163b46fbdbfd2d94cdb54180891e9770c2a23fc4b03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5R7RYHQ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T104001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID8xFl6lLwO0jVqD6U5iesuObkWSIh3IcAby6L4f1w1oAiEAuTfa%2Brfvy7wcvt77WTzHCBA83o%2BBKlo02HIo%2FyCiB50q%2FwMIexAAGgw2Mzc0MjMxODM4MDUiDIkPC5eOJP2p7AtJ3SrcAy6l80RkE7oJQQsfU8yZy84XvJ1a%2BR44S3xCVTEM1xdcrluKh9q4gKwoosZLk%2B4VCLzQ5Zog7VY31eejppz3sCgfi6cxdbhCLEzPXvG%2BcTjNHbYNsrDfQ7Tr9LlJBHVdhput9W%2B0rz9xwfjWf7fFFz550XMGvR3zAwjSnmW7%2BTbXaq43RwQbpMHEaiBehAGm5vTNSNFDnfLZrOZcOtJL3OyZXKOuFL9AVeK2%2FTcXasjJLhJmo%2BTXCdiez8jO27kd2NP9LTXPtnW%2B49ruGYsnrbggqsAPxEXf2dAxQZDrca%2BhitOuLZqEenqFOUTNXkorW6dzl6U%2BnUoMYFuwCl1i3qiJUNPQS4nAf%2FQE2ATqalEH8nw4%2FwCQdHRUHxzf4wFP0h9NKzBzpx9hs8a%2BmEpifGSdtwGzd%2BdSUWoRCkP8%2FozbWgVBs4o9o%2F%2BtuVZm5Gs7uK0wg8qRcgGOo%2BC3rioYDcHr5oQnewbEUG5PVHEuzjd%2FPeyVxAWKPQjhLmnSiMI1jyNy2EjJNP38rZUI5YyDQgK5OFQ%2FrAJ4PJHBxvi2qKrqXKFcCSSoldiH8pBjnwt8cUdqT8IdwQSev7UOobtsyjyvLopJm4CtCSMmZAiz%2BKUMlO0ApbeCEtcgQhZcMPaohM4GOqUBewNDoB8ZgnIODEAYT5DVEa2PEq5R0pPzmboUg8ONMT%2BzZgLPUahBc6RyagUNDjKFyrTyxieHLon97qCAmOaFxrd8WUH9cgUiKmUZlTYwceOEh4Azci0077t9Qvtp%2F8TDACFotYGtWFfNFoFudXVNdPzWOa4qmdNnkjquRh9garZRik2uSP3ewsQmdqh0ZtZJa6Qd33PvPVizjYJ2Ac72aLu8mox6&X-Amz-Signature=6238db68812b9f15c102b9c3d3b6c85fa6ac71f0baa799df3a009d65f51d36fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

