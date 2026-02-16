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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HFB5X7S%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIC67gHNKh5RL9L5tr4QgHfgwsKJe8sR1Z7S3b0aryD7QAiAmUS4%2BsO60YliManIirq2Ol9dY3zWNn4ltrQpuRDkuMSr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM0X1O%2BFtb7OTfb%2FvNKtwDtnegbj%2BkBkSkS4K9KXcm2XwQI3JCR09WPeqTvUTQgJnOs5Z2FKKf%2BA5BGLozw4jAYmlRn0MAebk%2Fmv7joba6wXeQeVUcIzMkyHKw6BG1Np6Wz%2FCg6IokWN11%2FJZXMKyvPgP8V0ph5HKJytaclC36sc%2BoLlqZUD2eVdlsOWwt%2FumbZNX1jSsRgJrLDFDq1UGclJZuqXDWlqg9p6p4WdkW7jLqfVGEXBXGWPlz0YBiwHFJuR%2FcI6d%2Fj%2FzgTe68z1EQoV4%2BC6tpzh%2BavFmU8Otj7sZwPPReZvbniuwXJ%2FKYkB2HiAVVeEdGEvaoKRt2dtu8Pn1drdrTMMaPL2t77eGhXKaB13KMF2UquzWVZdsmOOxR8po8oop7MwUueOtEhSw8ABrPQ1mNuZeHGLbYoTpsPuC%2FIJvXuH4Von0As65t4lIo31L31yhxi6pR%2FgqNFMH6KpRump2s31iSSX5q0aRmfTi6i3Ltvswj3y%2FZTu2HRjejwlQenTn4b%2FVT1zIpqimJLQavIYh80P84Ecuua%2FI%2B0LfxQBofjK7JvcHNr8mM2fTUZEYMYiJvxIFmUii%2BS8Ez5ZbtuMFBsTNk6Ra7TmvdNQbj102LSU48iSU4DbfDwS83SRvPFHQpnOzffqUw1u3KzAY6pgFkre7FexOuL6%2Bkc1h%2FF60lcGYFxPKFc%2Bm27Op3STZqK8ZuF6Hl%2BJRo5UrPpDmt%2FxhLk9t4Gy2ZgPNhR5mCADxJuAjyWme4wqe6vLomFIyTJsH7ktzOfJ23agdjHjhbjaIiwM6ks0sR38qifJbAPSFw5sE5pKqL%2Fksr1ROe6vP%2BWf20JMmKylV4FLZQJd8bKDhKnDknV%2BB5HFePahJx1vg8hf%2BeOgHj&X-Amz-Signature=5176308bf8586dcddabf319419617d463a03f8cf5b240b0fa23bea422260fd0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HFB5X7S%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIC67gHNKh5RL9L5tr4QgHfgwsKJe8sR1Z7S3b0aryD7QAiAmUS4%2BsO60YliManIirq2Ol9dY3zWNn4ltrQpuRDkuMSr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM0X1O%2BFtb7OTfb%2FvNKtwDtnegbj%2BkBkSkS4K9KXcm2XwQI3JCR09WPeqTvUTQgJnOs5Z2FKKf%2BA5BGLozw4jAYmlRn0MAebk%2Fmv7joba6wXeQeVUcIzMkyHKw6BG1Np6Wz%2FCg6IokWN11%2FJZXMKyvPgP8V0ph5HKJytaclC36sc%2BoLlqZUD2eVdlsOWwt%2FumbZNX1jSsRgJrLDFDq1UGclJZuqXDWlqg9p6p4WdkW7jLqfVGEXBXGWPlz0YBiwHFJuR%2FcI6d%2Fj%2FzgTe68z1EQoV4%2BC6tpzh%2BavFmU8Otj7sZwPPReZvbniuwXJ%2FKYkB2HiAVVeEdGEvaoKRt2dtu8Pn1drdrTMMaPL2t77eGhXKaB13KMF2UquzWVZdsmOOxR8po8oop7MwUueOtEhSw8ABrPQ1mNuZeHGLbYoTpsPuC%2FIJvXuH4Von0As65t4lIo31L31yhxi6pR%2FgqNFMH6KpRump2s31iSSX5q0aRmfTi6i3Ltvswj3y%2FZTu2HRjejwlQenTn4b%2FVT1zIpqimJLQavIYh80P84Ecuua%2FI%2B0LfxQBofjK7JvcHNr8mM2fTUZEYMYiJvxIFmUii%2BS8Ez5ZbtuMFBsTNk6Ra7TmvdNQbj102LSU48iSU4DbfDwS83SRvPFHQpnOzffqUw1u3KzAY6pgFkre7FexOuL6%2Bkc1h%2FF60lcGYFxPKFc%2Bm27Op3STZqK8ZuF6Hl%2BJRo5UrPpDmt%2FxhLk9t4Gy2ZgPNhR5mCADxJuAjyWme4wqe6vLomFIyTJsH7ktzOfJ23agdjHjhbjaIiwM6ks0sR38qifJbAPSFw5sE5pKqL%2Fksr1ROe6vP%2BWf20JMmKylV4FLZQJd8bKDhKnDknV%2BB5HFePahJx1vg8hf%2BeOgHj&X-Amz-Signature=5176308bf8586dcddabf319419617d463a03f8cf5b240b0fa23bea422260fd0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULTOPIY2%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQDXdQU4MawFpRFYKT8Bx%2FdgwGq7QLz4JobNwrpt6XrjsQIgbdHTtRCnxle7J2RDswIWRBeUSbEqj0Gpv6wmw1Fg35Qq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDDUqdE7g%2FpLmvlYpBSrcA3YTwskIKOHVMoeKOqH%2B59iGS5NwJO8%2By3NA3tci6e8wIFp3lMqO%2B7ZsLFickOJha71OJBvB1fFC8XdPweAI0JHh0Jhc29ksP3I%2FOcrpRxD0kybOw6EBVlDsgBUeOnDjGQAlDyUF2uA%2Fx4RywnGCMgt6b2r0qeY%2BzHrDcyFDFTGkZJo9urK3lwdgPkTawqHtr%2B%2BWYuPRFJee14eahUv5yrDBVDjlK0ZQB6rwGnhkp3GnLyUf4xAyIzYnNOzpSyVQZe4VYbf4pYwES6RvoBb%2BsnQAiIdznXPQ%2Fdt%2FQul6NjnpXMBTH67aZAASGNxjzCBaGvmSIw56bL%2F%2BKF6Ym9a2Dxiu96XO46Qzg5Na8ZVl8KxMx2%2Bt4jqfQW%2BnagvB28XqD5yt%2BNsXslOXeRBcI6BMk%2Bjy2ljkM1NNH7TA7kwmJYhBj5kKAv2gTVGhomDHnKp9E6cvOvYlCZeedJWjr3C5%2BAZBdfx8lwI1oZnjHNNKW9%2B4pU5GvhJtFlv1Il1sRqIHsbrQwVtehVEq6ThDRgkpXMT1vjxMynj6dL7SaR%2Ba2OnPywLmapGN7vbWgjBlDwDj0ptq1llciGRapLElX%2FbhGlOI2QTeNKB%2F180mnuapuj6hwzksvD2VfXu7GmKUMILuyswGOqUBuTMsSNyqEhEnZP1APtMjdJIqY3EE2ue0CTjtxV7QDlNRoXcSMT6P4SJi8jlkKecqiqhGB8xBoOUCwHYT2nVL63KfYC5qm5z1Rbfnds3x%2FFx6Ca9l9y5Ssqys7nliymEMgLXdiqJUx98H0Tz0SvFDl7ZXglMByCJ42sxZoBiLCU4N3%2FyVIdlwymMv0JePC1Deh%2Foz115obzd2WDtdlknlhcrVKGHh&X-Amz-Signature=f73416fb38e186d355ad517ec748103766b92bac81bff9fa76232d1c31961686&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665L3RE5SN%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCqXLCjVJzxy3QSwFgHRKzC%2Fi97pLMiUUdYLvSPe474FwIgL44gufNgjXU77nUiUS1B%2FGsp8EFSoLFhKNsQVkW%2F9zwq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDKtYs4J3lCeRie%2B%2FRyrcA1OUl7%2BpYpeYBaFE2QQdbo4UW1obWarKZFl85Y3Q3Aqq6hGy0IZDL6FswLrn9lyeCh957YvU7Md5MQAYtRBX9k4khF630XqbS6w8CgXwt8GugVOOpCpl3ZRk2VE8UdijDO3ve8ZBwR7ToSlJkZYK7Rw3P1tJPv1OvRVQUH8O7pT1BKHxJiR3DfsdoG4VVvYHa6CbDTTfVSl3aLfm4mNdgBwuOTKAdIys%2FhvkSjTr%2BAIixDWQM8ZkK7HsuB%2FahWqOfM%2FmJPKqgFblOgv%2FGUwKnlGF8R8gjJbjuV6NdGoxJh0n%2FuBsDNzlIEP35cplLN%2B7IQpiHChZnRCeLN%2BtbaREfdkDnC14NOseAPTA%2FWeLfYGei%2F9H8v%2FdoLR9kYmVznBbQ%2FazmrahsazmQbKLXTofsmEKyGABscCN%2FwUtxaowtl7ZC8wOCp9gzxokz%2F9xAAowtORYpO9rbJQfo9gf88q5uHDAeo72rXCRCUv%2FWYJWL1Ha4Nl9BedqfGPnRJZAya0T8QGQKNs5fs%2B5ecZbaMXDLKi2h5xrmNIjcpJlCqpKOzwhhzg%2BD1%2BLdB7MP0YD301LkSZfwY9uY9jAdaEDlfC7ZQfTXEUM%2FHiAvcm%2FgFJd2%2BxmxHkjUOJhRRO59uimMO3tyswGOqUBf74NOx6dfmjyT02COdvH%2Bs3llXvGkotoUEShW1OYTBJZ%2BygQ5zMqc9e3ZI4Qw6v5lOGDTdJLy6fW1kbXMpnipm0iPauc2hAfCNzE0aD%2FMTedN50j1YZn57CrSkAl8niJx4WUWTxgqi%2FbFp9F743tD%2Bp8jOOm9d%2FQDxLuJK4sAUvGnJ9p%2Bl0PouyMjegy7RTdTXuFvC2zPX9TQXN815Y%2BP1CAReae&X-Amz-Signature=4fe0f6599e449c305f41c8eea93bd84c607e1d1fee24dae893670a0aecc7766b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665L3RE5SN%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCqXLCjVJzxy3QSwFgHRKzC%2Fi97pLMiUUdYLvSPe474FwIgL44gufNgjXU77nUiUS1B%2FGsp8EFSoLFhKNsQVkW%2F9zwq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDKtYs4J3lCeRie%2B%2FRyrcA1OUl7%2BpYpeYBaFE2QQdbo4UW1obWarKZFl85Y3Q3Aqq6hGy0IZDL6FswLrn9lyeCh957YvU7Md5MQAYtRBX9k4khF630XqbS6w8CgXwt8GugVOOpCpl3ZRk2VE8UdijDO3ve8ZBwR7ToSlJkZYK7Rw3P1tJPv1OvRVQUH8O7pT1BKHxJiR3DfsdoG4VVvYHa6CbDTTfVSl3aLfm4mNdgBwuOTKAdIys%2FhvkSjTr%2BAIixDWQM8ZkK7HsuB%2FahWqOfM%2FmJPKqgFblOgv%2FGUwKnlGF8R8gjJbjuV6NdGoxJh0n%2FuBsDNzlIEP35cplLN%2B7IQpiHChZnRCeLN%2BtbaREfdkDnC14NOseAPTA%2FWeLfYGei%2F9H8v%2FdoLR9kYmVznBbQ%2FazmrahsazmQbKLXTofsmEKyGABscCN%2FwUtxaowtl7ZC8wOCp9gzxokz%2F9xAAowtORYpO9rbJQfo9gf88q5uHDAeo72rXCRCUv%2FWYJWL1Ha4Nl9BedqfGPnRJZAya0T8QGQKNs5fs%2B5ecZbaMXDLKi2h5xrmNIjcpJlCqpKOzwhhzg%2BD1%2BLdB7MP0YD301LkSZfwY9uY9jAdaEDlfC7ZQfTXEUM%2FHiAvcm%2FgFJd2%2BxmxHkjUOJhRRO59uimMO3tyswGOqUBf74NOx6dfmjyT02COdvH%2Bs3llXvGkotoUEShW1OYTBJZ%2BygQ5zMqc9e3ZI4Qw6v5lOGDTdJLy6fW1kbXMpnipm0iPauc2hAfCNzE0aD%2FMTedN50j1YZn57CrSkAl8niJx4WUWTxgqi%2FbFp9F743tD%2Bp8jOOm9d%2FQDxLuJK4sAUvGnJ9p%2Bl0PouyMjegy7RTdTXuFvC2zPX9TQXN815Y%2BP1CAReae&X-Amz-Signature=392feef4fe56f9dd8b058162cde46dc5ae59b75096630b4a47652d6e5342ab30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666D2JW3KU%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCID6yNJ7zR0KxA6jUFSE%2Bp5WJPKQmtAm%2BtZw6Hre1pxlTAiAd3SGFRlZrIctILTzUSxI0a0L07bNqXMNV1MxZc3rdrir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMp9%2FNaMUlWPhwbGpPKtwDHpqn1RDUz1XAaNOzF9e9Z%2FuHKq4zTTAKrqveoNpoHcwWKMz0%2FyFCEgTfDR2U5DILgVRpSErZClQFR3lnIwnrFNIyqKpl2o1wA04NHyqz5wD%2BC787bF7mlzUCAE7%2BVodBeOJITnB0IyadIDccN%2FUr6eKIu%2BU3TkaKmFBUEzue3rrl7cjSZft%2FfGIHfJsRMgB2LPPddZOvsogO9ZNAv8pWDkzF62Czm8RxQ%2BlAOYLSNjU66Hc6EcjrEVD4U8F%2B719uLeGBOMSyzYQmLaEUsE6mMfb%2FWd82AhN%2FYGdoapgiFKlzBdxmmLi1GqL0SrJS11%2FTvc8xvOuerkOOdm1WVL5ArQoqj6YWulXs41Sg%2Fy3jGK4gq%2FkNhxdZG0iTS2fSkihBZ6dkQJdwsvhrpTe2%2FWHc7JfywKgHzceooK21DiNLJcS7UN94HOmSmdlr35A6lVPDQr7yjGZCJY93h96If7AVk75Am3E4lZBUwfhdxcdsUqL%2B5gVSsCFYyW3Wgx5SCa6UtuCI%2FXy2jv4Sx5tT%2FwG8A3eVvEvuvAbCQbvuX2mwsAVMdK8d1GryV1SPVlmqyEVYIhvkTU1my4%2BDHkCllhRc4Wernrl7uX5rANuPXvvbUhD4RzDmskr8P2OpR9wwzO3KzAY6pgE57KTfd49nhltFG9WEtQPlRO%2BTOaqCDW0lUg8xp3fZlYFG7C1DbY2xfNRTUNFtJb03KnTqW63bghrotF8G4u0l4KJfdXL3%2FXEcbYcohZIBRZ3XA1hJS0C9ovPirpG1kPu4WRkNTl0T0YPUnl7Tm2zHAtQGyHt26aTSUbhIScw56iAGMS0H56cgFJ%2BlNYWTtQ8qDw2tQr5C3E8NAwXMKPjGOwzMhB18&X-Amz-Signature=c53dfc9a78140aa9e5742eb0a75716c56b3432abaa47f585016ea62c815d36c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UW3RI4ZO%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIFEhU6IAgTKAolSAndcdqN0Imf6lEm2y1veiBTEgoPBrAiEA%2BTyqvROj2I82qpLw4CUxWX21ElL10WAxzk86McN5zI4q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDE4DwH7hY%2FAXOCJC1ircA8hRB13O%2BUJohHQSeM1JzK3R7HhOC2K8t2xnO9lgeY3lUbwTY5MSSpOJ%2FX6oo8z%2F5XjR4JR%2Bj4U%2FdXHwss6wvHyElmF2mIunkYo17dLtiI7oC0zMYs7N1lwn2Jse2XDprh38OZt%2BsDMnHjznNOwbMktnqtndFkd8fm6gybGStULsnS9toWmQ5TrseLmpZIwClq1jlg2FQ8XI65mEMXAfXi9vvdabg%2BntBitrHdcyK8kMeY22%2B5YXTLK46b%2F7ag2vSaJmfNQrPNgdG43AHw%2F9qAghHdkoNdG3mYlmlF2w9UKNWKWdvp5VJcE%2FUDu0zsQmSW93vztR7Z%2Fqn9e12PNiAtJnjG4Pu2%2Ff6gKfnD55qqWUYvXFZDGqJkhisL%2FBAjuYEhZsI9CMvPLYj6mShbqK9utfnJFSXCMiwX%2BA016FZoWpu7pmlqCTG5DgyMPmEsH5zKDMqxArA9%2BpYFI6olT5yvLKbj4R%2BIS%2FdKC9S6a9xFsVdbLI3atKAfmMqmmIJUNKAViVLI41mA1BGtWfi9YigDAaEO1d382t2AKx5Lv934WBQLYWaXLZ3NnmDNzK8BN0KbFgjrnIW4xiD4EE9cROlyQkHp6%2BUvpdUBcZ7VPrgAMJTIgp8SD4hsjmvupnMOfuyswGOqUB1Le1Wja%2BRV0gHEhVrZJTPwKHG7LssrOY2tnXyUCCsg1ad09awxyUW89GVI6dhKIyUEKOAMAPXjHU6CZ7mMSKMG83uZggJUwW5M5c0vzGYcz4fRpdmqhRY0j2w2qDd%2BqaYiCvaWVahXHp0XOWfCeW5GV2fDbgWk9vJrxgXXUhh06ngJeFxP8zQchC74rulwOh9DEisJW43W0VE7nUkU%2BeRxqjrUgt&X-Amz-Signature=fc45416b843cecef3932f712d91d6824bb9509928b619378f13b1f06e73b2128&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USZBUJEL%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIB0GFQZxEK03V%2FE0JvFXociIud57DR7tX4%2FJwXo8OVZnAiBzSb70NPY4czWPe%2BxoY9GFOxcuIN%2B1zWCNfP8f5QsTzyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMFOvOIn3os3PwZdbCKtwDP6BuofwHa%2FME3wth3Z5hM1Y4kP3p9CoM1VfT7fcwSGkMHAAbJPliulbv0ImYnL0JsuhwtmebhJuf7MuHldgFwQXwjdukje6N%2FJQpC8VSq9w5x0Q5wah4hfkWuCnNy82cGvaPjC4woXEBVG0ESizXtYXxa1pPMwIvmVsTaXMd%2B7Dw8oT1DvSdvQjz6lUu13DUaR%2BFEse%2FNm7PrOAdDaBBLUd1Fz0qfH%2BfbEkc809ySenGrH4IJCo6gppxXWjwDn79tMwOm4RHt65BxbWTBwE8cBF%2BF5l2oJO0GEQzu9wQxg%2FYTKWGxfTT2lGnYJtuFSmgxHrdzMnRUwUiXbKff0uusnvK%2FbUfZGjIvb71lHO6ujUyYGmG6t%2B%2FuelwTx58S4E%2FmFBhZXrBME6LhxAc0zw5jJ8JB3VIWZ4IfzVrLuc9cqtYy%2BzpWkBGyo07aYvTdJe6UaMTym4OBRrlb0xoc25R0posK3yQglHSrkxXK0mCRKmLVcsbrPKEJLpEHdKVQSfkAYuyGAqKSq9B9%2FarGjFwnwPhME%2FyregEtwnl7v4KtDfzBNuWT1KPni67bSUejXBJb2HMvqCZ5rlcUYa%2BOovQSTtW%2BlO0W5Se4HkflKZ7mSU5l81sFstvfXgDGpswz%2B%2FKzAY6pgGE1TXVNH7%2FTVLN4U4tS%2BTNr%2FinhVjDM%2Bn1cffIrejmXz4s20G3zQbFHln1HRepGNulFpK2QR2R3%2Fcw7rovbZsxd5QrNTlr%2FgzJTSIcQNnUNfqvjoG9TjIrWx2PdfqGqxqgoUv0ubStzKXGIgAZKLcro62qr6e4OBKFcBevvLiW8W9jwgk6KH8zW8s6lTF5rkBV0pMl%2BuKkiVSDxHySc%2B4ZZixL6T42&X-Amz-Signature=30794b6729fdd6a0f011f061e5dff1a1f029857befcaa082b6a6fd4c96ed741b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJNHBUYD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDg3NuDZuFnY1EfPr3hwgGLZ6DvmIAX7zzZmjmuVjDcagIhAJlpzLnmuX20nEM6Yue4dXBZaPPkqc%2FhaWJv9kjHpGqIKv8DCC8QABoMNjM3NDIzMTgzODA1Igy3oesiRdGzTSjy%2B9Iq3AMq99GRb%2B1jaZaECFBH1%2F%2FdvPfS3ky99jFc22k9TbXFROojXq0AAhmlx%2FmvS39Ho7ZhwrU8tC%2BWA1P2l8LwxoBcC%2BUvT6VTT7LfUdjhvWGHaOrmQyY995DXmG%2B7Moe4kAZmK2Id%2BPWFHrd2nNJM9ZbgnQroPw7EbgEN7nDREC3CadDrBSvDZNgjMpDPhryvSKj9fg8qUW5i0hAycxarNQ45BkXt%2F0uF4PyJnw%2BJqdOYd07Dc6BRHPaTyufKueP5Ga1kcZETs9tEC6xxqqfpknxmd09s%2FtckaUuv15xPVMgg2rEdxnqTKlxCGVOWyWAJK3ycZnRxufcOyRhfdttybEnKPttLfCdM3eRZkSZm5bSbVa9EhOQZIx44I7GH1fnjJEjfgSa4YkB%2FknMn8Ll2kXmB7iNDT35A8SNmyfbKio4VFqrZYnGDHfoH0J83sLNJfDbaaAhVgEpEzDUNQSoC2t%2FFUuzlcz8qTH9eR%2Bw4NuCXxJusP5DPvSCbAbOEpYYXeRw%2Fq4yACeI6tvhTUGLoCUl6jmYARg5qr8bo96qsvBy6Lu%2BSG3QxEXKMn5QKqQBhB6aQBH98C6PlbivyuyEGolDogEGbVH2%2FLkPd5akentjtowOSZaYam99i1DTakTC67crMBjqkAXRNFYa38PdLk5XXQT56oXqlftM6yBugCvOFR9uDPnLN%2Bqc9fUuXbj86kR1tw4LK%2FgBvS5zde9yyRLIyYIrcb%2BpjCzQzktXksl42Ujav9Yq2GjNNXAPcS1BcEEh%2BwlwA71vfoT1OO7Eob9dUou7kP9%2Bm%2FlRSpm5qE1HobHeaVj9jAO3gsA%2BlCdLO7Q%2Ba7zhks8Hg8tBkx33kJ4NdZ%2BOW5%2F6ETEGq&X-Amz-Signature=5b2dd6dcccf995f56cb13a181fab30d5469897bb6a2972122de3c9720f841507&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJNHBUYD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDg3NuDZuFnY1EfPr3hwgGLZ6DvmIAX7zzZmjmuVjDcagIhAJlpzLnmuX20nEM6Yue4dXBZaPPkqc%2FhaWJv9kjHpGqIKv8DCC8QABoMNjM3NDIzMTgzODA1Igy3oesiRdGzTSjy%2B9Iq3AMq99GRb%2B1jaZaECFBH1%2F%2FdvPfS3ky99jFc22k9TbXFROojXq0AAhmlx%2FmvS39Ho7ZhwrU8tC%2BWA1P2l8LwxoBcC%2BUvT6VTT7LfUdjhvWGHaOrmQyY995DXmG%2B7Moe4kAZmK2Id%2BPWFHrd2nNJM9ZbgnQroPw7EbgEN7nDREC3CadDrBSvDZNgjMpDPhryvSKj9fg8qUW5i0hAycxarNQ45BkXt%2F0uF4PyJnw%2BJqdOYd07Dc6BRHPaTyufKueP5Ga1kcZETs9tEC6xxqqfpknxmd09s%2FtckaUuv15xPVMgg2rEdxnqTKlxCGVOWyWAJK3ycZnRxufcOyRhfdttybEnKPttLfCdM3eRZkSZm5bSbVa9EhOQZIx44I7GH1fnjJEjfgSa4YkB%2FknMn8Ll2kXmB7iNDT35A8SNmyfbKio4VFqrZYnGDHfoH0J83sLNJfDbaaAhVgEpEzDUNQSoC2t%2FFUuzlcz8qTH9eR%2Bw4NuCXxJusP5DPvSCbAbOEpYYXeRw%2Fq4yACeI6tvhTUGLoCUl6jmYARg5qr8bo96qsvBy6Lu%2BSG3QxEXKMn5QKqQBhB6aQBH98C6PlbivyuyEGolDogEGbVH2%2FLkPd5akentjtowOSZaYam99i1DTakTC67crMBjqkAXRNFYa38PdLk5XXQT56oXqlftM6yBugCvOFR9uDPnLN%2Bqc9fUuXbj86kR1tw4LK%2FgBvS5zde9yyRLIyYIrcb%2BpjCzQzktXksl42Ujav9Yq2GjNNXAPcS1BcEEh%2BwlwA71vfoT1OO7Eob9dUou7kP9%2Bm%2FlRSpm5qE1HobHeaVj9jAO3gsA%2BlCdLO7Q%2Ba7zhks8Hg8tBkx33kJ4NdZ%2BOW5%2F6ETEGq&X-Amz-Signature=6dddbc3beefce9edbf7ab8a9ce649bb2483fad5732d76a1014ac51b190ba67a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y24BP4VZ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIBoi1wEETn8Ru4sjx8CzGkhZWbKxOQ0QTXNJNtsXO6MTAiEA%2BRwMv1Rwp3fvIOP2ZrAN7YGJAA3q6awVCfQKBCk62pwq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDLXwY6VBnKZqEOKcCSrcAxTE6WPfEG%2Fbd7rvu5e0y088eQQaeqFvdLf1lji9hefQLvA4N2JF15jcLgjp3nQ64PNwIojdG%2B7dWEMxvSwWieKq03TdEKOGwNX0S9PJ2%2BLKCU36Gi5i0Gu9CXeZ%2FeyN7yIerlJLuUHD%2FmhcgLjtwD%2FBQM5S1mcBItLF03O2uCQoTv1E%2BsKZfrxUA2Sf%2BshsVSFiq%2FsfXhNeGc9Dao7kX3kz%2FBelIPqDFeXs9j6cJPt%2BPRCgG2E3S3Ad8zn%2Fkn%2FLr6uMkICnSSMI4ZLWokOoZq7PSHjZIUjwSsIn63aW09zgfLytuIkKGVuWfWeFk9XedAqjkb%2FJ7GCSbDGAmSqOjEbe6Ha%2FieqW5ZDLgQ84z5JaS61wjT0O0jus3yWvWHHv5TbwZS4Gwk34KBI69cqMFNk%2BSpF5YH2pMh3ckJNrUufttte0GCwOicMll60IL6w2Od9Mr%2BETF9w8Mm7afRoacE%2F0Fz5Sy8MiFWc0deEN6IZCK9v%2FB1SRsQbV%2B1diKmwsxTpzJs3maFbtBrB2fms1LIF2LKg%2FrI6SQqXC%2Bke%2BbxnJtecyGyzxURcLUzW7VJDZ2Dlm1u3I4q0oyCyfLKN6puRmbu1Kx1QqOkw%2FeyGlFfeBWo592Rsl5F9PekqVMI7uyswGOqUBxqiOY9KzJSLXNWOGiJYI8UiCDLCcmShHEgq1Z7QtdJ4PcguJ5babSRXyCWCfYEXFtF44Rd0cWSuTOCbLrvFq8pcjIJ53NJoS6eCJ4HTdFqbILf%2BsGfz2WohEFXfrzoTcAdrtWQ9d%2FGAQ5Rgy9rXTVD4Nl2eWoW3a2Lhg8RJlMCMojkw%2FNhC0gCfmkrkgfr5neAi1xx0iVcJWKz4RS4dOC%2FJydxpi&X-Amz-Signature=2f2212ac328033eef76f3de826ac26040e45c26f01bad0068f83e0c92001167c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QNW5Z4L%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQCG13SikDCyL4I27jsFZxgQNtajFUFDP8PLqUhMFKEzIAIhAOTwDIO5is%2FWNiOyO5WZbhV3IxJTczBnGR6m9pgbsj4uKv8DCC8QABoMNjM3NDIzMTgzODA1IgwEWzKAvT%2BkXrTUNp0q3ANyY4gJXFyGT31iiSSRD3NQow6EmdBiTU7cuBkOqJLGGHcD%2F1gNETYF%2F70X%2B3cn9UM6WK3EeSwQhah2Tg0IY7J7mMyKTpZXp3xWPT6g%2BzTTJt5fuupEAD8ET9T4aVegz5Sm6cA%2F7G4da0gvbZZ1IkZ7N7oVZsp9Wy4BFhvKlyAMpQqEraSBc%2Fze0Rj5suI5hsJZ6osJ3748DaOdjr8N3ah9gUgKhYqta7OHtFDGnN61ipnMyU6T6qY5REu1uDDrh61vvg1aRuHyjf8zxapexhzIZJuMWcFrlxyRs9hadnKLRzqxINUn1JjF8hg1coIREqVy%2FXCfcprz92TwzQ1erXGk1dU%2BPrAsOk3eEowUa7g5RFlACq5dUttOsWFxKGf%2FdqvmmLIYboNCpFEjs%2Bg5hv%2FNQd3yjJfJpyc%2B1t3KYUWviVQ0XDT10zH5KaQuP1fYIFCwPptGgUzzO8la%2F5x%2Bc%2FORs0IOsA8Mv0NZa9njmHmca6bUN52cT4%2F%2F7nDC9RyAP%2FYrrJaUk1l7T8V1pa3jOrf3V9RdI1stTNUWGNnGWenYFXbq6AP2ok9N%2Bpb5p5IztCFBkl6fP9lNygWOEXubWOpRmrXhwWDoReRpCunuWrlp7jDSq%2FEYpdB8NTDfTTDZ7crMBjqkAZzcfNR88658LiC9tczJp2QK9cazk%2B4MVfDhbOZWWriSAqDtDlU18kPw73JpGjSGquK6tPqDouRFlAFcxO1pVgpvK77cZsKDztfhWiXwjFKTA7wgeynP8ykRTPsVw0a4TXBCXFUW%2B2DjF9PuHib7JIEmCufh3moganC7FQD4xs8xxZfKR3Z9DxjBKeCuoWAe3Z8KM2soh2liG4Hbp8yM5MB1U6i0&X-Amz-Signature=eaefa822766cd6c745495fd4f8b2653f92f436d98b6dd07a46e1c4cc692ec670&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QNW5Z4L%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQCG13SikDCyL4I27jsFZxgQNtajFUFDP8PLqUhMFKEzIAIhAOTwDIO5is%2FWNiOyO5WZbhV3IxJTczBnGR6m9pgbsj4uKv8DCC8QABoMNjM3NDIzMTgzODA1IgwEWzKAvT%2BkXrTUNp0q3ANyY4gJXFyGT31iiSSRD3NQow6EmdBiTU7cuBkOqJLGGHcD%2F1gNETYF%2F70X%2B3cn9UM6WK3EeSwQhah2Tg0IY7J7mMyKTpZXp3xWPT6g%2BzTTJt5fuupEAD8ET9T4aVegz5Sm6cA%2F7G4da0gvbZZ1IkZ7N7oVZsp9Wy4BFhvKlyAMpQqEraSBc%2Fze0Rj5suI5hsJZ6osJ3748DaOdjr8N3ah9gUgKhYqta7OHtFDGnN61ipnMyU6T6qY5REu1uDDrh61vvg1aRuHyjf8zxapexhzIZJuMWcFrlxyRs9hadnKLRzqxINUn1JjF8hg1coIREqVy%2FXCfcprz92TwzQ1erXGk1dU%2BPrAsOk3eEowUa7g5RFlACq5dUttOsWFxKGf%2FdqvmmLIYboNCpFEjs%2Bg5hv%2FNQd3yjJfJpyc%2B1t3KYUWviVQ0XDT10zH5KaQuP1fYIFCwPptGgUzzO8la%2F5x%2Bc%2FORs0IOsA8Mv0NZa9njmHmca6bUN52cT4%2F%2F7nDC9RyAP%2FYrrJaUk1l7T8V1pa3jOrf3V9RdI1stTNUWGNnGWenYFXbq6AP2ok9N%2Bpb5p5IztCFBkl6fP9lNygWOEXubWOpRmrXhwWDoReRpCunuWrlp7jDSq%2FEYpdB8NTDfTTDZ7crMBjqkAZzcfNR88658LiC9tczJp2QK9cazk%2B4MVfDhbOZWWriSAqDtDlU18kPw73JpGjSGquK6tPqDouRFlAFcxO1pVgpvK77cZsKDztfhWiXwjFKTA7wgeynP8ykRTPsVw0a4TXBCXFUW%2B2DjF9PuHib7JIEmCufh3moganC7FQD4xs8xxZfKR3Z9DxjBKeCuoWAe3Z8KM2soh2liG4Hbp8yM5MB1U6i0&X-Amz-Signature=eaefa822766cd6c745495fd4f8b2653f92f436d98b6dd07a46e1c4cc692ec670&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EHJWO33%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T074339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIGt%2B8M1Vk%2FKsewuomh36ru5ENpvRi4AY%2BouVyDwKqD%2FEAiA2BC7oDJzSZIELJv78wMOr2Qnwd%2Br7IefmiWNihyKj8Cr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM%2Frm%2Fr7ap8VMkR4%2BEKtwDxiTSm8pUQ62%2Ff8wFXheSees4zZduq6LjkL2f6V3zCw2Wy64s2gbVapuL7Qt5MTYyP4I%2BCqDFqI1cDzHB9aVMxEm3uDV3rMnPEiMoH1VeLwEjoH7f4NgHRs%2FwxTbXorXGYGxiQwI9N%2FcsMUxZgKtOykds4MlfuYwPVbFZLsXJklvSQWg1GlYcFR%2BvICiArg4qzqUj26mJ2g%2FNT0FiWXunOkB6Ru5PIEdPUcl5M8r97Oqd2WJ5rE4ORdu2WqedOETezbBkTbBsqbauhjxjNqOlqN3UkoFn1IiJzXZEsOUtUyGDsBISYUX%2FiJEl%2FTvYyGXvtP1Yl2sy2dIdX4huxuzn6YUBKp7IrlCM%2FwfqgP0d5EysvibnvwDZclBArMttr%2FIXBgfNcpsNHiwa073jd4F4wisX6MSb2Xe4NEIkDgYzPGo8TrdRaenuQcADbnhs%2FIxL72KkPIO5RlXHPDb5Vg7shBO%2BLJhqS67ZnYQzxZk7YXcmvmvWR6Mq1pfYyYB%2FMVf%2BrdP%2BWBBp2hAo8t%2BNSCg4lQw%2FIVaZW0UhRK3dw2S6jJcrdjzPOWgyZJtfM59%2BD5nAvWImJqeG7mswsTB0o6ADBpFjzuTdQzkyoVZsdPRmrSxTGnkYxBIjKK3O2mowhu%2FKzAY6pgEp6nfgqtzrE6mWxoaMFYFN5Srjmr%2BcutSoVbSx1gQFpT2OvhnOFOPrZMmgwtJFWlm0dBeYMVMWsQXgnIrGXZVon8LX3ESh2Ok9Ir%2BNagpJdU1oRe%2Bgz2pHT%2FKy1y5IGVegee4cNEuPeRQNjb5ZWmL4v7lIUaF20pSK9T1c%2FCPafGH7WoW2N%2FBcA%2BBNURQRLnxb3xgKNXQjh6Ddfx7eU7wH4bpN0doS&X-Amz-Signature=35cf0c95ff9fba1325ee61c3ece6bc5f8ac5ffd33354cc9d4da939782d9a3436&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

