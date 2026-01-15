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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623O47QZB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCGHlZgFvkxoJ2it5O2OfMYYsnaEMsJetxsfc5D%2Bjn5ywIgQJnpS67L5M0s9dcIbJJQWX%2FJBP3SY%2BgkcH6K8h5qB7Mq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDBAgeqbPbw3Svxf7aircAwqNTlbIVh6xN%2FTgBFM96%2F%2FBTc4Ih1HNMkmx%2FOKSJHqKe3nm%2BcZGiqi0hMgTShvt821%2BoQVu%2BpANftJOkPtQIf%2BDfeka8MMs2gWn6amVobxifCFDJ0uPC07To7dNZeLSAE%2FpfJJPKqI2RF2CNlqPzzAsDMyrxoyzYX4xonlXsbTt%2BfdxDzL0hhTyOA%2FIMsaEYrQUdr0JSVTpsLUfMGNvvM3hYy4s2u7Vtsj4tVvSdAE5IcPWqjG1IWw11cinfeBHQzdMKpNCgAE49vC6y2lLcUygrxXx6sT3sWqlkh%2FW0FDe5Dtr7NEBsnftdqABtpU38i2IQfGVU56pBYAw2zEOpewMlX426qAoO8%2BcEog8pRF%2BmntwqWUMurRc2CPeuNnSA4WZVFoECEBUSuMj8MnZshmnrex8xUgbIyPcWo0SvNxzsrx%2FZfl2129rz4B6h5s36V7gOg5ZKsGVAWdoL8jPNaaq1AAJAHRsTuTIftqbNctWbKpTs2ImbhQNm%2B5otmcfO8Qmb%2F0P522dG8yr%2FT6BZDvBqubg22wlRFtW6EbVWMTSIQxzTPsGV8%2B6znyNCgI87ez5o9KLmw1rBtRldlyVfNZXdxZe1vixhXiuvZ7E4sRPEWB7GEEvE2vtQreqMILtoMsGOqUBbgKc3xvhP4kp5SB0VOCW2ftlcruzaAaXMK67bhp%2B%2Bd2iEsmjv%2BInhyWZYOowQf445mlWg1XdHlFDf4uFZxkOobHsEPoFqymusC7TvtdxdiN0TyBj7651E1NuU%2BQ9Tn2K1XllmQ1pn4GoBs1I6%2FXPBZbuaBLnBdbZUGwtOKMV89%2BSDlTbKIiSv%2Bl5nouCm9hH9IAMXiaM6ZScU7uTr5JJkM4z5SDh&X-Amz-Signature=67a07319e5135e868bbf3b5b25a43a6c245a8f965e7d071b4cede783b2ce553b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623O47QZB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCGHlZgFvkxoJ2it5O2OfMYYsnaEMsJetxsfc5D%2Bjn5ywIgQJnpS67L5M0s9dcIbJJQWX%2FJBP3SY%2BgkcH6K8h5qB7Mq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDBAgeqbPbw3Svxf7aircAwqNTlbIVh6xN%2FTgBFM96%2F%2FBTc4Ih1HNMkmx%2FOKSJHqKe3nm%2BcZGiqi0hMgTShvt821%2BoQVu%2BpANftJOkPtQIf%2BDfeka8MMs2gWn6amVobxifCFDJ0uPC07To7dNZeLSAE%2FpfJJPKqI2RF2CNlqPzzAsDMyrxoyzYX4xonlXsbTt%2BfdxDzL0hhTyOA%2FIMsaEYrQUdr0JSVTpsLUfMGNvvM3hYy4s2u7Vtsj4tVvSdAE5IcPWqjG1IWw11cinfeBHQzdMKpNCgAE49vC6y2lLcUygrxXx6sT3sWqlkh%2FW0FDe5Dtr7NEBsnftdqABtpU38i2IQfGVU56pBYAw2zEOpewMlX426qAoO8%2BcEog8pRF%2BmntwqWUMurRc2CPeuNnSA4WZVFoECEBUSuMj8MnZshmnrex8xUgbIyPcWo0SvNxzsrx%2FZfl2129rz4B6h5s36V7gOg5ZKsGVAWdoL8jPNaaq1AAJAHRsTuTIftqbNctWbKpTs2ImbhQNm%2B5otmcfO8Qmb%2F0P522dG8yr%2FT6BZDvBqubg22wlRFtW6EbVWMTSIQxzTPsGV8%2B6znyNCgI87ez5o9KLmw1rBtRldlyVfNZXdxZe1vixhXiuvZ7E4sRPEWB7GEEvE2vtQreqMILtoMsGOqUBbgKc3xvhP4kp5SB0VOCW2ftlcruzaAaXMK67bhp%2B%2Bd2iEsmjv%2BInhyWZYOowQf445mlWg1XdHlFDf4uFZxkOobHsEPoFqymusC7TvtdxdiN0TyBj7651E1NuU%2BQ9Tn2K1XllmQ1pn4GoBs1I6%2FXPBZbuaBLnBdbZUGwtOKMV89%2BSDlTbKIiSv%2Bl5nouCm9hH9IAMXiaM6ZScU7uTr5JJkM4z5SDh&X-Amz-Signature=67a07319e5135e868bbf3b5b25a43a6c245a8f965e7d071b4cede783b2ce553b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGZNFKFN%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCChkCAnBjn%2Br7OuWxksqKkOYggu0%2Bi9C6N0k6BmuPYjwIgUtnx19V%2FCOpNB%2BOlVb91enNB43BNrIdRsdzd5uhNHZMq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDB8z0opPrvivnmoZ3SrcAxQvdGWHS6eXsmv1r7XKEfYHNAzNPNCqQe3vbFO61WWV6WOP2f0kMo2stT8PcY1Ldayhc%2Bwy7%2FV4zOFIelAgRL4XdIfM0R5%2BKpTea8Dr%2F5Z8inFKyhoKFL6SHgB6T4jfKuFK004GJ%2Fi%2BQchPMXyp%2Bt8rkgtY0fr1lUvZHRhDR3n2zUwjxmde3MnJGR0njB53rlYYNCWyzbXZKMrAl52MPoBQMrTNFFq8D6NLCoZgpt0kPkHFAHqZPvJp98R5rfn39N0yP7JxqSAQ%2FwDg00CAfJ2o7z%2Bds344TEa9VSi4AevSenf4yBdeaBISA6tCJxZ3yfejirFt8wLyKlCj3NJ9blHuY%2B2nw9ehUJgCMPW2lK9yF9N4rRl2LdAPFIiRrCFm5EfaDrbOFLvimUn5ZVUPd1SbvbURkS8rTZB1nTRjjY%2BbMqw6%2FjadocJoHvceQ%2F%2Fw1gApH62JoAfN56bxFj%2Bv4otDh4favIfvVtYuVHopyA1AzVZdlkZUMB32AUtWBqFlcVpiubBRn29t%2Fcqz4SRmUSeqwoQ2clRTQcR9%2BvZxLtqARCCBVkp2vamNXr11a8tfL6CG4wWBXkYmOfis4jJ%2F%2BRbB%2FY3baoUp%2FQnF1d8%2FpyZL5XsQwW7wsnq6Q1RJMJXsoMsGOqUBJVzh85zuIRWm%2Ff%2FauIxwSH7CemzEW3AIe2%2BKBnBmYjSAA9eS%2F7%2FUAUKZfVeh89eu6gm0lL4ufYK50egpCLkhnYWwqbxreGCSxUZqKVr4iVL4qgjEFbW0QZVwp%2FpPahEZDLU%2ByCOBwi4kX95scMG0lzO4J3gOtSWXrwybDK7MmJjQT6VAkM%2Fr1%2ByOS2rHEvx%2FsibD1wT6j3ELzRW49dbzQ%2Bo15eKK&X-Amz-Signature=5fc9a8822c4c615ae229f0212014cb69b444da94f8cf79384fc9d0104756766f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ISPQ45Q%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQD0jD02LWPJ88yc41QXIhXCptf7CKjO5caSRyhNPNfE8wIhAN4i5SPriWwqX2%2B8qMM%2FtUWS%2BqZunBrvUVFpXBKHPZmQKv8DCCoQABoMNjM3NDIzMTgzODA1IgyG6KhvEDrD8zJmQxMq3APaD6sU4WmCNlmwOXwndyfzleo5Ggt4HQ0kRAVLgqSeSKZE5J4l3u6ys%2B62e4vInW8vCO7poxZUBvC9buO2mfwqU2dZ0qMK0161gY6ga7HWKhDq3qO4wfr74OfCJqiJz37cyBpO%2FhRJ01mANzmQl0gxDcYpCbiCwyywbox0VKawu5cC%2BXpU73aYVxDnvoM%2Fnhl5d2xRq3nutJ7uUym3U1qx%2FjqbXUXYuupVb9NhlZfewrxPvRBBIU%2BciMOl6v1%2FzgRdd23cGLBadZzLWzT8FDiaJ%2BqAaB78tNX6ETNXns%2BVbpirbTLvIaSxqXLM7AU0rocAFXXsYCk5Tb9Ido197ZcmAj4x7hHLt9p%2BfiHlxzhem12%2FbFlUlwItIrVasnrgziRUlLH%2FubvbqguSfzDpYu%2Fe8gutQizILhqtG8ERjjiTk1Sz4Ra2jBBxzbWgq3Li98GGUMujcouO6cecRYxamDDyiVQgyQZnxFBglAUrrLHp9osMHuD%2BSZ6pkZSN1k7WkEIW6Yzw%2BLqgyQw8qGpjQfSR%2B2PX9S86Xrl%2BYz8Zc1UEF3q0YK18QqL%2Bk5dK3Bd7MlByFSAZYw6rgyahDRzoJgjCgnWQPsc88tU23eY5Pdlp7Do49o%2FzyXN6TTJ93zCp7KDLBjqkAabOenwsKSDWeSHQQ9yxR4PyhwUJrOwC830mIzPvcVka7JYikgyFM%2BZv11bjstTjwE1UuCvu%2BPURUpk4hABVEvhUsuW4UBNxo0BbbtCfZFw8BsAxE6V6z5rUbvpKMHRb8ui77%2FtVNOCG9%2B%2BMO9nXfH%2BInUArUG7ApYGW1w88bj%2BFcdmdTsMf4uDLml%2Fvco%2FVXuVFj9%2B7Tf107qPqp0O0z2hlg0BU&X-Amz-Signature=36d14a206950ae62aa054f36a8d8e18a865e8765ab4a9cb0098d6f0fcdbcd31a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ISPQ45Q%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQD0jD02LWPJ88yc41QXIhXCptf7CKjO5caSRyhNPNfE8wIhAN4i5SPriWwqX2%2B8qMM%2FtUWS%2BqZunBrvUVFpXBKHPZmQKv8DCCoQABoMNjM3NDIzMTgzODA1IgyG6KhvEDrD8zJmQxMq3APaD6sU4WmCNlmwOXwndyfzleo5Ggt4HQ0kRAVLgqSeSKZE5J4l3u6ys%2B62e4vInW8vCO7poxZUBvC9buO2mfwqU2dZ0qMK0161gY6ga7HWKhDq3qO4wfr74OfCJqiJz37cyBpO%2FhRJ01mANzmQl0gxDcYpCbiCwyywbox0VKawu5cC%2BXpU73aYVxDnvoM%2Fnhl5d2xRq3nutJ7uUym3U1qx%2FjqbXUXYuupVb9NhlZfewrxPvRBBIU%2BciMOl6v1%2FzgRdd23cGLBadZzLWzT8FDiaJ%2BqAaB78tNX6ETNXns%2BVbpirbTLvIaSxqXLM7AU0rocAFXXsYCk5Tb9Ido197ZcmAj4x7hHLt9p%2BfiHlxzhem12%2FbFlUlwItIrVasnrgziRUlLH%2FubvbqguSfzDpYu%2Fe8gutQizILhqtG8ERjjiTk1Sz4Ra2jBBxzbWgq3Li98GGUMujcouO6cecRYxamDDyiVQgyQZnxFBglAUrrLHp9osMHuD%2BSZ6pkZSN1k7WkEIW6Yzw%2BLqgyQw8qGpjQfSR%2B2PX9S86Xrl%2BYz8Zc1UEF3q0YK18QqL%2Bk5dK3Bd7MlByFSAZYw6rgyahDRzoJgjCgnWQPsc88tU23eY5Pdlp7Do49o%2FzyXN6TTJ93zCp7KDLBjqkAabOenwsKSDWeSHQQ9yxR4PyhwUJrOwC830mIzPvcVka7JYikgyFM%2BZv11bjstTjwE1UuCvu%2BPURUpk4hABVEvhUsuW4UBNxo0BbbtCfZFw8BsAxE6V6z5rUbvpKMHRb8ui77%2FtVNOCG9%2B%2BMO9nXfH%2BInUArUG7ApYGW1w88bj%2BFcdmdTsMf4uDLml%2Fvco%2FVXuVFj9%2B7Tf107qPqp0O0z2hlg0BU&X-Amz-Signature=6b1cebf5c122ec0c6dd7479616f85f98cfb142411306aefe37f7b8c1ab06dd12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKURCPO2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIBs5NKuU%2BJZS3KGQOL4kaUwts3nSEC1QDsskTjCIbVI1AiEA3MwfrLRiYbLOc%2BQHLHLI9s0FQEIxgzHYHQ5ZTtCx6ooq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDIfwW30TAawUSxQnRCrcAwpjTwAJz0%2FBWnYkjBAn11zXOtLUwnyPgAov0cd28SvWteJ0DfpiFssH5YoXWQnnRKH0dJf4l2Hf7OPYcMsFcdatpn7PaiUqrSkmDvHSROr4nj3rhM85F%2Bq9m4pG5Cd%2FsMZJNzijiQRKx53qq105hVGfH8D%2BhBN6WED6n31z5u%2BReZY5qklf8AAE4Dh1KR0czRLEoiX89NRo%2FCzS4loT5Yc4ZrkIIuSmLaqbMry%2BLruj1vv8XudFydh8o5hDeKscZLBl%2F6Ko4tjJaQZhLew6HUT%2BkB01Yb3g1r8IWsNbXD5Nmcw%2BtetoQ%2F%2Bpb0Cv9k83ymQu1D%2B9sYxtrpe5LmRkkF%2Be8Y7fpQPOohzvoNkrVxS5ZQJxmxYsXbz2DcMRB%2B4cnxttXaPQ%2FZJ4V6qP5W7R7iOdQB2eoiT5hnlU9j1a0N3z%2FkoZtflc1h2LIznr0pl91MNx8%2FO%2Bx7rTeh%2BuagZf7PBhcMDOk2w4NhcaUezRk%2B5wKpIaBUtgyFLerUSU5bzsl1OIzivu9HK2DXxyaOkEPp60QLj1kMFO5w3wd2CGSZMIndU2cgzoM8m7qBokHVFh0ZP8a5JlC8HEd4h3pv793gQxw3pdtbXlBFPE58uVgCfffKcPFpmX%2FOAxTqvtMIntoMsGOqUB2Nd4imdZ%2BaIprCcrC7ifECpIh5irMHBJeh0M3f4L%2BmgTe24rm38uW%2FebEosJ77gHltr5tMEAFmT4r9bHBo9HUerZgdGRYaJXyb%2Bchu1%2BPb1FlynkgPNTeGMxE8Q%2Fg7RxR4OC9%2F3ASC0I0oep9M7pNI3nm56vDb3RZDvr3dc4Q5NdYQohHva0x6ryIl%2BHg6vb%2BrQPTvbmR1AGfrRb%2FwJJHTYYG%2BOe&X-Amz-Signature=ac4f2a7ea3257b29e7aeaf79dbca52d20fb9e420687fb470f9fd9b6b889a3cf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFJV7NQ4%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIAkSm2BZ%2ByjkkDl%2F79wG1WBAYrFjoxQJIE%2FmVdytYQMqAiAcuZmUnMlDomL0b4b1OWkJplTWiaObRwb4FRHLiQVthyr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMBx9v9x8Hp%2B1EN6hOKtwDpeaqkPHQJQLFTag6W0%2BSfXn821rN%2BL4yROOVjbb34uuPVbmMKK5eD0uYjfnWX1XFuE7ZatGA9hJ9sh16wTGfAZDcPW5szBnaKX9TjCD1njQ85ULXz2DT3jVpM4jRD1ZdR35mUYComeBg%2BAhQtH9ykVp8%2BqbMEwYHCEhZ%2BKioYNtdUbLbQdK2AaoP4MFZVJlyJyUqlBZMgnnHVobYoUy4O7Q%2FfCSUwF4BT%2BuJ0tXZkT5PVUofAEEJNhdIae%2FYMxy2UviKOXCEvfnq7qSIxlJ4xs%2FjfajhdPcKyrllJq0aAG8Ef8HuWC90kmwYSSS4O8by0E9DAEg8K6g0h7CllYnrmSU0b%2FZCx%2BIHP4dXG%2FwbWZjYIwkGMjfFSn5xXBVomiztGnAOFMtc49h5VFkB7ffRcfv7jK%2BV1vfVA81crLvFf2USsG10AG%2FfEfG6siS6sXScmzEl4bpomx7BCuada6emgvrWhGjn0CeBKHw1rNF22AtMi809mQmGDYVvKS3VrvQXeRNBp8jnEIHGQdWA9QfCIb7HEiVS%2Bz8allzb7CnJOz9go1Bpf385rFL631EFwAFTFMhmMhDajpPvswbwsTbHK4Bw67gejAeVDCE5iTU4u96%2B0DgHfQiZRZOYZQ0w5eugywY6pgGN0xeWyVK35KH4HiXfjZdZqnlEmUuczLWARhsXTMBTX1DqQshCeisV%2Bt5RFdkTCvwlVPIV2mWFjhTJeAV39BI%2BzLyJJHtqTQnDw8y3wycEbGMOHuOHR%2Bgsk3fCBay2yD8c4aleLBzgD%2Byh1t%2BtnyAIsKe9dppZ6SjTVcmOtpccmJvOcP%2BJmXkTmNX9sSBTAUbVAZUcJLXIAz%2BcWBnNS7PRAqKO60zF&X-Amz-Signature=dd7f5b429842efcf640e7b419b347f613163c2e3b8ce8108db46e759ee0cbd88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPFUVEUA%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCPo2GRWqwah5GBigcD214WuQpam%2B8M28ZGLBaTo504ggIhAOoi91Jb198LrM3ZjQUznWvcuC5dguJzw%2FWjhs8caPakKv8DCCoQABoMNjM3NDIzMTgzODA1IgxwwwSKAZhlDg2jY%2BIq3APMSumcZVsEIN0qkrLD3q5kiscaINGUvi7ULG4YoXOV2qhYX0FysR2i3drz7%2BItr6C3iqb90Ayy1vBXZOQLPAkZ6wZUzP5XugPHfy6eG%2Ftnqs%2FS%2BSvx5i%2BOc4XvJ9%2F2of3V%2FYHznc2x%2FU5T3fOI4z9jcg%2Bh5TKV4OQ84THtWOEh60tv62hMCzHOMyIeI2bo0QGXgQ70a4BdIkWqJ8i3RMNNNxmguUVIJTI22WlGcpG1OEdnvuJvBN22nGMfCOKqzp4BUXKBIbQawK4A5HAKEWW5XbBHgScsuSKwChulAAmcu5%2BmUIN%2B9FgTKbNURqIKMltnE2S6Y7U5g64p16SR0C7QzEcoXFLybSODlupPKbaRRBdw0UFfveXshWO%2BZdEVdacrQljV0lJ61qmOuLfSxg2BZItsWP9%2B6zOI1mWviF6YvcBLh1kueSOhevjBrHTpFZ7x8vUurRFpb%2FXe1K3%2BL%2Blk8byev0hnwCBk9%2BlU67Gsc8Xs0YZb2rsSSqZmIDiFRMTOxAQP53eUFFR1VG1z0h9CxKmdv2cpViJxQMIs%2Fl1qcRIs2K9lxM%2FOwFuiPTg0adoFSgJ188xllEVOYKKLjf7gZS3GlIjp8NgG4sBI3OFWWWxPmKjNOp03gaVl0TDk66DLBjqkAWuj86RrACUpZOiAm48FyGuSto0COznkgqvimfdp%2FfZNuDKklYN5SAXVHwVHB4oTTmyuprPJvZzJRSYUlrDSPNCngUbOoC6dcdjFseJQG35iKm%2F8V5j3%2FIVBbFKRNzt5%2B2UXRADdmbinXyJgiFF%2FQt4B8RNtm6tNPqW7PQfl95RWqtEBezD8zTdB7uGp2ExxlFet2%2Fbfry4zX7h9ZJ%2B5MRwkGHWz&X-Amz-Signature=25334b9428b06ac852f8cd0aaf865e6cacfd09a7f28903460e2e3fa514fce579&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBZ56BBA%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIBQKYV9FtSPodCYznAs9k5G7w4Gyy1ued2WAVW2ZuwCDAiEAoeFyYpfIILuB3xQFyVFaaop3ZkU0jfTJzoJd4EqcGLYq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMGnlGv90i%2BUvxZivCrcA%2BiKnFaOTtz%2BgQwQFNvvI15lqkYb33Gf6uX1%2FCLT032gSnMgxcTHX9VeuTTxsuxViaiikyTJjpqWez78tkgzGyv39z1lQOCaM5eRgdvKznTDrqG0%2BIT1zxxOf2LWcR6D4Oegih2IuAdKg7GLliakan4WLAYLyn%2BK5GgQHuCeul6UrZRtIu6W1xUvYq90evPs5uX0PzqalEivaxgDxiSPgT3OTXuD1J822LuJOGi3myM%2BwyYL2zFRQov7BR2pMh2Uf%2BnNwJtixGrqYDvKuEQ2CCtD7vntvmybxtX5dtkCuG4e9WbcPXlkcsKEUUTKhHHGgSwaesgdeolhfX6WOniziGqrIAx9HlYKWX6Z%2BAKYlRoPoxaXlLT0uz1%2BG3AfdESbBmLJEdeyffS7%2B00fLetcU8KUeQZhX6KpiL1t0mRfUrp81vDUrs7PNIZgzba8yO8MMQzMsuiJUVPeUqzx9FaPtN3srcm3BrHEXYrJM3xNmlYihA1KGcnkItuB3as2k7wnB9GQYfhnnPr0y%2FsWP5xlWoQYEr0WKDZF%2BMcjrKKO7Znq3H%2Bw6ptQ%2BYG61JwWC4uW7WRSt0K0pD%2B6R4EAfkOycQ%2Bj6HZ2RJmtxpbWwlal7Zr89jP%2FJKWzoh2yIZAtMNnroMsGOqUBijoh4axrKMBvw9dHQPpttHl%2Frcqb2VatN3S8X7ZF5qKW8loEpmVSEtVbQXgpI1FMKFyEcl5%2BE5XIPjAVU4RFr%2B%2BtpimtU0rpQAUycHhv%2B7F9%2BrVuDIiWNlnjNljsD1HFVfmaE%2FnesBBtc6IHTjJtNXftDbQZQl3J9YWCQzinD2ZocvAD15c1SYhTMxZzMgyynaKi1U%2FxPvo3eHyy2LAChzqITEyz&X-Amz-Signature=5ad1f292cde8e9e0817e7f384dad3914e8178acbdcdba48c98db8151f7604cd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBZ56BBA%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIBQKYV9FtSPodCYznAs9k5G7w4Gyy1ued2WAVW2ZuwCDAiEAoeFyYpfIILuB3xQFyVFaaop3ZkU0jfTJzoJd4EqcGLYq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMGnlGv90i%2BUvxZivCrcA%2BiKnFaOTtz%2BgQwQFNvvI15lqkYb33Gf6uX1%2FCLT032gSnMgxcTHX9VeuTTxsuxViaiikyTJjpqWez78tkgzGyv39z1lQOCaM5eRgdvKznTDrqG0%2BIT1zxxOf2LWcR6D4Oegih2IuAdKg7GLliakan4WLAYLyn%2BK5GgQHuCeul6UrZRtIu6W1xUvYq90evPs5uX0PzqalEivaxgDxiSPgT3OTXuD1J822LuJOGi3myM%2BwyYL2zFRQov7BR2pMh2Uf%2BnNwJtixGrqYDvKuEQ2CCtD7vntvmybxtX5dtkCuG4e9WbcPXlkcsKEUUTKhHHGgSwaesgdeolhfX6WOniziGqrIAx9HlYKWX6Z%2BAKYlRoPoxaXlLT0uz1%2BG3AfdESbBmLJEdeyffS7%2B00fLetcU8KUeQZhX6KpiL1t0mRfUrp81vDUrs7PNIZgzba8yO8MMQzMsuiJUVPeUqzx9FaPtN3srcm3BrHEXYrJM3xNmlYihA1KGcnkItuB3as2k7wnB9GQYfhnnPr0y%2FsWP5xlWoQYEr0WKDZF%2BMcjrKKO7Znq3H%2Bw6ptQ%2BYG61JwWC4uW7WRSt0K0pD%2B6R4EAfkOycQ%2Bj6HZ2RJmtxpbWwlal7Zr89jP%2FJKWzoh2yIZAtMNnroMsGOqUBijoh4axrKMBvw9dHQPpttHl%2Frcqb2VatN3S8X7ZF5qKW8loEpmVSEtVbQXgpI1FMKFyEcl5%2BE5XIPjAVU4RFr%2B%2BtpimtU0rpQAUycHhv%2B7F9%2BrVuDIiWNlnjNljsD1HFVfmaE%2FnesBBtc6IHTjJtNXftDbQZQl3J9YWCQzinD2ZocvAD15c1SYhTMxZzMgyynaKi1U%2FxPvo3eHyy2LAChzqITEyz&X-Amz-Signature=1ceb0e36dc92f959ae070e6ce6d02b3f2ab337ab2bb0621c5d231a1cf854c0ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627PZYIPR%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIBymTKHRsSuAH%2FPj2l0AA2KXqpUZFb6gkKHnQEdMEqr2AiEA3iDsnY6I15KHpUTzfPRRc2MYb9Lun4giVNlXFYd60twq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDAWY0edx4UnE8M5QSCrcA0TBp7jxpzW4gF1DUrHEF%2F%2B%2BGfIPb8UO3bLv8j15jmcMe3BHmtNNwyGSeKcuRJcrzWLjOEx5saXi4Dy3lAnIXIqxW3vhWTQtEjyH%2BZrzLqvZg2G2ESezgrsvPL00GqeoSrTIy1ZJrSY2pE2Bo%2FK2nYPtPdzasT0obwfwJMoCSHiaix1wR%2F2sxbuHXQeUBp0dHe7F7Wi%2F4TMoJQPjpqyjTODVBn8Y9eUi6eebyK5rd5u%2Fygx%2FJggJl4pC0y8yKMhX9gWfMtP2x66DoS%2F4bXRSg87XHHdas0P8iWVoRJzMwNu9MJL%2FENj4zGupt87otuLU9JFxfth%2FelAnjrH63wq4aAVlwWV7b%2BQg9I2FneYrfwngbfLODumLHpRfSn6ft74Z6roNYfeAUm8kwzbtH1uPeMWFbiGr%2Bjx4seOWBUCOP3G7LvxiqX2LzVsaR%2F8ona5LOEq03v%2BKwKCEZL4XlpDPPTYTk8KigBMmX%2BJxD9vNUPZ1V35NSuSykBWddWMvzVlrfLqQ847Ohbc0swd5h2UpcyuIJX9fTQC3csYxshVwOuM4%2B9%2Byw6gwVdt5Hq6ZZ%2BMMC7Sj%2FDmvf1%2B7eHYjJWclD6WOGHZiqKojpEjNUe1W6DZ5ZGASl8kqXngr6xx0MILsoMsGOqUB99DiXvqiJWomWawJkdLVyADa%2FKitqrml6UAtNQJ1G7NSnYil1cbfwx2ROzTqTLKLUrNQ3iEvzuyr1v9geL8AEJXrMz250GwGV6BT4%2F171lOfMPe1bImtBxBZ%2F5hnbUqlq%2BgjrOa%2FZ5DN011PUI2qifZj5ZKFwKp6ZnR%2BFEyiPz%2BzzL3gy1VTvYykL6Sg8Nl34RSSjF0cGEK%2FLKDUgzBLc3EmP790&X-Amz-Signature=e9aa071f0758148f2b99a818e6b15f9c1ec86d24afa965991f8e7757df599ece&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V74LV3VB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIAQj2zzTc%2B2YTJ5yGi55K6wp%2BV%2FBgIoPWptSP9r2HNFBAiEA77jRoZyllLtEjkzSTOybQw1fJymNr%2FjzMTTEBATkyZ0q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDFDrCeeW0eHamOJPTCrcAySmX%2FaRFwdV%2FTdRbJaFTqftUxRzBgLe%2BO2pMU5PgSeY0Dy2nMY2Qk20sR2sTxSkhtAcAuoqqf%2BpC%2BXVi8GvmCaCgeJLONcvAd6SGDvekMnwBiBMWVor9rbQ7kXmn72aM%2BxcoPxcSufMtfQdXJHK606nIx8ramZ5xDMt91o26s3vUAcZuiwrNFmndUIKhG1JsA2ERqUGK6wuPTlVKJ%2BN%2BCZZuU5L12KkPNAo2uEoTPs2gH58odTeGoj1l%2FrzAv7WcSleEC1Dc227VVFGdUwV2Of7BVSSelW5%2BvXaej0scNyKWv3A6hctf%2FLbITc0XutAS8e3ZAWCtUYWVfIgzmpGLKAjednUsQ7QvjMgOdNULJYmO0J%2FLGIdzXz6C9k%2BIQ6oLet1JqLE3CozfyfRi6xeGsyCOp33Whte514%2FK%2BYc8J4t0ErhsrlJab8QRZ4HyvCdjR4CP0f8812ouNxXux%2BjpM0RWjorMnt5QfGRmAlVbTaWvGNZq7ajWvn2MLyUkJeo%2F6LxC9SRZhBh1Uav0Y6GpHeY9vjVIPiAq8Le1zFm95wBNwRfIgEYaQWi%2F36SN1c7TCvUlaRq%2FJiCMqVTmJCiqADcSprrGVXYVZknOUwRS7Gy11lRNKeX1J%2FU6xXvMPfroMsGOqUBgDvr0rInbi8dgoJd5sU%2BoiNVYEJXL%2Fg7XMPeoJa55PNrYPHOK0e5owL4SclR5o%2FdGr0Hug%2BxCeTU1E5HWfbpkM0OQSXah1z0pnZBBa2shReR4fuwsxI%2BpEuNqt4m7I865%2BhMPRge6OYlec9xs8iba6Ai2E9Y9M2f%2FqmIbdX3KPjNAC9gzN4qhWgcgy%2BxvdMuLQWuDUxVlcnXe3%2FAUsNApJZqH3f1&X-Amz-Signature=49d56f16d199b944b572de47f8d618c172d7125c3f0fbae9c4e355bc6ae79c2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V74LV3VB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIAQj2zzTc%2B2YTJ5yGi55K6wp%2BV%2FBgIoPWptSP9r2HNFBAiEA77jRoZyllLtEjkzSTOybQw1fJymNr%2FjzMTTEBATkyZ0q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDFDrCeeW0eHamOJPTCrcAySmX%2FaRFwdV%2FTdRbJaFTqftUxRzBgLe%2BO2pMU5PgSeY0Dy2nMY2Qk20sR2sTxSkhtAcAuoqqf%2BpC%2BXVi8GvmCaCgeJLONcvAd6SGDvekMnwBiBMWVor9rbQ7kXmn72aM%2BxcoPxcSufMtfQdXJHK606nIx8ramZ5xDMt91o26s3vUAcZuiwrNFmndUIKhG1JsA2ERqUGK6wuPTlVKJ%2BN%2BCZZuU5L12KkPNAo2uEoTPs2gH58odTeGoj1l%2FrzAv7WcSleEC1Dc227VVFGdUwV2Of7BVSSelW5%2BvXaej0scNyKWv3A6hctf%2FLbITc0XutAS8e3ZAWCtUYWVfIgzmpGLKAjednUsQ7QvjMgOdNULJYmO0J%2FLGIdzXz6C9k%2BIQ6oLet1JqLE3CozfyfRi6xeGsyCOp33Whte514%2FK%2BYc8J4t0ErhsrlJab8QRZ4HyvCdjR4CP0f8812ouNxXux%2BjpM0RWjorMnt5QfGRmAlVbTaWvGNZq7ajWvn2MLyUkJeo%2F6LxC9SRZhBh1Uav0Y6GpHeY9vjVIPiAq8Le1zFm95wBNwRfIgEYaQWi%2F36SN1c7TCvUlaRq%2FJiCMqVTmJCiqADcSprrGVXYVZknOUwRS7Gy11lRNKeX1J%2FU6xXvMPfroMsGOqUBgDvr0rInbi8dgoJd5sU%2BoiNVYEJXL%2Fg7XMPeoJa55PNrYPHOK0e5owL4SclR5o%2FdGr0Hug%2BxCeTU1E5HWfbpkM0OQSXah1z0pnZBBa2shReR4fuwsxI%2BpEuNqt4m7I865%2BhMPRge6OYlec9xs8iba6Ai2E9Y9M2f%2FqmIbdX3KPjNAC9gzN4qhWgcgy%2BxvdMuLQWuDUxVlcnXe3%2FAUsNApJZqH3f1&X-Amz-Signature=49d56f16d199b944b572de47f8d618c172d7125c3f0fbae9c4e355bc6ae79c2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHUXRX54%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T004222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCID3WvcHiNxSNlFIROWMftz%2Fzh9a4mM5eUZz70FFYWYgrAiB1S93UsNwxCm7EghkuyyDsSF2zzufL1y2hbU0hhBF9vyr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMiP9cCOh2108E8NsRKtwDULozyTDFiBRXegqRr2Fpc5mQElyIYjAppdItXk%2FjpMpbsJksnAhC1jbuXKa0OAVjzWG1SZBhBqRELK6YKt6q7aZe1eFlvcIXL%2BsdV6a2%2B9Yg3sTYXUlIZqy3oxGwe%2BJ%2F%2B4xzkWxMf39gCU%2BWWd014G4KGl9xJzbGiSwjz%2ByQMLPf3AAlOLC2ys1jx9ee849C35Wd6gNgPRN3143cuyYDXdZGXKagepzluqHk86uFEi7Ay4KnNrynmN5Cyo9yh4A2i3YZtfbboyk25KV50kCGB97cd6rlbiGkwKVUKKGOrDCR6LLGwrz35o%2FjHLE3Tcnf7zH%2F6jvjOr8l84v%2BRB%2BpBWlXRlOzyIu%2B8dC5kqnCZDUbfCXG63Pd4dYv7GX%2BCV3z8K%2FSoGENL%2FlETK21IDHCgYZJtX0bJdrWL09dj7oOYKTI6aH1SU52heiKkZdSy6w97fh9FI%2F6GRWD5icd3WgBspCskZl78%2BNFvZi1p%2FYkFJ2yBJASUkMmSQGWDWmHB%2Bau%2FSntWr%2BhI8pDahzuNIvGbZjRzHsg5Bpb4z%2BFAda1EpfHqkI8ZEi1KDEIKLm3CxuXyRu4DSAfK%2BQ9GMs2G%2BG7MC5nhfjA12Hjos5XZjwpSyMOr5Wm7nqF%2B4Dh0JowlOygywY6pgEXdednJjXga5XkaLjVAF02xG7%2BTvqIGV%2BD7OHdYWExW8LGKUwgDIF%2BF%2Brq9f6cJciuyLLYFG6XCv%2B0OOPKGdFE9fMcJbzpKmaoVkiDngClub%2Fy6vl2qFaGcG4KV8g%2BLcZYV7pcU9BX%2BDCMnpnwQjDDZGNg4s6ZwUM%2FIwRuLchyPncZCq9ObkI6hWHr8sn%2FCZ%2F6IIJCtooCboJm2o6Gj%2BsorY2P5AD0&X-Amz-Signature=8378386cb309aabf61e3247b5a58da1fb1d9b25130a0e2e6ac8cd248e5b9fbbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

