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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCDFQ4CP%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpbU9C%2Bj8ytvnCBqMMJvHQAKl3%2F48rk%2FB7TEfPNIEY1gIgS%2FJLk9m%2FBjagw1m03H3%2Bq354goNHepNa0KxPcgSeer4qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPYnktEvbWNUhAkEaSrcAxxH5plIC%2BCeAT4IN%2FBcwZRVLIx%2B6iJL4kSK%2F6qK4eyn2vnvpJEfzbGI7wVsrWisrsp9UT23ctIq7FY3D7byPfPZGD%2FVyCdwFwfaFkXEtMfFffidRmo0apbJD%2Br72IQs0YWdfLcN3uUlSF3JCVdxZ1mgtR8sOsnNanyI9aJKyNGjF7n6rHpfjzf7a5GRD3bKCPquUHqbw9jSHrdMFUABGfBylxaS12vUzwOJvmLwLH6iPUe7RtGdfEo%2BKJ0Qe9bXUm3deFKWSo0zuQvUCQLWwlG7udSkLOe%2F0wRmsDPt%2FzKBb5XPfl1L9%2FeBIB3fCfiLBlQd3GFgC9vf2QuejpyQx2NTcxGqmax3nOcxLxjCaSIVY5PTsMxtvjiNPfxZ1lbekOsJ%2FacBpGvdFPlX8ooEFJGVwlRORm4ptDmii8cvF%2F4jThWypfZHF9jCCdMN%2BjMNGVoSTi4Gy0O38DHUYUaaIdaLFY%2BicrZhg67LJjy4crUnPZWGgt5OZziitqIwZ2GmwMHk8%2Bg6V2OusLV66gMPEDNumMlGsQgY%2FrwWihdI7wTehwEd6xvBW2MU154jm71kcUCfJN%2Bxpovw7aVCeUQMAY2H6Kczhk9VKaUF6h83ptAc%2FPWNC93Ia6OaNDNWMIjFhM8GOqUBfRbMqZTgpfbmBfnMzffETPOdsLPkfkCl2Ne%2B%2BA0jMeTpde4TtUIeG74uZ7SKh9OGCFG7sk8BUTwipWzStYPU48MCkusWK%2F403pnaMwVNyRYfatxCfj%2Fax2u65epIB0HUMa%2BLSnp2MdgklY4otAv8O%2BRrJdlJ9ZnlXciloBf9uxjNwXZHQr63pTacaKeH3Vm%2F6kWKj0XwA4JyUs1TZZX9Sezqme%2Fc&X-Amz-Signature=981e6a673fa2e179d3ad72fac23c592217defb211ba2c2aefa85201f1d739fc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCDFQ4CP%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpbU9C%2Bj8ytvnCBqMMJvHQAKl3%2F48rk%2FB7TEfPNIEY1gIgS%2FJLk9m%2FBjagw1m03H3%2Bq354goNHepNa0KxPcgSeer4qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPYnktEvbWNUhAkEaSrcAxxH5plIC%2BCeAT4IN%2FBcwZRVLIx%2B6iJL4kSK%2F6qK4eyn2vnvpJEfzbGI7wVsrWisrsp9UT23ctIq7FY3D7byPfPZGD%2FVyCdwFwfaFkXEtMfFffidRmo0apbJD%2Br72IQs0YWdfLcN3uUlSF3JCVdxZ1mgtR8sOsnNanyI9aJKyNGjF7n6rHpfjzf7a5GRD3bKCPquUHqbw9jSHrdMFUABGfBylxaS12vUzwOJvmLwLH6iPUe7RtGdfEo%2BKJ0Qe9bXUm3deFKWSo0zuQvUCQLWwlG7udSkLOe%2F0wRmsDPt%2FzKBb5XPfl1L9%2FeBIB3fCfiLBlQd3GFgC9vf2QuejpyQx2NTcxGqmax3nOcxLxjCaSIVY5PTsMxtvjiNPfxZ1lbekOsJ%2FacBpGvdFPlX8ooEFJGVwlRORm4ptDmii8cvF%2F4jThWypfZHF9jCCdMN%2BjMNGVoSTi4Gy0O38DHUYUaaIdaLFY%2BicrZhg67LJjy4crUnPZWGgt5OZziitqIwZ2GmwMHk8%2Bg6V2OusLV66gMPEDNumMlGsQgY%2FrwWihdI7wTehwEd6xvBW2MU154jm71kcUCfJN%2Bxpovw7aVCeUQMAY2H6Kczhk9VKaUF6h83ptAc%2FPWNC93Ia6OaNDNWMIjFhM8GOqUBfRbMqZTgpfbmBfnMzffETPOdsLPkfkCl2Ne%2B%2BA0jMeTpde4TtUIeG74uZ7SKh9OGCFG7sk8BUTwipWzStYPU48MCkusWK%2F403pnaMwVNyRYfatxCfj%2Fax2u65epIB0HUMa%2BLSnp2MdgklY4otAv8O%2BRrJdlJ9ZnlXciloBf9uxjNwXZHQr63pTacaKeH3Vm%2F6kWKj0XwA4JyUs1TZZX9Sezqme%2Fc&X-Amz-Signature=981e6a673fa2e179d3ad72fac23c592217defb211ba2c2aefa85201f1d739fc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MKBUSEC%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHS8k%2F0dHsUBkNpAqeR36xkgu299oDNuq0btqc4SH%2BnFAiEArqfxz9s4QD%2BUffWzBcl2lcJddSkvCPo1yTN5QDRG2LcqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMZGHfAYNV3XHXp%2BtyrcA5FTBZi2jmRvkjaMnWyY0mLIdXav98wQBuV5qdF2Yv24nox12bltUcVbUF8qNXb0OqdeSCdTx0JJJN%2FJMN8E7O4GqSlvXdKsn0OydIXbNZ9oCxNVVtWK4cdxzl0pJ7RXi6RoND2Lnu62YLXo1NraismKvLFhJjSfXfLBjHm9T9ofDUyNiKgMXa4Te6KneAyHpVU9%2B%2F5LTBSXykbdkaJHB%2BUJR04MMcIXqhMxuPnPmRb7bAiL8F8coakHUSyOfVP2e8k3z79xn3LD4HBPE4O0KHj5g3cXK8cKkk0DZL4%2BWYMMN7z8BrJX%2Bi3t7wEsrAeq%2FU7ECnAh4OYdJHnMu1o%2FYE%2FIk6F63NLZ2SkcGCBKXc6dHg07238YLn35pwPkK7VZ5%2BptuD%2FijKf3dsAEeWy%2Fd2kI8AJTKhT3Hy86Q3Zt1z17QshoCUhmDzBn0cgkG3rslJCt%2Fwp02JHwUyp3nRftgpDZxyuyAGGCo%2B8qMBtfedqw%2B%2Bxs88lYUi5406z6MnwMaMdkPg0UCtRA9U%2FXaxxcVmQgqOJ2lbpEBkIKEtAzblWD7xtX%2BxRnef3IaFStv6zPl2IWZ6%2FZbGru9H3fLxK2DwH8RZUiDRNoUIjabHloA6w%2BcXoXqX8ugGNXkryCMKfHhM8GOqUB%2B2AXdf56UVf6jM%2BUDpieXxcxth46bXFwjFug%2FC5RU0wNzR4EY0Kl1VQzW5qg9mU9T29TNXByZu2yxEISRfHxSBN93t9S3ZrTvxXvxQAJvMZ4lcLBSJxaizRRd45YDZriPTrlXiF2Cub3zliIXQiCsywo5FNprXHZX7ttPDo3Kmqs0JpS%2BMQBNu6NX96zy%2BXmNcU0xLv3oFygtWMAh3VgwKMjU9zF&X-Amz-Signature=33a6d3f0ed8c28880645ad2e0e541fba86e0d10131e396f79202e73685c3a96d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYUFO547%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDJTitDHvoyWqoDkHoKj%2FznFR9eRqFotuRnV%2B5W8Y1L5AiA4dWw69lHJDjk6Z0y6nIHEOmVfFo3ruknQaSc757HafSqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIiZiHKFaNbbbW0W%2FKtwD4%2BYQwm9zvQWaHMGQdMxmBLe0dko%2BFRdotKCpzJz%2FHuAWk%2BF9IFGaay5ZoTjj4HL2Q8N9Mi3Rlr7A7vkZN4b82HNvPB%2B9pAAtpd8IYdCNMG6doER3toaIVnLuwxRqWhmQJhMzKmR23KCu%2Bz20HDoAaMbOgwvQeTyWl%2B0%2BzqCbxqTB8BUzAS%2F6gc5tUGpks5g6ja11O3cov7tSguxrg6dwLQO9BMlp%2Bc03iaKzeoNLw12HQRvbNEPvW8viPrLz%2F5zE0ck5wc3JkmNLb%2F2xjg%2FDTMD72kQTd%2BVCS3CwbJk%2F%2BxaYLW0RI86Kt6fz0MCjbyzAZfeT0lZdKr%2BYxOSl1%2FvhN%2FiJbvG1PSNXQDqfJLV%2BxxP7kgnmhsXyuhqD3OzqhDWjyP3lZ74uBaUxsE00pWPL%2B1cl8SoeyScSxQGu%2B3%2FzkbGh27ybiOvJBJTxreZsow6TQr2aeVa8Rld5S69Fi0bd9jcuSgf9qwSEyKlbdVsGMEePLe8QmIa%2B54BQcjY%2FCqA1Wa%2FwZCaHPnxRVq7bmcVHpJLqI2JAewCT6UkVHUXbgk%2FhXIQrbHr99UT1uHip3OAZdrfBGTV0pGZWVboEWrmJzblMP%2BcvefBDitACSgvk7BhgadaBAoBAE0Jec1EwzcaEzwY6pgGfMwSxI36o0Vr93tJHZGqSFSa17EdKp30fNSCOeFDpRaVa8cca2yLJ5ywauQ1k%2BGHu2AbW2zvtLVjekF7Xw7XiIydNjvDZbHyRN%2FoAd%2B2rJ8NT9xSZBzQ%2FR%2BuUx3CKWaJFekK4n7s9jU%2FnQSsjYov4PQA4EVYv13JXnqiY80JOzNkv37WWPCYxNyC7YcgtawjGMj%2BDTOFcSKT9rY59Y3Ngs6KNJc3d&X-Amz-Signature=5d86aae7e85748d0eba50e41daec5507cacd90827c1d71628b4f3fe6a8b2bcb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYUFO547%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDJTitDHvoyWqoDkHoKj%2FznFR9eRqFotuRnV%2B5W8Y1L5AiA4dWw69lHJDjk6Z0y6nIHEOmVfFo3ruknQaSc757HafSqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIiZiHKFaNbbbW0W%2FKtwD4%2BYQwm9zvQWaHMGQdMxmBLe0dko%2BFRdotKCpzJz%2FHuAWk%2BF9IFGaay5ZoTjj4HL2Q8N9Mi3Rlr7A7vkZN4b82HNvPB%2B9pAAtpd8IYdCNMG6doER3toaIVnLuwxRqWhmQJhMzKmR23KCu%2Bz20HDoAaMbOgwvQeTyWl%2B0%2BzqCbxqTB8BUzAS%2F6gc5tUGpks5g6ja11O3cov7tSguxrg6dwLQO9BMlp%2Bc03iaKzeoNLw12HQRvbNEPvW8viPrLz%2F5zE0ck5wc3JkmNLb%2F2xjg%2FDTMD72kQTd%2BVCS3CwbJk%2F%2BxaYLW0RI86Kt6fz0MCjbyzAZfeT0lZdKr%2BYxOSl1%2FvhN%2FiJbvG1PSNXQDqfJLV%2BxxP7kgnmhsXyuhqD3OzqhDWjyP3lZ74uBaUxsE00pWPL%2B1cl8SoeyScSxQGu%2B3%2FzkbGh27ybiOvJBJTxreZsow6TQr2aeVa8Rld5S69Fi0bd9jcuSgf9qwSEyKlbdVsGMEePLe8QmIa%2B54BQcjY%2FCqA1Wa%2FwZCaHPnxRVq7bmcVHpJLqI2JAewCT6UkVHUXbgk%2FhXIQrbHr99UT1uHip3OAZdrfBGTV0pGZWVboEWrmJzblMP%2BcvefBDitACSgvk7BhgadaBAoBAE0Jec1EwzcaEzwY6pgGfMwSxI36o0Vr93tJHZGqSFSa17EdKp30fNSCOeFDpRaVa8cca2yLJ5ywauQ1k%2BGHu2AbW2zvtLVjekF7Xw7XiIydNjvDZbHyRN%2FoAd%2B2rJ8NT9xSZBzQ%2FR%2BuUx3CKWaJFekK4n7s9jU%2FnQSsjYov4PQA4EVYv13JXnqiY80JOzNkv37WWPCYxNyC7YcgtawjGMj%2BDTOFcSKT9rY59Y3Ngs6KNJc3d&X-Amz-Signature=172098fa87c51c16ce4d00a22bc8ac7977011983a566e35884b6c31bf2057031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623PW7XVY%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDTWwUiWggOh3MrBMHBZw3XQ8ZOlwuXSNeDTSBjROhtqwIhAPZ%2FTUDq0G8u5vl3ae2S%2Ftb8PlOM8Iwc4KKgHjdWifjSKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzod7jzm2a1p4%2F3Zfsq3AN3UDDkiItuu4YCmO91ADePN8eahJ2JxFrXU0nBiR94Xf7crkh2Ac%2Fg%2B7lO4nPYqsZvCoIrsVviBDqHeyflAQFJZ9qrrirvLICbtoyhVIcf%2Ft2lqMVuu%2BPPix5HiANSXxzcDi5tLu69EQi1gm7R0OBqv4yiHdezkOyyJfNiSsLfQBwYfEzu9OD3FllJgndJVxcKjITyWRQ3%2F21y5qJHGMnzHyN3feoyxZQoC8I4SGg88pUeJRcEuzwE9lT7QNcT3H%2B3%2B3eT5bj1I5wKNQ4q4bY20BEWhOLxrzUjPOjq7E%2BJH%2Bh5PLbBxc7SqfW71CmBjdQZU6PgkiZT3K4IBk3bGTbOVdM5YgmIUtKwIY4ydCJVUZ7d8NaGwv7JNylXoSxNOt%2FZFrius8CaFbKzOVShThJLr34Y%2BlQa1JR%2Brk0weMDuKtNRn%2FuRb5cGcrG85lDD5cu%2FLvynAmSeI%2FSF%2BK1MB23aqOeWXmC0OwpF%2FJmXloE1PKiF3%2F2TLMJDX4VnGgxid%2FVvbetQsPp1WmIDpwk3%2FKUET8bazVN70onQFHlNUL%2F5ZT0ob83Q92tx%2FKjaFF9i0IaniEtyiEcYnmLUrekN75fKweeS6iv%2FD%2BYPWxqCaQrUcXJHwCg74TVX9TBPYTDNxITPBjqkAY7NirqWwM77%2FqnrXzKpIh5a5CtYuDrtxK%2BE8pzUqlj72MDX47a50Gb6qnvqapIZH2OP9a7Qr32w4bMEct%2FhvU%2FMZJ9YVjiVgPhrSt%2Bi7Xt%2BIhb0VkA%2BfDXFuBRUU0l8%2FneZhn1rAufKFud2ws0z1eko0tOJ047Z8GHIpqhWHqtU49LPechGFSZ69VHqk2Ks6rLfHe2yL3cBOSftk2yLI054JZ57&X-Amz-Signature=2c7d401b8f766323b4a7193526cc911e06c656f00dbaf73a30ca0f21eac23f13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRDOCPT3%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDBK1cG8FJ%2FbsZ83UVWJe4IAXCgzozIjzKKyJqaqeJVJAIhALK3Z8Ww6EWJdBsFbge34t8a%2F65oCVOcCjae%2Fc7fXOQ4KogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2FxBuxfI7jhA%2B8WXoq3AM39xqBYRr1i2txkaIAxiQtAkqr3EvWhyW8nTbOhP%2FpVTy6SV0UHTNPeDqVVYN5UW74Be096twu2R%2FsIivWnQ%2FlmuwDH9tJ56xwO2jCZLck2GoA3Osp5uWJjWNWOsSmUSk0fYnWg%2B1ck7KyJbXXTIbYHcoHs93XapmPhn99HU8rAms0ssHMfoZTNgWTfVHLEn%2BauuFpW1zVgF5d6BQwEoPYXJ93%2BwYpW6CJThqTwSNjqWUq0J1O3%2BvtZl%2Boj%2FByrQVmoMIUwHT2d4yBVI5dtNUUK9Rx9lzRovCoTdKTMLrmHBBKI6ftXJgo%2B4BSfoj%2Bb1P53FwJWO1VAz%2BoHnZ1L1ftlqECKlsez5M9X7v%2FCP2S9Ao8LiQHKbH4cjWIcpTpS0cg1CF8YR3rJpzS2DVVBlvPL512qRAGeLROu%2Fgf9G8df8fKHXea1tlc5dzbvjeYvXVtwlxb02%2BD3tMEmO5HYGhMpyRYQXL267vtIM6LVgLZv7ujS0z5M9COTGbMmJgzZRkNhbWYbmKogyb9mXbGbciIvW8jqtjeeW%2BHyGhwGtDUJ0KtpCYMgZfSXsQJJTyURZeoNwS4PRT94cRfwuIZJcCOWfIS23Y4EYcx89BSDGjiw%2BvIDA5kwHAM6lVbLjDYxoTPBjqkAcUZCgFKEvugNPLfd4zy9%2ByBzzNABWL84EbM1MjtgqgoOynkGiXTZv9ye%2Bec2A%2FEtxZb9S029%2BcnkfC%2BmdbByPGEkhKLSHD7G0zqdYPTvjxnAMGU5xUq0D7rS3UE5qMvqbKonfD2pihWftHGw9gmLC2QxnNlMpuf%2FsWm%2FQchJY3ELLXwuy70DcTLDNmWlAPabB7O91PwnLmn46Udj3R28I2YScE4&X-Amz-Signature=e1cf4c2d5be7cac4b53f8c260ca0e09dde97265809e18ec66e765f6049c61891&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656347LG7%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCsalNZHfyEwMXNvKheQWD6DRQ6X5UHhOoh3pr0CwomYQIgKIwb36VGN4AkfBfmiOW4X5fx7vujQ85XMSv%2BJ6qse1AqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH3OEqsSQEtvlC8cISrcA6WqCOHPw7OmRX6BXsXDDEeEfPmolCSYiRMDmkIilyTTvqMOcINMrph%2FSacoWAbahoRXTXzwtFQn6NQlPWeF81taJ%2FxDwrO%2BRDQ7wEGMnDs88CoXOOqXMzZpOCXo4Rd5vRKivziEX3agghZXIcJEUdnrMQy4dHsXs3OfTPJxa5VEb0b0qDFS6HPDfGJ%2BnpF5eYuh4kobE2wOyKsS%2FixD1KUQGoqPcQvv8u1a23NZ5Dimlnk5tO01kJi5Uv87m5iiOGjviHnJXQs9go1jyPZmAVq%2FujFYEPrEl5P%2FpgAM0Xldx8PZFyg6kX9KoTDEMCPBHhQaX9HTgadeEsGb56hr%2BccYkK%2FE6GKKM%2FrrNwMKAu1U1%2FoTk4j3uGDbNWOg0d%2FmQG5pVamSgrcjbiSVxOlyWDs%2BszWx1j6NakU4AsyAp3TCz2tlIVerb1OX1KTCTMDMxFp89IwdROmB0cbvrCv3tEkkLtGKplenbt%2FPDxmVann420DOxm2g2KmxrXPdfXd4lWb1RIcFwqhj0WBr1rSD49zcvb4G3kGTdmmOP4SqIAyorA0JNk7FnPopitis041r2NuNngz6BKxwHZMiOcfUBdZ9ArHICrQ6oaQSr%2FxYF0Me%2BR%2FgzgY%2FmBgLJQbnMMLFhM8GOqUBQpE9jAYWZ5c5HcFXAaoC4UWm5tBZdedPekfgcEMtNM3GzAv63vl%2Bhyl4sbwWSFnN1JOVWPrdVvQHaELogNoRgTcq%2BZfvCuH4pftduNy4rsRA5SGZvrLMK1qxceYuQIpDBfe54q0RLH1H0JKfirD4XVhewcycYktwucIJ7Necph9ljlPBA5UvW%2BE3B0fjiHLob3597gu1SwK1YXdmT3BPGZJXiB7Q&X-Amz-Signature=a565577a56c740be1730e4ba3d6216c8095ebf7bfc72bdd99487fda8f614be1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4EICI62%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDmCqzkYRNQi5sawYrKpwkuLwuEdyZEVonzhtMBTkU1UAiEAw%2FEACpifjongbET%2Fb3Nk2HeRQs%2BbisoXh9cFqsf3mUMqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDODDasBX8Dc1PWTUECrcA8cTc6y15TjzewvUqf3PbY6AKmC33zBYuLs9S77o2eva4%2B%2FU13PGC6yeUuwJmd1nJVa7CkiKqJ1Kj3GTbMJ8xGxlO3KPW4BzskNh13ar9CDl8ydmZULzWtfoXhoHHaABk1Bp9NHglejOSDGJ36%2FN8loCqS6%2Bs0KHzJDplQnKJFbn0MysTOAo%2BUtNI5DkPZ0XwLzhDxxwss51UTHID%2F3Df6d3ylyVPEjpfpsxQPiABCBZhC1ay8gZuIyAvRB4rXxBaOC0IqszIoaHsjKI02QEuZiIeOC1Ca12%2BhdAbNswE7aw%2Flp4H5%2BxbxTpuG4QiQh9oTV7JvaCjfGXSvQI%2FOjRvQfmXqkBs69aGN9H5pYbsxdERO0ZROJb2pzA3CezshWx3eboS5ozGkU9Ae7njbE4ZYj%2F80FOi94s0dspt5GDOQJmzgZH%2FDEFM9sjuQUBygLvx6v5IokASxjvcG9oWyPqZ36d9N2o%2F42CLQ9oCdlAgsj9fGKx5qhjde%2FgvbcmXoifA%2B4Hq8pFdQGJwtVFsGrl3669MwuWORhY0gdid1fUxHt7ba1nszB0gSADI5ExP5BoFtULcsUfwYmvp8Pi%2Fc%2BN2MJFTe%2BgGi5LFv14MiCdWvj73s0H93jHT%2BrA1ikLMJrFhM8GOqUBLwKjuBV2UzktV7JQcDJGx0%2Bln2t3%2BRuE7b%2Fg7rHqgt5eN2DPHrew2svQAEDKgT0IabRKFjieL%2Fq9xD57jqFBNlS1iCeBXJZzy1deUT2w4SlbKnxSkEBTqD4bfapI6u%2BvEgB9xG5daNGBdKYxY%2F51fstFJGD4vCu5jsMB2kuwu%2B%2FKuwBVoiDNyIBaQ6HfzJ4MooAmLC5v2euFOpUiMu%2FVbeUIw5Ba&X-Amz-Signature=b2e351497616e1e515dbb9668669e33c020b3f05899ca6ec8f4d5c46fd030e15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4EICI62%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDmCqzkYRNQi5sawYrKpwkuLwuEdyZEVonzhtMBTkU1UAiEAw%2FEACpifjongbET%2Fb3Nk2HeRQs%2BbisoXh9cFqsf3mUMqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDODDasBX8Dc1PWTUECrcA8cTc6y15TjzewvUqf3PbY6AKmC33zBYuLs9S77o2eva4%2B%2FU13PGC6yeUuwJmd1nJVa7CkiKqJ1Kj3GTbMJ8xGxlO3KPW4BzskNh13ar9CDl8ydmZULzWtfoXhoHHaABk1Bp9NHglejOSDGJ36%2FN8loCqS6%2Bs0KHzJDplQnKJFbn0MysTOAo%2BUtNI5DkPZ0XwLzhDxxwss51UTHID%2F3Df6d3ylyVPEjpfpsxQPiABCBZhC1ay8gZuIyAvRB4rXxBaOC0IqszIoaHsjKI02QEuZiIeOC1Ca12%2BhdAbNswE7aw%2Flp4H5%2BxbxTpuG4QiQh9oTV7JvaCjfGXSvQI%2FOjRvQfmXqkBs69aGN9H5pYbsxdERO0ZROJb2pzA3CezshWx3eboS5ozGkU9Ae7njbE4ZYj%2F80FOi94s0dspt5GDOQJmzgZH%2FDEFM9sjuQUBygLvx6v5IokASxjvcG9oWyPqZ36d9N2o%2F42CLQ9oCdlAgsj9fGKx5qhjde%2FgvbcmXoifA%2B4Hq8pFdQGJwtVFsGrl3669MwuWORhY0gdid1fUxHt7ba1nszB0gSADI5ExP5BoFtULcsUfwYmvp8Pi%2Fc%2BN2MJFTe%2BgGi5LFv14MiCdWvj73s0H93jHT%2BrA1ikLMJrFhM8GOqUBLwKjuBV2UzktV7JQcDJGx0%2Bln2t3%2BRuE7b%2Fg7rHqgt5eN2DPHrew2svQAEDKgT0IabRKFjieL%2Fq9xD57jqFBNlS1iCeBXJZzy1deUT2w4SlbKnxSkEBTqD4bfapI6u%2BvEgB9xG5daNGBdKYxY%2F51fstFJGD4vCu5jsMB2kuwu%2B%2FKuwBVoiDNyIBaQ6HfzJ4MooAmLC5v2euFOpUiMu%2FVbeUIw5Ba&X-Amz-Signature=426a6d7ec1bbc6f7d98c8474276bc376a70ef8a850e14982d475c6bb702687df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVRBXASJ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6%2FIVmMTMK4RuykWgOs7YTfXBY4C6Pvhm0a1LE7mZIWAIhAKLx3HNM4nq0L5yPuTIGSg7Dg6A2%2FG9rXqAmG4iwIm7zKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgygE8FSgOWKTgwmMNAq3AOmozrXm%2BvTyWPEBE86q324PhUfv73AhZg2C5JEKNYEFxfIRBh%2FTk6moISv1Wde9xp2PSQJMTKCGEVV1Rzs8ODefrdEDQIdJUcVJwR43gl%2FQ5NdhbVyjQMdISub0QJ%2FKXItzkppIHjaxaprfZ10eNo1bF99e4ATZ3fUw3IehOpjm%2FRTmsMPmIy%2BrP0d8fLxpMYKmF89YV11hJpT31lQ4%2F7f8cWqN256I43dieTS7aa1R81VmCtkOOvZHcgefl2Di1LQCVEKWF23ntkbJUYXLak6M5jOzvRNRQrpUydtHdKesap880Ss408i4KFByZd%2FgzFwQH0nCWEd3SVljzif1kWtd3Ceigka3nspeuPwuiNgh0Kq%2FJ9%2FYvpr9v8lukp3epM6MjwG%2B%2FL2ZproOIEkpRrPjEf5t%2BLiVpiDlsiqfKOtyMiF4Zb3TOvrTP50b6nt0Vd%2BZfjnA%2BeWPstCLDAbY5XKN8JykotQvlAAAf%2BBFqcBkHhrRdiDZ%2FvhgZCnUPbhta7IFq9M6b%2FS3zgcAgXuoU6smTbRuRrwI65ONpgaMCRE4sbZGMbR2iQxsawPnuhk3pstdQQLVBzOb%2FFA5f1xP4J2crc%2F2zNBeOVyhA4U8AFPod2ivMnk73AA4YRSsDC8xITPBjqkATsZuC7Am2%2FOCcQMKSkwA%2FHkbm3kenhs7kFS%2FGlXNDSubb8xqI8%2FQtjvW%2Fj6roGQQCc1ZxCfOFMeM4QzWkNfKEzQEAiItULJSGo%2FXzsSrF8kmAMB4b%2FvJsB1PsUst0AzabfWU1Y8iakjN9e2uz8Xd%2BZlVdpqrDhZ%2FbX5zHmwxih4Zvbm%2F16i3ZE6Mzty7%2BMLLRzqNqPlEkotqAZLhLpu%2BA8BmZ4z&X-Amz-Signature=d09f3ba024b3f898a6396403dc1f0f9ca22715360a6d4534b2e129f8d138118d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSMUJ6VW%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIETLXTC6AZbpeE3As2FSm331n%2FlfGm%2B7VzFIfMfYM3N0AiAuwC71L0%2FSzY0h3YtWec83SWIOQSEgz4JPmyaN0eijniqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfN6rs34cUNV5opQvKtwD0TyV59nUmcieyPppP53glKbsh4caPDuokcSEIpCJn%2Bak6CMohVx4TAD7snZB1pz7zl0lKz4ri7N9IDwM%2FNljykAEPiJO3k8qbJwU%2BR6CchjIMekLRFHlzOOcy3YWcddsxhtstuxtAVcmtDlJkeLqSKuPMBTCe%2BOu5nYvXrhdwDKW2vGSd4du4NTN3r0aMi%2F2istRdsTgtoBTpbzpyNPn7NBL0%2FA53Ob%2F95nMEAlu%2BbrzTu3y6SVFjj1gwKjbmu%2BuWQ%2FQVqYUUkzwaeEG8Fb6SYjg%2BPHE248M9n1jdI1HNVwmIz3YNVHbdVDToYMiUE%2Fb%2FUujTUaWVxERRhdzSTPrspaOD8zRD3Z9qZMZ4bmwmiCcBfG7JUUootZaH1JEzSgY%2F9%2F3VqtjeMa%2Bry5YksNPLn2lhpdMbeGJz%2FxkwvNJXmZYF%2BbzkbcUAn5GQWlNrpBM9%2BprACogBG6yU084nq6UVKwxyiZjmo81yHzxScOw4EJygl1%2Fo5hoEOUM7R2PkfBFdNNW2N94J5ddkGEfF7EV3Y87eene9N68Q9mRTy%2BCWdiVV%2FEjLogwbtb5Vf3dpKwlmcX%2BbZg0U0vQUKXwFIWI%2BOqAi8ASB9FVgXfNc51C7conOC8d6oDA2nUTfh8wmMaEzwY6pgGsxCPtrSHgSddZtxWdQt5ylM9qLU%2F8iZ%2BiBOoVK%2BMrIJjBSIb6KXwgPHh0N9%2BbF4pwzyK7LxYOSowy5SUPAtdFjwMTqy7x04j81ciRkH2NngvZGPkpAtNB%2FHoZpWwqxHiHsK5awJAICmhmP68Ougy3DmPnec7%2FAUCWIHKktIVWahjcRgiNR627%2B9MDuF3xAM2KNF%2FJzKOz5CP7n0ubQScsWaYpegbC&X-Amz-Signature=8cc7bf3e859f66927ebfcaef4b6b2219d3c6ace3cc1de6defb401a003d5e5971&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSMUJ6VW%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIETLXTC6AZbpeE3As2FSm331n%2FlfGm%2B7VzFIfMfYM3N0AiAuwC71L0%2FSzY0h3YtWec83SWIOQSEgz4JPmyaN0eijniqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfN6rs34cUNV5opQvKtwD0TyV59nUmcieyPppP53glKbsh4caPDuokcSEIpCJn%2Bak6CMohVx4TAD7snZB1pz7zl0lKz4ri7N9IDwM%2FNljykAEPiJO3k8qbJwU%2BR6CchjIMekLRFHlzOOcy3YWcddsxhtstuxtAVcmtDlJkeLqSKuPMBTCe%2BOu5nYvXrhdwDKW2vGSd4du4NTN3r0aMi%2F2istRdsTgtoBTpbzpyNPn7NBL0%2FA53Ob%2F95nMEAlu%2BbrzTu3y6SVFjj1gwKjbmu%2BuWQ%2FQVqYUUkzwaeEG8Fb6SYjg%2BPHE248M9n1jdI1HNVwmIz3YNVHbdVDToYMiUE%2Fb%2FUujTUaWVxERRhdzSTPrspaOD8zRD3Z9qZMZ4bmwmiCcBfG7JUUootZaH1JEzSgY%2F9%2F3VqtjeMa%2Bry5YksNPLn2lhpdMbeGJz%2FxkwvNJXmZYF%2BbzkbcUAn5GQWlNrpBM9%2BprACogBG6yU084nq6UVKwxyiZjmo81yHzxScOw4EJygl1%2Fo5hoEOUM7R2PkfBFdNNW2N94J5ddkGEfF7EV3Y87eene9N68Q9mRTy%2BCWdiVV%2FEjLogwbtb5Vf3dpKwlmcX%2BbZg0U0vQUKXwFIWI%2BOqAi8ASB9FVgXfNc51C7conOC8d6oDA2nUTfh8wmMaEzwY6pgGsxCPtrSHgSddZtxWdQt5ylM9qLU%2F8iZ%2BiBOoVK%2BMrIJjBSIb6KXwgPHh0N9%2BbF4pwzyK7LxYOSowy5SUPAtdFjwMTqy7x04j81ciRkH2NngvZGPkpAtNB%2FHoZpWwqxHiHsK5awJAICmhmP68Ougy3DmPnec7%2FAUCWIHKktIVWahjcRgiNR627%2B9MDuF3xAM2KNF%2FJzKOz5CP7n0ubQScsWaYpegbC&X-Amz-Signature=8cc7bf3e859f66927ebfcaef4b6b2219d3c6ace3cc1de6defb401a003d5e5971&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GW7GQ6X%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T191200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNPw%2FcDn2bcITc%2FuwZ0ClRtNLuTHVKKshGB4DIspI1oQIgQzFBZ5AO%2B16Uh%2Fo%2Fa5WUrn7dyadkUWccozsRWVRdtosqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPzVRzaUYVZ6fLGWKSrcAzEBXKE4pQjsdWH1h62eMbIVlhXPQPZ5c2sQHeUwgTP%2Bjorc967LISmTroIEybGDEFYFlZ3unt8TCsRH7bNm1pRqGkKEIEqI9CzNvX%2BtkoVIsBn6%2F00tLFOrt6JnGBMdiZZWzuJIFqLr4Y%2Fk1bZ4q%2BlHtIBchffi52vNeC%2FISqA4RUUR1I%2BX8r%2FoBheszbWTM1hox7D4GUqQEH3Tdma2h%2BPIBKEorU904L74k2ztJvyQ0cbd4ATtNdb0R%2BP3UzubX7wju9o%2FGBYBOCxXPeCAjEtLCAIEijG618r%2FL%2B8Sdsej3ghrYY9MO2qplZQ4aXIJn51F5ts5ikSjbPJ83guQ%2F0JIoDlJq2fkCOAh0U3tqLWVrTq5UcNDZrsRpjxoaooXLkPWRAs30JP1rwhdrU3hCM74s1crTNodLeorZBpKAx0k2sX0zgr4vunRuVaq0k1nbu4ADz%2F4l%2FPsQE3vkvZdn6LwFuNI2ys%2F3RuS7SaYXUBNraa6OfGFInWdczRe30YhSjyZC6T1L3TXEgN62GN67y09WAUw2gUlzra8Z4Uj7QAI79%2Bxk9cH7jrz59l5tmrY5TNhJdC8%2BBnPTz4VXOjzIhNGEXEDpKC4j45Z%2BYW6Aosjm%2BmtMFlBd%2FQ7i%2B%2FsMPHFhM8GOqUBIWEqtmm1GC3Cug%2FRkKdDhXoDy1aQljh%2FDC1PLwS1MDr%2BIKjw1%2BEHZr7IxXNEDpGo1eqhWMiWhZ6VM%2Bb08lvvK8uFSMspt%2FJ5o8BVS5NDQK7WDxngyKJzTQGsfljiCOQFpPSLmVO1UMT7L%2F8zKcMqNlpn9WAuO3CNKZ1YHd336xbmFphpQPBh40PXfspG9a10EFmqA105y7XVD%2FO8yEf%2BxznE%2BvOC&X-Amz-Signature=b0aff8fdf2ea2c2cc306e51cffc2a5591d9ee22d1e0f125c0c00e9bf9a3513de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

