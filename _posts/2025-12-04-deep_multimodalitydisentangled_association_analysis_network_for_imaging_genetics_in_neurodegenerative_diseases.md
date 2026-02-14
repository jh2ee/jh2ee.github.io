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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5JQGVFX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIAQcF8vMB3rO4Ky8fvxfimcgbNAD5bZS6PAI%2Fe%2F%2FlgKsAiAAnmenmSNbs2sTzAl9jq8Sl9t17GiaxpFsae09hSxsYSr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMuGSCnWox1aZUoNDhKtwDmgVwCaQ1eIozs3qzExNZCM12hijdoNcNF0I%2BWr6Z0ZA3YfWkaSnI6nQlgpXcNtWrHD3W9LwMfLU3iUBdFOhGCqe4X8M4HckdDE0U0jDdtm2prnDFuFp6tTVkZlWeHHlON6n6lRfphHI9sihCu9aWF6rPCWcf3P7PV3G3Iioo5CUyWAL%2BRaIT0JeXLr0hFbeWizAyXwdbOPQkeJUVvrkZClqKdGyjahNu%2FDmlCaBYFK0QxRVj0KV8NlVzR%2F6kF%2Ff2n3P13sYmmlSXLCI%2BnGL9%2BjZgyTZ1P3PqtZWBVREgzd6KdlkpNZVlMmprWTaxDIZZ0WDHdBoRE0dXiy1MpeQSrWWE663Czqm62cUwBif7ZKdYevhrGcrmvyLxIZPKCa6ViWoteGa4cj1dwsb53yHm%2Bn55A93SYOtHqU%2F5D46dOZv28DY8bf%2FjZJODnJj0kFwoTxdl96WGXFX0%2Fge0rfwkKkeVkBCgg0rxZg75qDWw6t6g2%2FsO%2Br1gzxpzAA74olkDe8qfRDPQbNQgrLx77DsxOzq1vMmPOvLlkoGofvXyGF%2BwPG%2B%2F51nQ2wS3%2Bk%2FAfLxqEr%2FJoGD5bdlfyAl0oDtCtRtoP0weLTzs0En%2FRSf%2BOdBpk%2FJ1PNrbHrb3yYQw5rvCzAY6pgGRNv9hfrSUOUseke6K%2Fyblhlp1OTSFflsZVZsEbh3kRfVqfqVUIa9Upp%2FiWb9F98T482KH66p3MfE%2FsFJD2KuCxeUE972D%2BFSf49mrGCjC7VQkw9C95P7t3HEShE2Qf5%2BGJQl10vAo%2FbLH%2FlIZuLdiaw3ohQ2XNX7hyiI9IF4ATKJdiY3SttzfPvsr3S5HW2u8BjczSzWqsWfo8zS2iTm1chlsWdyb&X-Amz-Signature=4ff307db6b05583b3916b922f9847c19f6b2ea8961e0bd21a3d8bd1fb28b71a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5JQGVFX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIAQcF8vMB3rO4Ky8fvxfimcgbNAD5bZS6PAI%2Fe%2F%2FlgKsAiAAnmenmSNbs2sTzAl9jq8Sl9t17GiaxpFsae09hSxsYSr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMuGSCnWox1aZUoNDhKtwDmgVwCaQ1eIozs3qzExNZCM12hijdoNcNF0I%2BWr6Z0ZA3YfWkaSnI6nQlgpXcNtWrHD3W9LwMfLU3iUBdFOhGCqe4X8M4HckdDE0U0jDdtm2prnDFuFp6tTVkZlWeHHlON6n6lRfphHI9sihCu9aWF6rPCWcf3P7PV3G3Iioo5CUyWAL%2BRaIT0JeXLr0hFbeWizAyXwdbOPQkeJUVvrkZClqKdGyjahNu%2FDmlCaBYFK0QxRVj0KV8NlVzR%2F6kF%2Ff2n3P13sYmmlSXLCI%2BnGL9%2BjZgyTZ1P3PqtZWBVREgzd6KdlkpNZVlMmprWTaxDIZZ0WDHdBoRE0dXiy1MpeQSrWWE663Czqm62cUwBif7ZKdYevhrGcrmvyLxIZPKCa6ViWoteGa4cj1dwsb53yHm%2Bn55A93SYOtHqU%2F5D46dOZv28DY8bf%2FjZJODnJj0kFwoTxdl96WGXFX0%2Fge0rfwkKkeVkBCgg0rxZg75qDWw6t6g2%2FsO%2Br1gzxpzAA74olkDe8qfRDPQbNQgrLx77DsxOzq1vMmPOvLlkoGofvXyGF%2BwPG%2B%2F51nQ2wS3%2Bk%2FAfLxqEr%2FJoGD5bdlfyAl0oDtCtRtoP0weLTzs0En%2FRSf%2BOdBpk%2FJ1PNrbHrb3yYQw5rvCzAY6pgGRNv9hfrSUOUseke6K%2Fyblhlp1OTSFflsZVZsEbh3kRfVqfqVUIa9Upp%2FiWb9F98T482KH66p3MfE%2FsFJD2KuCxeUE972D%2BFSf49mrGCjC7VQkw9C95P7t3HEShE2Qf5%2BGJQl10vAo%2FbLH%2FlIZuLdiaw3ohQ2XNX7hyiI9IF4ATKJdiY3SttzfPvsr3S5HW2u8BjczSzWqsWfo8zS2iTm1chlsWdyb&X-Amz-Signature=4ff307db6b05583b3916b922f9847c19f6b2ea8961e0bd21a3d8bd1fb28b71a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVK2JNRH%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIEeVUSkoH5K5CkzD5TgEJ42Sr7oMloGRqyNfVu%2B7TWxoAiEAqf8lNkPx6hpu86ripayvlcPSSUg31Sgb1nSsQtjzPTEq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDGeY%2BeaRsLQm5hPkUCrcA%2FkjeKPeyxI9tYOzb9XZvVnQWR5cW4p72xv6%2BP%2BYHj5ULt6WDgsD%2Bn6k%2BD0WUe5xn4qkKLsKrMP8d9zMdCdb0WDM95Y%2BhX2Dr7qX%2FiHERVt7r5WrFMCRrdvmNvz8v%2B5CmWYwwIVqhsmSfN1dumI%2F%2F9FLQwPpWY%2BHYjrKaIBmhlaex8T5TOU6h68AdF%2FxvfrAWvFW4tUMSM6Q1X9XSUd%2FU3e3k%2FObHPTpxMY2j63XsV2aEOsZsUoj01qwF39X1p19kS90y0%2BJxXGBkoNFoEpUcW9cH4hpxkvcLAIo4mQX%2BhEySqqhEccAoIM3X0JD8B2YL5EjtGeEOMy08hyIwja8%2FdalXorb0JpAgswxYRJNHcWmNhtLUZTEc3wbeFjPI%2F%2BABJJfsPSfaGkZ%2FluUGbmL%2FJWcnqaqsAF9grpW%2BUiCN%2FlcAzJ0RXEoxjkWOX4ubaGxHWRje%2BdudCT6E%2BcDDt0QpYzH9e%2BJ2RSP2Tca5JTxy9jnH73804f0HZlfB3MCxCJadPNlOOqy8aJn6xwDcKqB1kWLNJm1FuEa5Ebhvkven%2FpZep4ggenp7FtYJRCxJZNfXBkfNEUFJl944XI0oK6rk2vjz2zQ0NtmeCuM%2BLBz83pt9qVvR37qcgIRJLmfMKW8wswGOqUBObWAKPtBqx4s5Dcnwc4SFlikgPZKVUWX0SwRNvyRqtd87bAAgXD2MslxJeGn1JLECNMzPzV91S1T%2Bcd3tmBMSgExT2rZoJGThmM2dj3798RZD419rlffGNvdJwEa5zUCkSO1n%2Fxp2WalnUcEogtXceGtRWMTjuGFfKZhyvfhsP5KS5RN6vtS%2BBPRUvjnQPY4b81cxpO8vqaiquPcY%2BshgN7GoYxt&X-Amz-Signature=f5bbcbc4fc0e3541d8367672cceeba2a9552c776d4b4b1965c2ab140824a7917&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEVMXH2M%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIQDVgDv%2FNkMUAFCBJWjJ4GIM7v4lih0dgEseoW3RJSimSQIgS61mUuOnTXAQGu0x65o3ubbOwgwGXba2aUCOlJ3riQAq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDFmJcU78TMx79EVehCrcA0Xye1JwCkW9skFRdERZQ9kCiuFUj8FZWH%2BNUbhhfI88UCbpHHrqG1O38JxgSIoF%2FoU1Ms0Re8NxgQlW0FYX1hkaIQF9mRr7xnTZPcZ5KEes6ZeKfbpnvVgOtY8KfzV1AJTs8kV5yF2BFSlJxyFAqokj3qPZT0xbmya4NUmg%2BqxVci55ZdBrx87MPsC%2FBByj0%2Bewhn18tDpgAAJB8ycC%2FV1Quz%2BLrYuDzw7OAreqTvKY4H965e%2F%2Bn%2FdKOvs1nxuvqurYnWcQnIbiNBqzpVFUcaCouMnespCLiiIwO%2FcqFd2m7Ya%2FkCunup9kPt2q5vgv4PrGRF0AQTk2%2FX7CFBC1RFDt011TzNurfc4OZQEgSDz2KpjE12dF1qWtngYnyN4IofQPqJP2BmLPcDTvbfWhMNFyBAT5qWAbAPIXN3oPSnnTCD35TPJyMDfzwm5bJwGeVU9K%2Fou2ICPTQiHLu2sAqWopLyMUaHy8AzkdiPBBLQkT0eBrIyRt49ocWeJJAgiXnEDYN6YxCCAxglIBpM%2BLRTS8NkF8gjzuMc93cAK9wN176uaUzQ6ZX3rewW6At%2FzqSSS56IczwOGrVlVFFBp7VSxu2CiXDa%2Fd4vB2NFuuxmRy%2Bh1qqyByGQJSyQ3IMJu8wswGOqUBlDsymqcQD1JUvNnvpUamD50A6G056ZcrznwE1lujnATed%2BArO0z%2BK21jhfeTuf4k6Et5kww3o16txKbGXVK8Xj5HJvzKpf151dZgYs74GKTv7CeGbQJw0pI9FmuBPY23voN6Q1a5UgK55CUjzF33ABE%2Fus5JFVE3%2BJ1xcNSLR7Se8ASUCagipN8xquNoqWYPpjNw6E%2BaouIY9V7bzCUScs%2FlGVUd&X-Amz-Signature=e05754433f30d5f5746d892241426fe2dd7c780398d129903e9add092faf3a2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEVMXH2M%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIQDVgDv%2FNkMUAFCBJWjJ4GIM7v4lih0dgEseoW3RJSimSQIgS61mUuOnTXAQGu0x65o3ubbOwgwGXba2aUCOlJ3riQAq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDFmJcU78TMx79EVehCrcA0Xye1JwCkW9skFRdERZQ9kCiuFUj8FZWH%2BNUbhhfI88UCbpHHrqG1O38JxgSIoF%2FoU1Ms0Re8NxgQlW0FYX1hkaIQF9mRr7xnTZPcZ5KEes6ZeKfbpnvVgOtY8KfzV1AJTs8kV5yF2BFSlJxyFAqokj3qPZT0xbmya4NUmg%2BqxVci55ZdBrx87MPsC%2FBByj0%2Bewhn18tDpgAAJB8ycC%2FV1Quz%2BLrYuDzw7OAreqTvKY4H965e%2F%2Bn%2FdKOvs1nxuvqurYnWcQnIbiNBqzpVFUcaCouMnespCLiiIwO%2FcqFd2m7Ya%2FkCunup9kPt2q5vgv4PrGRF0AQTk2%2FX7CFBC1RFDt011TzNurfc4OZQEgSDz2KpjE12dF1qWtngYnyN4IofQPqJP2BmLPcDTvbfWhMNFyBAT5qWAbAPIXN3oPSnnTCD35TPJyMDfzwm5bJwGeVU9K%2Fou2ICPTQiHLu2sAqWopLyMUaHy8AzkdiPBBLQkT0eBrIyRt49ocWeJJAgiXnEDYN6YxCCAxglIBpM%2BLRTS8NkF8gjzuMc93cAK9wN176uaUzQ6ZX3rewW6At%2FzqSSS56IczwOGrVlVFFBp7VSxu2CiXDa%2Fd4vB2NFuuxmRy%2Bh1qqyByGQJSyQ3IMJu8wswGOqUBlDsymqcQD1JUvNnvpUamD50A6G056ZcrznwE1lujnATed%2BArO0z%2BK21jhfeTuf4k6Et5kww3o16txKbGXVK8Xj5HJvzKpf151dZgYs74GKTv7CeGbQJw0pI9FmuBPY23voN6Q1a5UgK55CUjzF33ABE%2Fus5JFVE3%2BJ1xcNSLR7Se8ASUCagipN8xquNoqWYPpjNw6E%2BaouIY9V7bzCUScs%2FlGVUd&X-Amz-Signature=e98c7c7c5994d9789e28bd14f7ba641b975e532ec511493f1cf33537b4132dd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXTZC7CA%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIQCGaHV2n2VYA4jKudNqT2L%2BLjcnMboXpBRSdGWsiPeGLgIgPy1BxUXmpcGCZbJxTP4oxd2U3G%2BF%2BUxuoZlccw%2Bh%2Fjsq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDJpGWPUMnbbv8XWH3CrcA%2FnD%2FwtDl9NVO4eI06lhci7NWvHi8xgExfaCd9BP1ZBcVjTe%2BTAv3mM4lfDf%2FXm%2F9h1qT39UH%2F2iObPRzFZkPz%2FDV%2FvQo2aerzJBWHXmGXYxxybb0x0fgCz0%2FVzG5CtVkZc8B1bXc9M3lF9R%2FM3EwqJe5xgKw%2F64IRh2pPYF%2Fv%2F0K7boIK4k9Maz8Y93AHzPgQAZHfrvDCqLo14Um9o8HCbZz%2FL9or7ddXsUOEB%2Fa9vpyLj%2Fmf6Ye8TfJ%2Bx0nyFGyGxrc%2BcloEaLomCusOXw4noxPXRKASjCvdg18b3GMLSvVIg0cdxGT5MFwi6z2eQWhTalmX9qwUXwg5nANSRhx5S1Cd5YShTUIeuWRtodXgHtfxDMKurzNQR7nXL%2FH09QnAmI%2B33HPM%2FayKT2rFOh5fyEYpqvz5m4pg0gItPK40QKOE7hoXCjy4b1OIMs7MRVwCBp95mV71JkSj94asF7qDjwqE4riE9z9i2ps7XtBHqrbUFpeI%2FbVn%2FO7jqCdlhAmJKf5ywBLEqXDDzFTvXbWWAIiYVNZONlRNx8NlSXL3%2FcWxLVky%2FeZL%2BAi%2BgETqImyG61UjDkxh3GrO1WIdffNcXdwbaKcm9Vu7dRORBtUyz1Z6%2BjnnAgXYNvrnrVMPy8wswGOqUBMcoKLFBZmIMaj1YsjuMyzzzCfE34UpaINXwHq7mgkP%2B%2FMFfUJ2slBYgkPVoY56JNb5zwcrcDOZqge7J2l33YLB%2Fpgkg8RCkTp0ap2LmwjHxUCosBMwduyz2bUGOevO4vf5Y5zyAiYltiHdN8qZtWUN0HZ5YiA3dryoDZfVIYAuQMjbm7kXx%2F6jpux%2BoEozeQ4BIrwqcgMkxMY9N7HymiQB6hBcYz&X-Amz-Signature=ddc214eca4be050c72ccf4670cb5f9ee33801ea9ffee11cb66c6dd222a191a73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFIFDP7W%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIAl32eqrZVrIbPS31epVbX2qMDnezoE3HQehH76jdEqEAiAyz1fyOFfoPauBnlqzO7HiBFicLc2JJJipAc8yXnrnpir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMp8OP619ZH6ClaoMFKtwDZZ1g54KFSaPqac18lLcsrXDdDi%2BhlBuzkLrazAdCW8Pr%2BcLNdkvcRdXpcn1S%2FRSKJcSGnge9ExxNCqWcJLr41gZeWwxorvtqB%2Fv%2FM6%2BzTGMlYCxX8jPebU9S2kYAsvdCN%2B8Fgl8AzQEJf47ZsGm5VaPJcC6vzhPfpul4xbDCfMhrAJ2FYI7BR6nPMo2iU2QIu0xU1WMyrS996E1Qmv7W6nlFLqEMbKzd0x0ux%2BQ6FIyQqP%2BahfRVGfQeqArzbHFbUMuDu9o9OsIyRKfJ8Bjf%2BpXPQlxOk1A6FUzalWMv9Sa2lPkWcwWGTSTkGy8ONjExZseSoIwBLv7oIdgQSlOCWbhD6QGMbuBEmjwOU4xIH9cVkCxXekPkTZjPnIdIgBFRP4Oy25Re59B1T%2B%2BXnmTWz8D%2F%2FxKjiG%2FlSCpcHjMMEgCmHHcdkZRonLH9pysAD%2B%2BnP5K73JGnWvMDfrp%2FelVnXuDOWGch9LYwsWWskUi6cWvoIHR2GvOccMgdW82%2FIcaDAeeYDMyKUwr%2FHVBCqVywkVR%2BDoA36yIw6OQQEyme01bxY0REcwwUVIdRu6xdXqubR6M3f3lfX3E4jEGaZM9KdSyVgJY4eM5ZdCWyE4sXJxtcHUo5xnmBwDkOboEwkr3CzAY6pgEfG380yRRomPZjWWApizmEGiuTP%2BjP8ccjzYtzDNv5o1QrSHO1FQZYW78BGyDDWNkBLAtSBvD%2BjNOp720mUIhg2Eq293u3j4d9A8rtDqMHcPNXW4qb%2BMhktYkMHd90jo4J%2BFdyt%2BLEpTj4K%2FgnotoaZAVQVbCX%2FwAdE6tdqLXmmwaMuf7RO9eLUb%2FRoiGnqokFSQoVUR48EKasTsSkytBXl0FZo7A%2F&X-Amz-Signature=80f74acdb07155a32023af3ba579f391719bcb15f57ae6b1bad576144f3dd541&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2OH2HFR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIHeb2Jll4nrk8uJvhekadvvxzODTHJ4zLAxVYZqSbTJeAiEA3ih8Osj6lS48ljxALzBSQtgbdwFtGsvmW1aCc%2BATqBQq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDPJfzNtMccQn7sq6wSrcA%2FxjSscj0hERZvxUL1w%2FblRWUu3nXYIfvoBKZjMdoW4LcpeCh92ZFDSJgm%2FMUQSkTVHRuiPjedbz7eSkMmctow%2BQ2b6C5z31i4bBv4r0nixZ4tCpdo5nJ%2FweJ%2BqvWE%2FRmamhR%2B0LYPP4UZhh4e%2FyZlNqlJIxDIAahsgMShSSSvFGW%2BtgfVkH1WRZn93Y7hsN%2BetRD6vsdlafRd3beHM1zNzuk%2FukeyNiWmowXuTCEncITf4zNAYTsH6UaLzA6%2BZGEHlw0WAe5fCEclPcEvy8APKBmci6nvza3HsQt5AK2QP31BvMRQ9cufJGCQMSRksgaM0uQPTUWjsa%2F28cdljA3SI68IUuAxZpkb6kcC9qQYXYg8iBzKJnyORhA2I5YRASJ4BFJb7se2m3LW4jXcar60j2DANx5HTARruuxaz084c74QCZw0Is%2BPwOjiUwCzdcOPLujYG1B1B%2BrDoVxqwFAqEVgHDC2cvXNqSLIhnlwtuhC9gl87bcA46ZlZllr7qq5CQPCiOkUw28jOSq5Yei5zuxeB%2Bw1oVOkkegBAPCNmBNXny46AmdG116XmyWwffXwUdwx2viCs%2Bi%2FULboRc0sl88KMEA%2BC%2B0v38BWVChl1nULrbeBeT9dTX5DJsUMIS8wswGOqUBP0%2BgsUZ7VPL44OVNksXYcrp%2Fjl5gvs54m4HX%2Big%2FYN36HLYnj1DQrnkazycX54rk0aHi8SE2W3Wc9xfrt%2BPTsaD6GifoMTCSsIjiusrV90%2F7PmqX9jQ7LTxct%2BAIGhdK%2BuFiqNuk4MF0IF8YtcLnqRKJtlJw2zgj4rx%2BDYT0EVVdwMSBFC%2B5IxknNKzZLRA6R1XKbgfuCfYLua7c2I4kbor%2Fl2C7&X-Amz-Signature=16d7ecd43904a2918573f7ff3e6154cceeb78148d8a29128a25217b5f54c987c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3AAFRF3%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIDcYSijG%2FOXa8wB0n4JeQIPVVX0NMJ9YpOB96RX4k64BAiEAobsMd3q7bdkn8MkI98CRQFL4QDpAnewAEyl7Ry3wQb0q%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDMI1%2BdjA0JGY0UQ0ASrcAwlx6W%2FGL%2Fr1kbj5d602Q6pDBSm2blYo6HvjOCOsXUpi0OPR74gQNK1YlgrEdzOuQLutG%2F%2FlMnR5tu%2BsYgMqBpgUy1SGdK1Q6%2FE4WmFrxU4DcBgFTn8wEmFzZ9dIQ9C3JlQbXC9vR%2BCTdAv0T23FCyxpWxnatb8cC7opUGraZzsdQ7elpz0s%2Bh2SD0%2Fl9k9gbRdnWJ3W0doJroug%2Fuj3S7YtA3Vs6bwR%2BNZk4Ds4BekKJFH%2B2RT6k0v9t%2FFz87QRVaR5ax40P0EHKyeZbNhisWAWQTimIGAAJICNuxA%2Bf6py5eOE4HX1BD%2F6gBcieOSUt1ldbq9e0VEtmGRr61c%2FIHrkQPS8ekAKBw0BUq8PcL1zUaHD9IPte3YezRSK65NugvtjbpEUrx9IvmNqjV3n%2Bv8vRpQkWQsLCDbmAwYTtYV1NPWw6B0Bgh4A6yHLg9YYlzt7o0qtjelWejCwzVGbto6wLA%2FePXiHNKvkxJ42Vw7cnON2SdPWZEqgl0yFRCqR5%2FbuH%2FfwD3fSUGr%2FdsiPEanZJK0uUKgCP%2Fa%2BFfQdi169wcU1A0vUQ9NhfM%2F6jPNfXb%2Bg6l%2BG%2Bvvu%2BWEnytwJQm98RxRK1WptP%2Bn1vRKDG1pxCrK%2Fjx5Vm1N9jkuKMIO8wswGOqUByngQxlZS%2FsEcIOGShMsR7816NGAlIdVFBz5Kv6rPO7b5cSfTpedayNjFAs%2BlmVBiHU4w2BlOStlBXIS28UAki2jJnkgcvMCZ8lg6GowKuNpCDiGWhmsd6XOqOaic%2BjfWFMt5Wn2%2BscJDj6YJBjJLF72VhTFQPpnu9PBIyaNG3btZl%2B9dpMNmeY68CKFxWo5%2BQ4hmL8L1RDyFheMn8Rc9oIaeNNBk&X-Amz-Signature=db25c9d3f2eef80104368c3c7656483006ee00685b8b5bf1aa8772f89179fce6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3AAFRF3%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIDcYSijG%2FOXa8wB0n4JeQIPVVX0NMJ9YpOB96RX4k64BAiEAobsMd3q7bdkn8MkI98CRQFL4QDpAnewAEyl7Ry3wQb0q%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDMI1%2BdjA0JGY0UQ0ASrcAwlx6W%2FGL%2Fr1kbj5d602Q6pDBSm2blYo6HvjOCOsXUpi0OPR74gQNK1YlgrEdzOuQLutG%2F%2FlMnR5tu%2BsYgMqBpgUy1SGdK1Q6%2FE4WmFrxU4DcBgFTn8wEmFzZ9dIQ9C3JlQbXC9vR%2BCTdAv0T23FCyxpWxnatb8cC7opUGraZzsdQ7elpz0s%2Bh2SD0%2Fl9k9gbRdnWJ3W0doJroug%2Fuj3S7YtA3Vs6bwR%2BNZk4Ds4BekKJFH%2B2RT6k0v9t%2FFz87QRVaR5ax40P0EHKyeZbNhisWAWQTimIGAAJICNuxA%2Bf6py5eOE4HX1BD%2F6gBcieOSUt1ldbq9e0VEtmGRr61c%2FIHrkQPS8ekAKBw0BUq8PcL1zUaHD9IPte3YezRSK65NugvtjbpEUrx9IvmNqjV3n%2Bv8vRpQkWQsLCDbmAwYTtYV1NPWw6B0Bgh4A6yHLg9YYlzt7o0qtjelWejCwzVGbto6wLA%2FePXiHNKvkxJ42Vw7cnON2SdPWZEqgl0yFRCqR5%2FbuH%2FfwD3fSUGr%2FdsiPEanZJK0uUKgCP%2Fa%2BFfQdi169wcU1A0vUQ9NhfM%2F6jPNfXb%2Bg6l%2BG%2Bvvu%2BWEnytwJQm98RxRK1WptP%2Bn1vRKDG1pxCrK%2Fjx5Vm1N9jkuKMIO8wswGOqUByngQxlZS%2FsEcIOGShMsR7816NGAlIdVFBz5Kv6rPO7b5cSfTpedayNjFAs%2BlmVBiHU4w2BlOStlBXIS28UAki2jJnkgcvMCZ8lg6GowKuNpCDiGWhmsd6XOqOaic%2BjfWFMt5Wn2%2BscJDj6YJBjJLF72VhTFQPpnu9PBIyaNG3btZl%2B9dpMNmeY68CKFxWo5%2BQ4hmL8L1RDyFheMn8Rc9oIaeNNBk&X-Amz-Signature=3c95c9b95bdca039d0c821a05df7ef087f4053a73f2c2f4083e1244d1b6fe2a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKW3VASC%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIGr3%2BlMaYG9naS6Qga5HOFgHBMkMNt6ebJN0lOsD6h5mAiEA62%2BadpqevbZEhUYfejXUVe39nDzqHeChFJW%2Bpa%2BYcyYq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDLLi8paiyjA9A%2FiqyCrcA1F0xV2rtT674cG%2BYnCh%2BJpjg57aMb10D0huTd%2Bp6qatXtW8onaZJS%2BIa%2BjfUNbS8uNObQudCUBfmAQw6oqioex1q3YT8i3TxKQ%2B9xA5SyX9f60XrVV1NA2fbMbwsWA%2B8IZxKBc3v5neYC8X8sPWhDyel%2BWgYQge4GnRAPvDjS9SuaIyELvUDmJot8fPRE0FXqEzyjOLSnpMPAyM7c3jCu%2FjTLWrB4n8jYJj2NHW9ft%2B5XwG%2FBQGDq%2Fckw6UKuI2EgeUwqWDIxm2HcUKsl7hKQbB7zRc0arP6aEXZxX67pdkqGCv5wNjN9mgApgYwPHj7OuN8kSKdCUnLppgbvFbd09KkZfvXXIS3qGq9eHV2RSEe5zRGX8B5%2FO9jCoN82dGndy8%2B9Vuos5uuvnLxzQIFkr5PpBs66NstahR5qUG9yB%2Fv5vlljpQA2%2BMpjnVTHlUgWFDiibwnbYJPOHjoDOfJDHrzKhRI%2BXFpVqnYbBv0nOo8yJdzOEhSSVl8oElJmYJ1h%2FKzuCsv%2Fr3DY7YO0rrcq0pidvhG75j7yf5D5xAKmNTGaa%2Bmh8dljM%2FW09jajZ25nYGv0Ob5iBNTOaIFV2nsycztKnIu5BfdJ%2BwauDWdnncxXEOryxPTHy6PsBEMJC8wswGOqUBEtYLIEtpKNTi0Ka4m%2FQLSygl1pwGMfciyBgXSzPt82ibqSY7YTgQRY2EtsVSZo66JhPNam%2FVODbWd7UZPph2yUIAkPd213BZx0sb4wAiwZ0k0Or8OKehFt4N24C6hYGNXoPk7am9g3jbobHxUhKQvKYghb%2FyGoVJDMG5JcWoXJ2d0szSle8sxmFfiZoi9wCEZS0Aukzg32v9Jy3IDqDluEWtBZ%2B5&X-Amz-Signature=68a097fade1f5726f67d30064eb7f76934025509d5fd278bd150ba4b9aff0fcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RIKQO25%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIEAclWpfX2t9OKF3QWNAyA2%2FBW3WX7mSfRNEwVW9F2fVAiEAzTU0WfTxmsvn9ZzJ6OUXgwKgLDlra6Lh8DaOJbFcMFEq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDFC9SxCgsy2pqXCvoyrcA9DxWXzFK%2BF0VJBxJU%2Bgy4wxkhItXUEjvMn87EGSuoYu9362f3tLXoCQguyBS0tATwQCaHLsCF75Bm3hUC3sw9M63U1NpWMfAXZsBsXT7VntswfUWxoj7aeqpdJQW0%2F%2FL2n03dw9LJyv3LcegqVnuJVBOz%2FQUktP%2F%2B%2FVANJ4ZvWGK3eIKdZ3RxvnoYmpgdhK2IRjjwYzm1qx2CEiz%2BZyLbk17DY35gj60HcGTkb9BP3Twfvp6pebLORH9Y6lYqC0lYWxr9CbkiqW15WsK1u1pxVlcTbosC%2FN%2FIp1GWwv7sBj1NFoMKA1r%2FLaqJj5mH%2FvjLv%2FKt3kcryZ1OJo3AWeBjEOU5PGBW%2FrudoIBYSwEz05d5FEXaSCMdfFNr5Nf0XhCOvVTgK6AXHUL9yBdmKsZvBzTc7MUZKzsNO2PdQ30iVbIUMqsJxtp6G%2FN%2FybSlCyMVJcPwgDi9ScX3%2FbfmvRF462pLlJqbB8kL2wSn8UFdWLA1HuPfH584fmzyPU3khNrr8nDKZGp%2BTm2xCUKp5mLEJoqiV%2FkhTLh6k%2BDbJ6VcYGdC85i3Mdn9ih1bGZZWT0QYgs3Dzbq3EDAmyn4SYkX0GK146%2Fmqv68MivAzgPye4jkh6yL4VafMarJbWnMJ%2B8wswGOqUBH3BSxoOyBNyuBUGqMAqQllwofeQDMhc7B1wwgg5eBfLtbnDmdANXTx3PygoYJrB8fe0QEnu5BHgsXSlI6uMOc7d%2FvuSKgnxz0NFYtNWn8wJrw8Phzhe2cGl6zLWI%2FjN1LOkfPOBWA%2FpyBYf061luW96MjOgzSiRxlPO72kTHcNgHlsc%2B7Qm4gED875lQGJpDK2%2Bs2NalHLB99WRFxRgClgd62dQ4&X-Amz-Signature=37d26a0eb7940e7f929ed594f1ed382243a31bc8fc895479e05bd25600e4a15a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RIKQO25%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIEAclWpfX2t9OKF3QWNAyA2%2FBW3WX7mSfRNEwVW9F2fVAiEAzTU0WfTxmsvn9ZzJ6OUXgwKgLDlra6Lh8DaOJbFcMFEq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDFC9SxCgsy2pqXCvoyrcA9DxWXzFK%2BF0VJBxJU%2Bgy4wxkhItXUEjvMn87EGSuoYu9362f3tLXoCQguyBS0tATwQCaHLsCF75Bm3hUC3sw9M63U1NpWMfAXZsBsXT7VntswfUWxoj7aeqpdJQW0%2F%2FL2n03dw9LJyv3LcegqVnuJVBOz%2FQUktP%2F%2B%2FVANJ4ZvWGK3eIKdZ3RxvnoYmpgdhK2IRjjwYzm1qx2CEiz%2BZyLbk17DY35gj60HcGTkb9BP3Twfvp6pebLORH9Y6lYqC0lYWxr9CbkiqW15WsK1u1pxVlcTbosC%2FN%2FIp1GWwv7sBj1NFoMKA1r%2FLaqJj5mH%2FvjLv%2FKt3kcryZ1OJo3AWeBjEOU5PGBW%2FrudoIBYSwEz05d5FEXaSCMdfFNr5Nf0XhCOvVTgK6AXHUL9yBdmKsZvBzTc7MUZKzsNO2PdQ30iVbIUMqsJxtp6G%2FN%2FybSlCyMVJcPwgDi9ScX3%2FbfmvRF462pLlJqbB8kL2wSn8UFdWLA1HuPfH584fmzyPU3khNrr8nDKZGp%2BTm2xCUKp5mLEJoqiV%2FkhTLh6k%2BDbJ6VcYGdC85i3Mdn9ih1bGZZWT0QYgs3Dzbq3EDAmyn4SYkX0GK146%2Fmqv68MivAzgPye4jkh6yL4VafMarJbWnMJ%2B8wswGOqUBH3BSxoOyBNyuBUGqMAqQllwofeQDMhc7B1wwgg5eBfLtbnDmdANXTx3PygoYJrB8fe0QEnu5BHgsXSlI6uMOc7d%2FvuSKgnxz0NFYtNWn8wJrw8Phzhe2cGl6zLWI%2FjN1LOkfPOBWA%2FpyBYf061luW96MjOgzSiRxlPO72kTHcNgHlsc%2B7Qm4gED875lQGJpDK2%2Bs2NalHLB99WRFxRgClgd62dQ4&X-Amz-Signature=37d26a0eb7940e7f929ed594f1ed382243a31bc8fc895479e05bd25600e4a15a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X352F6QR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T161344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIAjDNlqPb4OgssJJOzNpk3%2FnOIneiOBU7Ul%2F0vtN2cukAiEAv6T8pJYhlkGr8ArjDJfyw1%2FjOOtfqjAGrEv8IjChSTIq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDDiPrpOfxWPAO8s33CrcA55HHnGKqFhOI%2FB03w8Swfg%2BUknqW9ykSizrK3XQX6UaURJySpEz21FadJ8oW%2BeOYVffACxMKArWq5lvDwRHioPMe%2FpCUBV2mnuzTx84Jeddc3WAxW0lRvkSM7DnCEdZXbBOQavZSB7yEqTEAVEQV%2F6W6RvS7tDUMpbaassuSXaLGoGIRswi3MHtODgilPlGuNE7o%2FJi3H3hfkDNGhkbssVj1RQ%2FevE%2Bu0yZN8Qt4vSOSX7KHff76zVr8CNkMAizMasIaKO5SkI1%2FrsdkDU7Mjgm867ivikqGCHqLgYnpg6UMENGry55g05VTGBLuJvFX2EH2ieSUyT8GzZIbFzikdVC6I0BGZWuft7aWLZ0J5S4Gz0Wmi0pVfCtukQLf8omJk1ijrZ0W4Fs0y3l1r2d29YG9mb0FjxDQa1ghmNw6ap0gYEI9paYAhC%2FxmcFCmWYXSrNLcy65788LXWiLD8Pcm0p7a2NMAP5VEBGSn7VA1TBAd5M7sqewaInAOVgBghPz4xMOM%2BmIKu8mw5iUy7i6JeIJrQmspQUbxh6%2BIomQXAkXaT56o2Lsspm%2Bmw7IWez6lcxrZgAJOl8mRI9gkPk0cJ1oXdjx%2FQKSnKCKnv%2FJSIy8Cxz%2BUl%2BboKzt2coMIW8wswGOqUBBbZlryPBL89TRsE2Vpc7vehxl6MH2Fz7Nflkqxl2PBnxEvmljt%2BoifFlowayW3Bu396ndeJWXtsvq%2B2H20j9eO5tAIyBF4HVAlPcxgssGMKpaeLIagAcacBlCMSaLRHdHLMKEXXlXQvlw9SS1rDecq7AdN8msF7TK3wvYdHFARgo95Q%2B6fnCDMU2EnIEDajDYSerPYDxHD9B4gKAf1JEvG6S%2B95C&X-Amz-Signature=0e0ddad7bc0989a5855f5c2ebc621c67904dd3f28aa21f92c4b8baeb43ace1e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

