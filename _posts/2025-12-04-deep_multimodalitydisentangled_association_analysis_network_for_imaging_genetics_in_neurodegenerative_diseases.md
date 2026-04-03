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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KSQTDAS%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8rW0d5AQCLqUKQnkI0RRjopdCHUB3dqhVUq24moLDLQIhAMst3bbKn7u4GOqRyEDnuUiysB6mKQzWE1qluN58I3wNKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyhbejWojAh2uelUB4q3AO6ob5qRbTOw1OJQ8ZgsUNBDvT%2BAwXMD6csD0zrGsQNNZoaql6hDsn%2FY73RcQEUAWQMHOgbW5JvB3SJdJ%2FY1tw1AFveOI8u8S0U6jK2Ic%2F5JHRYoqWYlSmyCiMz3qOQkM74tYwGmqbrlvVbNAnd9yy89zNVToCrpPZxMtK8Vr6CQldX%2B0669ZI1jQQNCyjHtwg4S0IF68TNNoK8m03EW5iPsyRy0THSa%2BB2jldeVjo3UsPdut3nfbMQ%2BeHQwngMprBYA1I0uHhRCQMQhjt2zwex9H5J30uXdGXglgXhRxHbtFzOJqdid769w45KNnYGbJTAB1OFesgxrx%2FuUnrOXZRYLeE8%2FCBZ5DuszgtKHt2OQxDIMKBps71X7NyufICB%2F5%2BisvQ0seshTllbBT9okKkmSM6N%2FxbztylFot7qHbuxF3zX1xy2HCnLqVrc1l%2Bl3ZBygst1MtXsAGlmB5WHdKvwdmWs8duP98D%2BDSjwl4Yr7cUBXcsAUrnH4m9g3NKG99rW64jRpULe6zCOQGR2kMnPLiZmavL%2B3%2F0uZcLvWLHHTt9BK%2BLTWcFs8sJIzsBpSkz5V8JyxHrT511lE3IZ1XtBD7VWu8wPkHWTJwp9xOX9HqWJynTUvrSVEwMnkDCggr7OBjqkAQjRCXl0nUcOJhOhbCl%2FFYQvoygcjNJBEOmJcPTUq%2FAgjONrGawywopeuXKixTzMrI3%2B05%2BIzfaPQEKDz6%2FcCJV3jZMZcSwEM8ia2SUwHgx%2BImePIXZWd8gXyYC7xndKKepIB0YpDkn4AKuF9iaYDmjRIdQmKa59TEcZVfw9mY7ZeE7TNExQOA6dBT4EyL7yTTLBQf44SW7Dg%2BMBr7mMkkPC1fMh&X-Amz-Signature=d6b3c87a7a09f2674255f1df9c97c3e551271cb57ea43ebc41385602b3ddefb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KSQTDAS%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8rW0d5AQCLqUKQnkI0RRjopdCHUB3dqhVUq24moLDLQIhAMst3bbKn7u4GOqRyEDnuUiysB6mKQzWE1qluN58I3wNKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyhbejWojAh2uelUB4q3AO6ob5qRbTOw1OJQ8ZgsUNBDvT%2BAwXMD6csD0zrGsQNNZoaql6hDsn%2FY73RcQEUAWQMHOgbW5JvB3SJdJ%2FY1tw1AFveOI8u8S0U6jK2Ic%2F5JHRYoqWYlSmyCiMz3qOQkM74tYwGmqbrlvVbNAnd9yy89zNVToCrpPZxMtK8Vr6CQldX%2B0669ZI1jQQNCyjHtwg4S0IF68TNNoK8m03EW5iPsyRy0THSa%2BB2jldeVjo3UsPdut3nfbMQ%2BeHQwngMprBYA1I0uHhRCQMQhjt2zwex9H5J30uXdGXglgXhRxHbtFzOJqdid769w45KNnYGbJTAB1OFesgxrx%2FuUnrOXZRYLeE8%2FCBZ5DuszgtKHt2OQxDIMKBps71X7NyufICB%2F5%2BisvQ0seshTllbBT9okKkmSM6N%2FxbztylFot7qHbuxF3zX1xy2HCnLqVrc1l%2Bl3ZBygst1MtXsAGlmB5WHdKvwdmWs8duP98D%2BDSjwl4Yr7cUBXcsAUrnH4m9g3NKG99rW64jRpULe6zCOQGR2kMnPLiZmavL%2B3%2F0uZcLvWLHHTt9BK%2BLTWcFs8sJIzsBpSkz5V8JyxHrT511lE3IZ1XtBD7VWu8wPkHWTJwp9xOX9HqWJynTUvrSVEwMnkDCggr7OBjqkAQjRCXl0nUcOJhOhbCl%2FFYQvoygcjNJBEOmJcPTUq%2FAgjONrGawywopeuXKixTzMrI3%2B05%2BIzfaPQEKDz6%2FcCJV3jZMZcSwEM8ia2SUwHgx%2BImePIXZWd8gXyYC7xndKKepIB0YpDkn4AKuF9iaYDmjRIdQmKa59TEcZVfw9mY7ZeE7TNExQOA6dBT4EyL7yTTLBQf44SW7Dg%2BMBr7mMkkPC1fMh&X-Amz-Signature=d6b3c87a7a09f2674255f1df9c97c3e551271cb57ea43ebc41385602b3ddefb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMVX3WJ6%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD4PTxv%2Bm2aW0dHcP4dRCF9qm3kj8uAwcsePvaf0wFjUAIgILcjbKpLNn7THpS3LQU%2Bd40f%2FtL%2Bim6NYO3iM8HJ%2Bi4qiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGC8m2kkBHFNmx54vCrcA08MynannEJok%2BUnMEcFXz6wlC%2FmiqZcuVMQEad1R1NBEahGHqQI3ekvF5ffPKmsdMmX6EMXswbQg1gOH9nKMsa0BagyEorcuU7Jbo5J1QA6NouNWJAMLjZOZDn8QdQnkFfH4JAd9SITNg%2FCpnXe59mRRGHCN3bWRJrXTLEY%2BRUyd9N2TZ9HVmbVz1LmlEiXdyADZyH32x4pGr0jrkVsuaC4bN4TgY1lpACk3pcZN6jWIkQ0%2BUCDz%2FtE%2FJ9oIcwW3%2FVtx2NiILoMptp3P9pPQNlc2YauwnNq71M7fZafKcF97UN7m2mUynFiDwJ09202WmxsiF4TbauKJYVKuuG8qVjSDxCVT1EtL1Pu1vbL%2FIqHi3GNBbXdBujuJhBatKcV4VVlr21B57myVqlxZSlalAZr1mOH97kxXPOXn6FjVMW44VFqhoB3Fl9RQLSy%2F7kJHqUJypShtYHhDWAkVrLIft%2BqZ9YbtrnvNqc7lr0yBgRtoyO0UYSiNLlf6O7nMFbxC6kLtfIbE%2FlfCVMM7mhl8GCTVrVBq3ZJx%2FQo4185Jo%2FC6F6e8n388aEUrEBNFO0xsNPdhOKajn9r7D%2FLNg4%2B9Ry8ZfNM5sqUvzc9NLS724KG39kRgFrRmf9nLlIIMKj%2Fvc4GOqUBboEdP416py0rHx9zf0aGzaHPWIn%2BHnVE0KYmPl8yRA3eomoCaCnIH2lNzCfsFgUeBnuvJQFKBAvGrNi1hlkYlk85NLOfApRY9DBeq3vidu8LN%2BgzPWM1DDr714rxdh68YR5vizdwakPYPFo69SARC7bUPkrphM0A%2FzBQB7KqA1fq9bH5J4etAYVlebwz65A%2Bw2%2F7TwA2j06sFyI10KeUJisTg8PX&X-Amz-Signature=46cf0e9e8d200821f56b5f4c1c1a5fbe35dc4718968262d24c045501c209331c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2AWXLKW%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID%2F%2F7mEEtfg827x2QRKJwlE%2B2YTGGMx7SvRg8X9QXcVcAiEA6dl1WA9H9aM7PK8Do%2BIK5qXfeXeJp%2FM080MnUYknfI4qiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDdrL7liyi0cXP8Y0ircA3MfN3v5Qyq99l5ioV4TKZ%2BFjBriDPQqasSzSAkH4Isw%2BZG7LKoMVZY18o8R21AOpzzCtJQbjgzGgUseoNpx3wpBCYlrUVnvugbe5Jqbuqfmsj13mgnzF488NuqVfJTBW2YWe7Tug%2BwR7v7ZUpgwN9vKI7F%2BcMwDY%2B06ZHXuKrGKrlK1sTvvV%2BNtcuW9tdDdlm57tv3uICzH35J5hL%2BP2O1X0Mrx%2F%2BULM9kCxoZEIGIpjVHjK30%2FS0JlsfzlNVmdBmXCXzwqrickrRQcSm7lfxM2ZxISPa6Kox0%2BfEMliZu912G6mwcIn6dTHTF%2B1zlvTHyggQ425ldAStgJfoIfbuFNhtBPRX70sPaUpiUKyEtSUuRDvwkoF7bUQehAvSyTNPDFhcgWJqRIvf49V7BiKnhYIMpXbQiBnkI4LnNhN5YwN%2FvS0WkVPj3VCVeY5azUR%2FI218Ip0s5bJORjOE71EjP726p6A6E8N%2B14AymBS8MeGR61gn7%2FyL5KX8a7tqokC%2FD3jPXGSepdoE%2BC%2Bh0IFEOd%2FmOkEgUgs4L17AjYbzqzsjBtY%2FNKvLGAXTTv0yKN2c2huyAlyH9FiiM5rJFopV08EFJNx65IiBXAcaCQT67KCiPIZLtXKkOvBZs8MKeBvs4GOqUBf1lMJdFnQG7F896vxnofqfu49jeGw03KSW%2FitXilKcQEHgbVs28CzkQIpMyuuBAwXrVueK%2BEenkAonS3v4hKsdfr2EX8GHKYqtnGAMNKemCj21pz4N1BzoW0AnvOHxWPEO5TvkARyQ0NhQ%2FQYm045H87K1cHK86JMULx4TCrxyd0zbtvlAognd6LfMNDzNqTrnNJ0erivYlbCuj5vLYpuD1qHIgx&X-Amz-Signature=7d9e3de2a44813e28bdf4fafb9b6bcd25c27c3213d3a03ec1347e0ac8a11b1a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2AWXLKW%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID%2F%2F7mEEtfg827x2QRKJwlE%2B2YTGGMx7SvRg8X9QXcVcAiEA6dl1WA9H9aM7PK8Do%2BIK5qXfeXeJp%2FM080MnUYknfI4qiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDdrL7liyi0cXP8Y0ircA3MfN3v5Qyq99l5ioV4TKZ%2BFjBriDPQqasSzSAkH4Isw%2BZG7LKoMVZY18o8R21AOpzzCtJQbjgzGgUseoNpx3wpBCYlrUVnvugbe5Jqbuqfmsj13mgnzF488NuqVfJTBW2YWe7Tug%2BwR7v7ZUpgwN9vKI7F%2BcMwDY%2B06ZHXuKrGKrlK1sTvvV%2BNtcuW9tdDdlm57tv3uICzH35J5hL%2BP2O1X0Mrx%2F%2BULM9kCxoZEIGIpjVHjK30%2FS0JlsfzlNVmdBmXCXzwqrickrRQcSm7lfxM2ZxISPa6Kox0%2BfEMliZu912G6mwcIn6dTHTF%2B1zlvTHyggQ425ldAStgJfoIfbuFNhtBPRX70sPaUpiUKyEtSUuRDvwkoF7bUQehAvSyTNPDFhcgWJqRIvf49V7BiKnhYIMpXbQiBnkI4LnNhN5YwN%2FvS0WkVPj3VCVeY5azUR%2FI218Ip0s5bJORjOE71EjP726p6A6E8N%2B14AymBS8MeGR61gn7%2FyL5KX8a7tqokC%2FD3jPXGSepdoE%2BC%2Bh0IFEOd%2FmOkEgUgs4L17AjYbzqzsjBtY%2FNKvLGAXTTv0yKN2c2huyAlyH9FiiM5rJFopV08EFJNx65IiBXAcaCQT67KCiPIZLtXKkOvBZs8MKeBvs4GOqUBf1lMJdFnQG7F896vxnofqfu49jeGw03KSW%2FitXilKcQEHgbVs28CzkQIpMyuuBAwXrVueK%2BEenkAonS3v4hKsdfr2EX8GHKYqtnGAMNKemCj21pz4N1BzoW0AnvOHxWPEO5TvkARyQ0NhQ%2FQYm045H87K1cHK86JMULx4TCrxyd0zbtvlAognd6LfMNDzNqTrnNJ0erivYlbCuj5vLYpuD1qHIgx&X-Amz-Signature=72184d795922703723081329d4e7765e6cc43ceb78a4acb273b9196a15f3884d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4ZK2S5E%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEgQ0UkFlez%2FqlM75GDnhiLpMvSqtI3voH4IqvZLtg48AiA%2FtZeb3WEzAVPc%2BDvYM%2BwmHYBFVcENyEfNRWcKIvBZZSqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsEaX4U1qxRfR0jaVKtwDYcP9ivGL4gsngcu8nrOf6EarJyN%2BgZWglBhbGBQbUDeeJdN%2BU%2Bh%2FySodPKp8oytiMgwenBih9x0lyP%2BHgFLMyaaUHFTZD9DJveIn77SmCW3mbYqmPACo8qiZRaVVP8IHSgYQopSMaWmDv0IcklDfn8jqvM2JgAJMx14BplBDhlIbax1%2B3f6vNLRtwCNYiR6paxMaTy1mJOOWUy4xyQrGsuqU1zUjGDJxg8JqtwTF%2FSdLtKlTqmf4ISaEJRfiXhYMLMdhGJka3Y%2BLXMOc0BrAeQV5m8dsuorbrdupULzXC4cGsjXn1Utc9xJeXmmsgtLHQV%2BIsVd9Fv1%2FtGJUi51bZd46lUiGr5gsAdX3pv5l06X8JqM0i2dQ6tgSslfm%2F%2BLV33etxsnqA7v7QavgEFFhD0gFNOuB%2ByoxaMYY2AajNXzMgjNJCE8u5qEc95oxBgeIsix7bI9RMTKVpCcusxNsEK3zHC7xBOS9%2Btqx71%2Fv80w9ca2zMgHy0Qe5eDtSlvdIU9P%2Fw4%2BZhBZOVG15W570buTGi3SLI0sRfoJbchqaWMVywOMuEkhR96JGrcyqnb%2BpUUtfldMGMRwsnFETtLSP7EtFejpLaaqhe6Crpdf1NRO9JbQdleE9MwVFbq4wmP%2B9zgY6pgGLkx3shdprPBHt1qQi%2FmmO%2BunE7%2Fumcm7AhUGWAa81O0IHSwuQOm3c0stSOqFsM5CgsVYWlQIBXkxwH%2B8zijL6y%2BiRTW8msRWCNxIudD46kXUnbkaQqegVKirzJvh1QDDO5ZtHyL0rm%2F3tiamvUTYnLaSdc3lfZH%2BUyTaR%2Fzvphn3m2glPBEYp7nIY2G6iBMv3R%2ByjWwy81zi3fdfNEBm4X%2BnA4Kx0&X-Amz-Signature=3fff0fd663e5f2a7e7bdc14321dcaa833e2dfcd111aa19403f5df645faa4408b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XG5UU2QE%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICs%2FtVd8NAwen%2BGk%2BTBfTON%2BpfHcvNb0Kvm40dnoTGEiAiBSz1JCmzFabjDEl1M1ULKkwKUEzPtOEeLnSkKNeJe6vCqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNLShHx7JPTbykz1xKtwDCfSPHLfdJ7QEi%2BC8tqHH6ka6HTZQKzGN%2BrBYInDpTCrCeTRZ2jtyav3fXt%2B8whq3xHpj1QaP7kAO7mizeZYQXre9eBEUcAc3FWxHv%2B1JTbUkx0rBXkZ3DvXv5Xu7ZC4Zrc%2B39bAQwKxvirMNcXWXPbAJZaTevhKg2aZNQVKLMe8hN4kJL669DLGu4Q7Twd6p190W4dIsUBtZL2fbyRKQ3dnNBS7MwLoAIGrOquVGwsEUpjG6PtiTA8kjmbml1xBSeLOxfgHw4e3JUr7Bw2nUtooD31VTKTKAZAD5mwiTccY6F3wetTvtV8RELtIMZ6KIIMboDmWrVSY7kSfNdhg8Ghocb%2FB3QFrXMrJ5XOsPDRs9yOovqAurLzQbvy0gBGfEWaypL0sGP7Ps27k6wDB8Ti43FuWc46H%2BwciQmUBxDTXC%2BCbOV9btGOiSgqhMig3xBL2uZhuZD5IlxblckFcPkCIoj3BWWIfco1vQhJ7mWfGDe4kmIaUrWkdzOeZ%2FLNVWvM1SqgVWu3mYpe03wvNzUQut%2F%2Bk7pcshYG%2BTLmSBgUvBnWX7VDywQZeXmdAJmeHkWhXl3qJqOFaRD19j3tDoQD5vKnNW9igL1v4B9wr9dxCwwoSsUtfZCD0R%2FlUwlYC%2BzgY6pgF2xRMxfl42WfsIvHfy3iqwaW57GFhPNtfWyP%2F8lQwfPEso%2BdqdYIqLpvKEafSuqEYzEYbIje3zCkneHdxhkcYNThITxtLLCk3IcwCC9evhGLytsGPcDsSdKPA4uLWauF9SxWZThwihxKka8T4xV3189a8YVekV18EzZBK0rpeQVvcE55XT8PNBg%2BaJEwMJe%2BMsGHO%2FGraGHVHS0aj%2BfEG9BbZhu8tS&X-Amz-Signature=c8ea5d65232851410d748ae84cc09f67bd783a1f8d33d67fa49a0457644a8886&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7662QZF%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsTRakl4epK%2BxrxquKxrLWFbMUnsjOd083o45TvlyFoQIgMeG4hp7T9n1KgBDuOGMqqW%2BCir18ZwXyyOeZ8arVvHYqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNwPh%2BHCRI2voN2XfyrcA%2FifZvZ6jbKfGRF8ozWTfyL2loL%2BzAUpfYSLC764%2FSg1GQa0qdg28zzoBmaJlG1SubVmply6VtM0RNLNNDZFlvJZyxMUnQ4dC4UpBYVb5h9Uw7aSSiGlz4e6dOirSUDJi2GUMB21DRqm3VCGKyHQqJYi092atpJwdE9kWvosVT4fOWzfTiAQYrWx%2B5BZEwsJn8C5zvTWLIz%2BjEHX0Z7U0CEDap8hovsxxrN6ybjDbCo7d5cZUP7tW4djV4lNvy1vex2hrUVYUX4%2BT2Bux5hHPWzC4mxEj1gtsVgkRyaV6dVo9ODZHLy5KTDKdmSgubyPTzfkTKUxicXG73SSQKrm52co0%2FzV85NvSV6sYKPZ7CzM1QQAntxvIN8LUrrSZ81PXoQUUYBW%2FT5YFRYngByoN3HhRu4uWjwlpX1%2FOgBB28C4kEE0jIgpIjchaizOvq%2F34f%2Bu0SYh2wijlOTOHBMHhHdeXkgb%2B%2FHAQnnQtt3MXy8H2yNnqgnGoiJC4V8rfrm%2Bf2GrS%2FGE%2FDnTPmK%2Bzb7%2BtSzSNwHO0KgWivRI7XuMmQu6zILXbCw89cmPbLl1osXEVolBgNrYB7NPASDncQMWjt641twe3QvvN3fI%2F%2FcOWqsxEqZvC%2BFe%2Biu%2FEOssMLyBvs4GOqUBxwJeM2mArscxIwbYpP1UCMhmuk%2FelcNMM1t%2BgE89bXylZpd5Fgv8wuMjKfJcZk507UjGeNMM334WzQ9I4fDDv7FtfuWxDhTg%2FrgcjZuqNNOqgtMSUJ%2BINmFhoD1TrW2Qcy6xgcxUizdiv79LSKXJ21TjNbmM7iRFxgWz9HnXzELiMpTUh%2FS3WF06eqKisS3h0A0no6RBM27nD%2FgVoLJSFTk0Zixk&X-Amz-Signature=e454970af56d155fc7bbd6b018d33057d64c90b838b16cb50fb338229c92b674&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOAJG36K%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBQ9zvEbYXhJ5%2Ba1DUULIZ2J%2Bm25lziJPWT%2FVUZK8l6WAiBlswET5kJhXu6oW8s6ISuHc6ID0DQSCIuWNIYAqXWoLyqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBXonYzKmHmmp%2FU7QKtwDF%2BpYuFtRChPJ%2BZvCB0eFYuKa1N7bc2VlkhhwtFTYygevgwMC%2FhaCQN5R7Sccht2R0iYu8ogmRvvshFWGG6M%2BrP%2BTrAJC4HefsOpwHF3ncUhyNkJT5QwksIM56Hc0vQw%2BoZE0gUHlNPSCT9VO9K9VmDgwgC1BTJRfxt61m3jZ%2FbWHUIxttBA3AY9b%2BKrvdHeBAQ6c9YZIoO9XZ5Xl7aE0d01VULwJrZqAaUIhRG8arFaRU3VYwwIbCdCbGEzSaasoXXUX0hOOtFiOu1QaBRdCfZ6LLkdqzLKzfmw8Y9U8tTwNO3nMX%2BXMwud6Ar5WgulFDuRv8FlRxjYeuz%2FsO943aXuIbegNL43e9W%2FW%2BSB4w%2BQKWsZoaTOqPTzaHv3b0Jnj0HzXh9wz62kYb%2FbQFCzxkbUYGR1OqBm0Q%2FO4Jrj%2FO1nhNDzUF685h1mMdOQ5vHHq5CGc2%2FMMfTDVupS%2FlcW%2BotLDjAuJ2yNs27E%2FB1u3QV2LpF%2BdEX7Zk9mhWkM0N6psycPYgZbnxAP8e0lFRRd8yMqEdqoYfljtXxdCOsghGqh19FDHcxXttL31SVhUvcQzilebEnQq92n%2Bzb7eCkEjKOMQZfrQVKWHF4XO5TVHDHygPuq14bsYvFcA%2B2kwnIK%2BzgY6pgF4lgWe0zF7dpW735wAP7LDIf%2B74VgHBI16vUxZaub52XT%2FpFPRgEdyUc%2BPDY4Ij8eoVqtpIHoYSZA8%2FTcbJp7L%2BPLC22V1ZnOJFlXR0M0Yh2uZT%2BpOIQWkh4q8etb6XBtuxIi2xPh%2FY1MUE2UPszJyTquMJyMuH%2Fl4GTebN%2B3%2FKG69prRLQL89n9Oa1EhsX4R%2Fgsx7DirVM2JPCYcgSxslM%2BvEiiPA&X-Amz-Signature=dc77efa01b1a116a3bdcc740da4d231053d50a4d8735be424dd6344534ebeb57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOAJG36K%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBQ9zvEbYXhJ5%2Ba1DUULIZ2J%2Bm25lziJPWT%2FVUZK8l6WAiBlswET5kJhXu6oW8s6ISuHc6ID0DQSCIuWNIYAqXWoLyqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBXonYzKmHmmp%2FU7QKtwDF%2BpYuFtRChPJ%2BZvCB0eFYuKa1N7bc2VlkhhwtFTYygevgwMC%2FhaCQN5R7Sccht2R0iYu8ogmRvvshFWGG6M%2BrP%2BTrAJC4HefsOpwHF3ncUhyNkJT5QwksIM56Hc0vQw%2BoZE0gUHlNPSCT9VO9K9VmDgwgC1BTJRfxt61m3jZ%2FbWHUIxttBA3AY9b%2BKrvdHeBAQ6c9YZIoO9XZ5Xl7aE0d01VULwJrZqAaUIhRG8arFaRU3VYwwIbCdCbGEzSaasoXXUX0hOOtFiOu1QaBRdCfZ6LLkdqzLKzfmw8Y9U8tTwNO3nMX%2BXMwud6Ar5WgulFDuRv8FlRxjYeuz%2FsO943aXuIbegNL43e9W%2FW%2BSB4w%2BQKWsZoaTOqPTzaHv3b0Jnj0HzXh9wz62kYb%2FbQFCzxkbUYGR1OqBm0Q%2FO4Jrj%2FO1nhNDzUF685h1mMdOQ5vHHq5CGc2%2FMMfTDVupS%2FlcW%2BotLDjAuJ2yNs27E%2FB1u3QV2LpF%2BdEX7Zk9mhWkM0N6psycPYgZbnxAP8e0lFRRd8yMqEdqoYfljtXxdCOsghGqh19FDHcxXttL31SVhUvcQzilebEnQq92n%2Bzb7eCkEjKOMQZfrQVKWHF4XO5TVHDHygPuq14bsYvFcA%2B2kwnIK%2BzgY6pgF4lgWe0zF7dpW735wAP7LDIf%2B74VgHBI16vUxZaub52XT%2FpFPRgEdyUc%2BPDY4Ij8eoVqtpIHoYSZA8%2FTcbJp7L%2BPLC22V1ZnOJFlXR0M0Yh2uZT%2BpOIQWkh4q8etb6XBtuxIi2xPh%2FY1MUE2UPszJyTquMJyMuH%2Fl4GTebN%2B3%2FKG69prRLQL89n9Oa1EhsX4R%2Fgsx7DirVM2JPCYcgSxslM%2BvEiiPA&X-Amz-Signature=d74d1847f870d5b27e42eb041c52c774f8368848edc3e3ee7c889a78bcfc0e9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466333AIZNV%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHizwV0V%2F2GDEsY9wnaHObJZRxXa6hZYeJtlIgUIGN9RAiB%2FpJKj%2F%2FUgSljQa5mXJvO5pj3CGeF%2FSHMui8e7LgsY%2FSqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5AzxFi1tosPtr7TTKtwDdEwseiOstqy3eMxTgrI0saPiTo8vvQS7iAq%2BhUOO3SYNMaKYa2Fvz%2BBjUjh2LIIsZV3ozp%2BjWkYJIWrVnIThEnEnw%2BTxc866uCusbmAdNcTO9oYAEStBG9pnpN8qPDgmCUMt2Dl9Y0RzeDqgDRDbf%2Bk%2BmOKlgMZRWD3LHOWSXq38JTitU0zF9AkZ8c3vOPDwXnfi7c61wROGLdO7YFEUDmDb9OhkOFo%2BjlOrgvHmsOmPucyNur5e9Qmr4a8Jy4fQc1nGnqlPaHFCQjU4N92j4Q%2FPUDOWel8DQvjIlK4mRotAH0rTIKW8tS6KJkwpqoxWEbVr1Zp0IjTuinyctGvy6pKm0YUpjXcuT2sJgXAMfIFZn2eN1mYUbOq6VHy1%2BEb%2Fm8o2YitebalPXYEZe0vBojn5nnFNnX4ZYbwI1XW72MLOu2R3QK3wLrGiQhX2xMOdC0EY%2Bf6BTQrGKS%2BBzTeEyNa6c4o5AzicVYqWWgUGJutICZcDuIS48q8pzuVLwjCSMK33Q2jwXAo0nINDdQCEslrT5bQ9E3m4F78xg9PxNcXodfEagHvBu%2F61nvcfASy7k%2F9pIZ7JGsbGwC1pOX%2Bu25VoJrGlPCuHn75%2FbNR9yW3GqAyUC4bKHDH65MQw%2Fv69zgY6pgGouZJOgA7AOKmMzQq1veaaNLTwf%2FBpB7KQ6N3hlEivyP2GtMo%2BMYd3E7Ni6WOO%2FTPWa0Oh2CvAvaD5lAemUJiRlzAoAcuCJonKipLu9iu4vtxehPGso9pHfi6MVnHLYs8sgouRKY0m9qiBobJD8WqkrI4q8WR8PqKo%2FFyqGZsLu5n%2FYXQEQhSfLVVXcPip2B%2B%2BT5Ek7b63rcPfBlMkwdSc6M9KvUZO&X-Amz-Signature=5618871835c3e5436564fbf725a509fb1e1fd7ef94e09b3f96532c37da4fa5f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663G7B7CZB%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHhiNVU80BN%2Bjp0fqUMqpyWXAsvAK1ns2c4CiWPQrXgpAiAbnlW77nbWkN7iHGCvN%2FXeE2I7fqtaIXNd8kUE8ZcsZiqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRd7%2BMz3q487TRnt6KtwD2p7QM041RNMRi%2Fql170haIy%2B1Y64oZrlVInt6gFwcMf0tvToxQT%2BihQrmUsCJM6YHXVAjLb%2FaQf9QkFJL5CpQexlZkXmkWD4JxUvBYCxluUGsG3Shu2cSXfWxmscJn0zSH3o3JJhRv3QMosb9VoiISSCmCsBhIhktlLrk%2FCXpMh7iJ6B3gab8n3iKoC0h1o98AsEvH9e54hAe3%2BSuIbviNkB%2B42ned3FaGUeEhxqOqKIIwo7cW%2Bx8oI2u4XY00CdYJOSHUYNMV2WKWoGxwnhG0wre4mWCUgt9TI%2FfziyG8FeNJP0yoxcSQdXNsj4NVi5eidJNiV4VlrLr3h6pzObbAnOZFwemqZXVMlbRs6KH%2FqVQelLW3HOuEg515UMjAsU8HxeKFGC221tFkgemCBFN365S4amlxdCnuaaX3Z0U36Bbnrq5W0J9fl2Bh69KKq%2FMNgzkW3%2FVjtV8e4wD5AHqQMUlSz15tnRxZU79S2TN1vx5KTSL5Vb8PZq2RLOfqtUMOIhT3ZUawo0tmxP2t9M3X1rf8bqE7%2FXj9tWznFpHEHIpp2XnBkoSf8rhJLA5ybrZ54s366g9Crqc%2FeMAQaqjqQi94mTF6PNMeOjB8rgIyw1Lj2aV9%2FBfjfSgKYwyf%2B9zgY6pgHNs3Ut77Ty0tIRvJE5Tt1GrxmGr0WnN0GCYZin8F3VUvDiOSOPi0IQRpSw712OTCoZGtd%2BBTIsYMMHtCqVxVwA2%2FwuS1yoa4eTReQ5XFQ11npdcuQLtJRryFS4Zy6AHVaen2LcB6oUt0KRxgXyaF3xhinV0KOFXsbsBpz77qisLGg1%2FCC3cg219aFIFWtZ9164dwAPtxlYj4dyeIyo9PxE9Xh%2F8b3F&X-Amz-Signature=f1de098c7bb7c6f9a828d24e287668a236bcf2e7376bcfd8bf6f8574b383b458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663G7B7CZB%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHhiNVU80BN%2Bjp0fqUMqpyWXAsvAK1ns2c4CiWPQrXgpAiAbnlW77nbWkN7iHGCvN%2FXeE2I7fqtaIXNd8kUE8ZcsZiqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRd7%2BMz3q487TRnt6KtwD2p7QM041RNMRi%2Fql170haIy%2B1Y64oZrlVInt6gFwcMf0tvToxQT%2BihQrmUsCJM6YHXVAjLb%2FaQf9QkFJL5CpQexlZkXmkWD4JxUvBYCxluUGsG3Shu2cSXfWxmscJn0zSH3o3JJhRv3QMosb9VoiISSCmCsBhIhktlLrk%2FCXpMh7iJ6B3gab8n3iKoC0h1o98AsEvH9e54hAe3%2BSuIbviNkB%2B42ned3FaGUeEhxqOqKIIwo7cW%2Bx8oI2u4XY00CdYJOSHUYNMV2WKWoGxwnhG0wre4mWCUgt9TI%2FfziyG8FeNJP0yoxcSQdXNsj4NVi5eidJNiV4VlrLr3h6pzObbAnOZFwemqZXVMlbRs6KH%2FqVQelLW3HOuEg515UMjAsU8HxeKFGC221tFkgemCBFN365S4amlxdCnuaaX3Z0U36Bbnrq5W0J9fl2Bh69KKq%2FMNgzkW3%2FVjtV8e4wD5AHqQMUlSz15tnRxZU79S2TN1vx5KTSL5Vb8PZq2RLOfqtUMOIhT3ZUawo0tmxP2t9M3X1rf8bqE7%2FXj9tWznFpHEHIpp2XnBkoSf8rhJLA5ybrZ54s366g9Crqc%2FeMAQaqjqQi94mTF6PNMeOjB8rgIyw1Lj2aV9%2FBfjfSgKYwyf%2B9zgY6pgHNs3Ut77Ty0tIRvJE5Tt1GrxmGr0WnN0GCYZin8F3VUvDiOSOPi0IQRpSw712OTCoZGtd%2BBTIsYMMHtCqVxVwA2%2FwuS1yoa4eTReQ5XFQ11npdcuQLtJRryFS4Zy6AHVaen2LcB6oUt0KRxgXyaF3xhinV0KOFXsbsBpz77qisLGg1%2FCC3cg219aFIFWtZ9164dwAPtxlYj4dyeIyo9PxE9Xh%2F8b3F&X-Amz-Signature=f1de098c7bb7c6f9a828d24e287668a236bcf2e7376bcfd8bf6f8574b383b458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662D2WJPBN%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T103058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBv9IpvHH0WzkcAjun0uG7fU8nEn3UtbO8k4k62JqG41AiEA0pwwz%2FzBlhzSBo2%2BFU6ZcufCekhYgQPFmZYn1ZFWUJsqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAdLYE3OviStYabk6ircA8RoDWJvWFRc6exVxRJ7wGKHoih60xdSUn38O8qtWisAsQx4A1O%2FHLWxFJw1aNgY8cC%2FEo%2FMCV29pS%2FRT6ijz4ud2KYks0bI9%2BjRsOwULQkjZe%2BpFQEjJAaf%2F6k%2F3XL0FEtISHnD091BsUfc2M%2B3Mup3dBVGkTqEJHa08r2w6DKOArF9w%2Fb6c1ppUNcy7wxW9TP0zTW30FgdsGwHbMr1pCb0J43T39viS5uykRfJYrM%2FOU0cmvw6nuoZMGygtOgeISu%2FS6S1VNMV%2Bed3v%2FGV7uYPgj2%2BpMwfzIKiQhqgvbbTOXTd%2BgAjKV4H4VjWsmDSE7PTJUAAE7UptZbNQ3dqtY2scKmStJCxsDrzxAhCXWiq2DP9KO5yKXkEu9SS%2Bb52iySBV%2B53NA6qhhIPbUkZ6lwwV9SD5zrS161HiVesD2TqU3ir%2BXPgqPY6ombtJrytevcU75Fa1xUoYeMin6OoMqZQIOYBbvr1gbkhgQ7%2FqilXcnc5bB3vzUiJ5kkovK3sQJvj7wzBjbT21MYfCvDVYAY0zXyVBcdQq48u5ifepFd7JFsDKs6L1xWwxfbtQFQfsWtOtEu7JIImdF5RMPbKd7OBFih9qDBS59EgYaKEW8FdBGg2vHq99v0TEtEJMImBvs4GOqUBn2sbOB%2F5j6EL9clUrv56v0lqEAIGfKx%2FUJGTZVuKxFRa7KUhNa8Mudzkfg3fqfvk76GmTXDOFjs1dS1%2FgnEKxtC96yKLdntF2%2BppczGeurmVrlzZDpgfdsWNFqjltz4ih8qv3DiOYtTYDWCSVlODB5A9ET0s2pBvyb8QyXfgNleLqXIP6bF3KqYBYkkp8pp8PEUu7d74OTEqhpAe4792K73K7HZg&X-Amz-Signature=e16af08c7b7b4643974bac3315d67ba4910dc027701caa2878c1c5160f85a40f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

