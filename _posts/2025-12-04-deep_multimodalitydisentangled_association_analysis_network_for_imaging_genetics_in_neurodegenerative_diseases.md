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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNLFBL5V%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2F3Z%2FpuBhInLirhcaCtKlAh5fq5Sqi92acjzvYCEAK%2BwIgZmOPlLOpz8qCkC%2FP4lSCFZ4xtnCvdz9maDAlCVAgPwsqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGGane2n85JHwmXDVyrcA84VTOaY6uhHEJSSAPHwwvVLCwxFFR4wqZW5ENjSw%2FTzmlSF9pglsY1hLWEEfFZ%2FUcMGLXDlPoWn2DXUGyo6wT9dIqBaLPur80OaBQZYysKtXtGKn%2B%2Fl3zI%2BPcmZwpmmcIm0WxOxmjTqsKEC4CMs2yC6OU5qBqmCH36r6oSj2kY8DOercnou4uPQXtX%2FwPDc3vRfnz31GjIapI%2BXDm8hoX7WNCHXN5MPO%2FZDGXC6FRdsDbg7%2BNZJS8P7jKkJuvoW0Z90USxGDWrMEC3N6IOdOpp%2FSGCLiP3ZjQuLPDzLvnhUqt0qCjtF1eGIlL3po7pfu%2Fj21iirqYy%2BIPEW5oM5OiajwESmCtTTXU6pVJkIUrK9KLrSpVFrAtnKD3c9p9HPmS8x0QUKyBh%2B8Zl1YjSAohEKBuuMAQADhaao2J08yCYQWuUdbu74%2BVU8ENyHYsxZSNhp%2B8Vup0TEeFHwC3Qct%2FDNhrvkrsstodfN4RGTEcbw3Kn5wtK9BiVdsK%2BMV%2BCLs%2BzRKdPZH38FQzNash3WF0JkXlHUU%2BaiyNIDYWXq6nh2f8W9BqhZh%2FWNghSU94MZI3OGgQEEDYg1gbgRL%2BxF2o3Mgyeoaz6z87k67H%2B%2B0BlJqF9hbL3TsF1Zg7IMMPyuyM4GOqUB6sxK5R5NXHvMwdBDhXRRHs%2BG9EFyek2m4OhQoUmlVtjBPDMOPZ3OAb14xkvuP7iTN8LPv6gQwlepSJ%2FpPR7JLBjSAk%2BqubfE352IkfGBvIhU%2B1rLuVUgaxEJ5q4W0cuGzf6UmgmonVJnC3UG8wijj8YXt2Qhr45zuwwJcpK%2BK%2BFX%2BP7kZ9fMwpvVnhYQCD%2BHFkLbvbAIgyIDbnENSLOJCqznTLEu&X-Amz-Signature=61798c7c62bb80c17f47a04cc92cd2f7149c3830e4313554764193d99c5e36db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNLFBL5V%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2F3Z%2FpuBhInLirhcaCtKlAh5fq5Sqi92acjzvYCEAK%2BwIgZmOPlLOpz8qCkC%2FP4lSCFZ4xtnCvdz9maDAlCVAgPwsqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGGane2n85JHwmXDVyrcA84VTOaY6uhHEJSSAPHwwvVLCwxFFR4wqZW5ENjSw%2FTzmlSF9pglsY1hLWEEfFZ%2FUcMGLXDlPoWn2DXUGyo6wT9dIqBaLPur80OaBQZYysKtXtGKn%2B%2Fl3zI%2BPcmZwpmmcIm0WxOxmjTqsKEC4CMs2yC6OU5qBqmCH36r6oSj2kY8DOercnou4uPQXtX%2FwPDc3vRfnz31GjIapI%2BXDm8hoX7WNCHXN5MPO%2FZDGXC6FRdsDbg7%2BNZJS8P7jKkJuvoW0Z90USxGDWrMEC3N6IOdOpp%2FSGCLiP3ZjQuLPDzLvnhUqt0qCjtF1eGIlL3po7pfu%2Fj21iirqYy%2BIPEW5oM5OiajwESmCtTTXU6pVJkIUrK9KLrSpVFrAtnKD3c9p9HPmS8x0QUKyBh%2B8Zl1YjSAohEKBuuMAQADhaao2J08yCYQWuUdbu74%2BVU8ENyHYsxZSNhp%2B8Vup0TEeFHwC3Qct%2FDNhrvkrsstodfN4RGTEcbw3Kn5wtK9BiVdsK%2BMV%2BCLs%2BzRKdPZH38FQzNash3WF0JkXlHUU%2BaiyNIDYWXq6nh2f8W9BqhZh%2FWNghSU94MZI3OGgQEEDYg1gbgRL%2BxF2o3Mgyeoaz6z87k67H%2B%2B0BlJqF9hbL3TsF1Zg7IMMPyuyM4GOqUB6sxK5R5NXHvMwdBDhXRRHs%2BG9EFyek2m4OhQoUmlVtjBPDMOPZ3OAb14xkvuP7iTN8LPv6gQwlepSJ%2FpPR7JLBjSAk%2BqubfE352IkfGBvIhU%2B1rLuVUgaxEJ5q4W0cuGzf6UmgmonVJnC3UG8wijj8YXt2Qhr45zuwwJcpK%2BK%2BFX%2BP7kZ9fMwpvVnhYQCD%2BHFkLbvbAIgyIDbnENSLOJCqznTLEu&X-Amz-Signature=61798c7c62bb80c17f47a04cc92cd2f7149c3830e4313554764193d99c5e36db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THHH2A47%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEsg6%2FAdR3rTboSk5a%2BfHF5eCqvsqo%2FalXwobyPZHiajAiB7RXyHlRl75PRfAYD%2FeqKJtUn1eyApV7q%2Bx3Hl%2BnRcpSqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAasvwh9KORbgFlhRKtwDCFz6HxXfB9YQX7lHCppNKebtj5Iu5Tc29fCLasCL9HBLVdyXWKAyUJ2V7OpdTUfDq1i6%2FQ7oY4R1Wmnhf1jFW28q0%2BHHiNM2xemkTPit8lFPDpgSdTRJjX4SClMZFIqB3%2B4vOGeB6n%2FH2pjGuXypHSFVUFUnzlDWzTyt88zyjuzIx14%2FNPrMvSDqkouhUHy6aNg%2BTyRvbeCwypqWuplGV%2B9iFU2kj0AG%2BTYzwsGE9ZseqOYAgPWqnk3QeqtPhiZyx%2BxJDiDHNsMfiK07nZmo%2BpKIG5r%2Fc0lTIIlvgh4UTNC5FpW5VHTqRV%2FeWymPx3EJGN%2BWGW0QZDzzFNWwvejLlpd29xXtglPC8PyyyYQYJ%2BViDKiLomAl%2F4LSO45M1xFXrBqoSIEf%2BW8S3HrReqxrUfcS41oMpuUAmxo2Ww1Mwi%2Fnd6%2Bm0pKPW0rdRaevX8AGndd07Zvb1n4v2wi9Z8t6fZ0RZ8piSpU3PlBJ0uKGN62dwEJ8Lg19O1%2BTkcC%2FdI3Tw52JOR6hoT24lt%2FgJkxf6NqMDOF6xSoBZm4pyWM0EPNq%2B3mXN2AVgzs%2BkzTJWmaiHUk7IwLOegofbuo1Cwt9r8ZLvZ3jWo1JCj0RFhLV40SEw5c8azHFY6p78Zcw%2Fq3IzgY6pgGmtp71ghEJ3cOwUBFLO1PxVu1JloFaIfUqEOPGioz1YZzdZsKHUrjTosI1jzP27nWuUC8N8FbB8W%2BtcWJ3z1fMQvaNQhfpkAi5XpvMXi3sygpKvUhCJNRmm%2FhaXTmyx17MRXSrSHsfJTzRTkZ8OFzq5m1IHQStWCM0wXnF3Gtq8K%2BSnYhve%2FDUA5FjHbZzqQaNGrxyQ3EbPr3x0mk7y4twLsEFfOgL&X-Amz-Signature=9168c2e2020a920fb0097ed8aa3a29f61c2785321e136169713180feddb5b995&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LX6Q2RY%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICT%2BHZumIMt0rU7zOjrSlaW3bj0E%2F1c31Z9Yr3BJ1Rc3AiBK%2B%2BA8SmKaIn18dS%2BF8fzpDCXXvSyV6TMNBVTsgI5YwyqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9get2PleM%2FSStY8pKtwDPoCxZl1OXAUtOxOFkCgpuxf48GBmPIP%2FRso2iZEPbNQavVWKKeTbLyi9QKCg%2BYpx84%2FaXYj9r%2FyDgJCFQEgqFunFtC4r71Yd2faZMwXXDDYLpXCExRC6iywXVdu2Q1zjZdHt0QemfzMtC2byHYH2%2BuJQoLgO6L9zNx53Ex88TCbvVhbq2zyeMqdxK1q7L2hMoefOYIiD4TdOJ%2BcUHQlE%2BjDuHuidOfLatAfDDDshqURusPpgRhopM2BgEKt7ASxuJ7H7i7E42hj%2FT%2FGQ9gLlEubjMkDSlkhA5I1jLD6z70xwVe2tjjfzxvb3ZMobcokSA%2BZmKdGEpS%2FDv%2FVeByem1AP9bPbpIfG030ZK%2Bk8Ne21SJ0oG7nMajsAmhUWKVVlIE%2FjfsevncDnSxORMFOnrM62QD0vF8AgRBKL%2BU%2FHu8FKrSLLKSE86zkggSeNExKLJ0Xyo2pW%2BHcGse%2Fw5R45BHE5W32vrB6kJGBHqpFyCVBtQa12z3yTbNb4EhYqUyzlViMNuN47d6MsVtCyydQjxXEuK5tyNX%2BUgwPfUROLj8hRCWA8XsF94zwlz7kEWMphU4bMLVMZKIj9nN12X%2BXOSHh6t%2BzkIMKAv4KrtQKq48tEGFhoKYufThcxl638wv63IzgY6pgHgMhbdB7dhRRBykXEU3d3ZLE76rqcr%2FQNZ6o6CRAMWevM8MteYyjtGc9zc4bA7mrPeBenbMWWFULX7zksdUdFHlq2Ual3LmRcZ3E8%2BEC8JoymsTo9HDcxcNK6ozvYvhnHzv4w3UWQ%2BiimzpvBICf6DSjdxDmrqmibTcyUcsg1dfkenBkHc8J3ZJpEz3v1B5e4xbwuKEGxMz7RSAaA3R7qKRr7iZv8s&X-Amz-Signature=b51f17b31d3fbd6df9f4a4324b7d3cbb3aeeab974eee7bdf4c0ca49de7a48e78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LX6Q2RY%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICT%2BHZumIMt0rU7zOjrSlaW3bj0E%2F1c31Z9Yr3BJ1Rc3AiBK%2B%2BA8SmKaIn18dS%2BF8fzpDCXXvSyV6TMNBVTsgI5YwyqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9get2PleM%2FSStY8pKtwDPoCxZl1OXAUtOxOFkCgpuxf48GBmPIP%2FRso2iZEPbNQavVWKKeTbLyi9QKCg%2BYpx84%2FaXYj9r%2FyDgJCFQEgqFunFtC4r71Yd2faZMwXXDDYLpXCExRC6iywXVdu2Q1zjZdHt0QemfzMtC2byHYH2%2BuJQoLgO6L9zNx53Ex88TCbvVhbq2zyeMqdxK1q7L2hMoefOYIiD4TdOJ%2BcUHQlE%2BjDuHuidOfLatAfDDDshqURusPpgRhopM2BgEKt7ASxuJ7H7i7E42hj%2FT%2FGQ9gLlEubjMkDSlkhA5I1jLD6z70xwVe2tjjfzxvb3ZMobcokSA%2BZmKdGEpS%2FDv%2FVeByem1AP9bPbpIfG030ZK%2Bk8Ne21SJ0oG7nMajsAmhUWKVVlIE%2FjfsevncDnSxORMFOnrM62QD0vF8AgRBKL%2BU%2FHu8FKrSLLKSE86zkggSeNExKLJ0Xyo2pW%2BHcGse%2Fw5R45BHE5W32vrB6kJGBHqpFyCVBtQa12z3yTbNb4EhYqUyzlViMNuN47d6MsVtCyydQjxXEuK5tyNX%2BUgwPfUROLj8hRCWA8XsF94zwlz7kEWMphU4bMLVMZKIj9nN12X%2BXOSHh6t%2BzkIMKAv4KrtQKq48tEGFhoKYufThcxl638wv63IzgY6pgHgMhbdB7dhRRBykXEU3d3ZLE76rqcr%2FQNZ6o6CRAMWevM8MteYyjtGc9zc4bA7mrPeBenbMWWFULX7zksdUdFHlq2Ual3LmRcZ3E8%2BEC8JoymsTo9HDcxcNK6ozvYvhnHzv4w3UWQ%2BiimzpvBICf6DSjdxDmrqmibTcyUcsg1dfkenBkHc8J3ZJpEz3v1B5e4xbwuKEGxMz7RSAaA3R7qKRr7iZv8s&X-Amz-Signature=f0de78e07a5583dc464795f3252b8deda3516aff3d0f4df4e0ae721e0bc32b36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SHPV4UN%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNcvAfrnccRN64VuKwyUeLgN39vgNtA%2F7EPBGMM3ZHAQIhAKpGkcgfpuxGkel0BWdySEKYtkytPY1WPod%2BjoFrsZYpKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy3MMyv5MGBudw9eiMq3AOL1QMJwtBivc4gqLvj8vO7dVtCNCa4BggOmqb6fStAsXFVuL%2FpJ6%2BXNIT4fFJtCrXAH%2FAPMrWfg9IFT6hRE1Yn921f4rT4%2B4GD1xMIgBbcBv96LFHz1YeS3M%2BnK0STCfu2F7kVUMcTZppirN2PJf4qUW%2FjeWarU1maPCy%2Fig8louPoMLJR6PDorji%2FEesOzkPGwhf0%2F%2B%2F%2BlBdhv02eiPv52mPkFXpvTWusIS5%2FoC67COj%2F8NxvpEjD8GAnQ5KHSCO7qG0YQILBtPCacb%2BXZmrTvcJQT3r5%2FS3eOpjGNLzd1uNm%2Fed8pLnzNgqzxQafrcY536PKuPtZncjhczJcu9PI5DpSAUWTk08kkQnGPljNytfutYjmgzDu2SwguSThXxwlnXcTh1KR9C%2BCS69Sr7roR%2BTJk1HZ%2Frw5mmLX%2BaNz6lYTZdYH%2Bw27wKAnQJV25A71H62msu%2B4TV8tu9gLaPBtxgA80DupClAtnAxOSGYOO7682dLTfhty97UiCoSPm1eWpvUvgqnwf2iev88Jd5%2F%2FFertYHOaZA0FVtPxttJ2uMw7xFMb1FpAhFb3bBOYAWqdpoOOOjtj2zPgwfl2yaa1pKeXv8SSGXRCm97txb%2Fn2IYNvsxGa6klrPKBRDCFrcjOBjqkAV%2Be8C5cTyV030Wz4bJnG4FhUetlypuAR%2FLMNWU1hL93jPWNsaG5uN33VacleRB5A6ZzCnEP49hyQ247sdIIRuuPl7MxxMSQRRFXUrkvfljZNrjyMe7xq6wBiWh7%2B%2BlXyYf%2BiWabtvzwvcTSxABOWFAok5FBMm0do%2BojsoHzWoHQtcOmg6kJpw3OlBvQQ3CxNYgVs3gwFpxsjt7oXPB5n6dbQpWr&X-Amz-Signature=a1c07edaa437acf939d38b518f932a89bb7003a05cfd8073925165f39e106449&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OLSS56W%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDW14qBjkX7IgT8bDfZ6KOc3zA93X1vw3WwAENI10yTmQIhAOPDxWzIS65xHCgwby3uJl8INj%2BYCz6wb16n1xW4LS%2FmKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxBDwEZYyyIdV0Guokq3AMjtZV5SwtjA6bmflfsmhEZErQPAwzcQWUgkmfvuZObeNOeIB4aFcE9AkiBibWHK00%2B2123rtR7UT%2Be7htr3ntYkNKkNVmYZdPfo%2BjQsrnhC5htXBjUf9eZxQBrfVvG6bMkxwtCQ5ZsIGprp9hluFbDjREgLTgCuynXBXSyp81%2B6xNHRgAmnGGjRc8al3HrOUuhdtBsY0qRnBS1MzICTgLEmSXArhtcmFmu0OIJd%2FSVV9b0QOrwKeU3%2BXQOtCrspTQ69e0Q0FbjC93yFBxnQ0L9%2F0sCkDFo77lj9M5Gt%2FDc%2FdqAk7w8WjNJnkFbXWTZpHQO9oNoToj9QAywEJnRun5CK76d5EUUqHBmL7jMAqu%2BP8PfrthqyMr4EHue5AL1ZBtlsfUE4qA7NKt%2B1sZuOU%2FwS9qHLC4tr0IUCsTeGwyX4SE7imhLYwkM8kS8hhwu6q0L6kukY3ZkbARk2p62ShctZxj6CBfuepxUmim4vO%2FdBv0fSz6KJB%2FKMz%2BbGTswYeaTA6jGtr0%2B2%2BZrwRKSTx6Y8c%2FHuqsrZkuBi3Z8geCXQ1q5J4%2BtcnLzjIRnslumZcRLHNnsh8AfumN5FKkCIVyoErqSp5s6M0x%2BVNv0gxnpsgHkvjv5f5pwWnWxDzDZrMjOBjqkAdFNHbU66gDVLFkBwkkLBboIWN3zZpMFOHd6C8cq9P30xwuSFg3jjv5DfBjXZZuLeKA2xjj8SJeEILqVGZydAsxR%2FG8lohVJBqpyCBVwAHEGO7UWSe1972MurEB%2FmzvjZvirxupmlzMusC%2BhuenbuKo%2B0%2B30Dqqr7%2F1ZBlWuteasN9yHqdwWQKAoQOboFJ7CNt%2BSsBsjrgAOsCZSyAVdiVyjcP2V&X-Amz-Signature=fad168b429c186043b80dd4462ffd7c45be714e995f040d15b060f6ebd03f08e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GRSHO4C%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC53zJY6Ut0fO%2BeoMA49XJFtBpcZeocLqysP85VHemYawIgGgnKZs4x1l5whwnfatZCReM533d%2BngOpYft94YlYLjAqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNUtJ7l92QMhe%2F8dgyrcA2EyGucJaPfWA%2F%2BLo3itIo22FayuUwk5KoyFboUvm%2Ftu%2FhPsUqHZpS0q%2FqUW6eSMut5v8vMXTshYqf70CK6uwtm2%2FQ3bfcwQxbstQfwaHFogjGHZTSWQGjQNASieIJV%2BGMbCBn4%2FtsvofKmOVbUU4PVd8Gx3a%2FJkLlgNKJWToUgdBJ2s1WTNnUpo184xa6qqjNI%2BHx3MBDTyzfLwHShQhbA%2BKEItclA8kFbgwftexOOGmAG3n1qlFH9W5sx9X9%2BdSjfrz0J%2Bmnrjosyo%2FFhbTexdPcGV4hir%2F9BjTI6kQdu3KbTLdv29RV0A7nFyGQtA0Si0CNo8wQ30KzqOwvIKStK2CgxDza97Yf5pPo5BzO%2F9NHiYuITtGAGJf7SbB6OessNfwjNclJWXv0ldLNYmJ0ESoC8h2UAo93ZUPUkTWamfMFYOajDew5TK4ln9Q%2FfsAkT920byMzdv8M1SJdUIod1h84OEJXRrLks9RFhryl8W5gyxBXlF0rOBRlUhHsW3nWQhHHbUWoO4GDOZ7SOBd02JmGkrmY0B7TAGh%2BSt793RGMNsJsyuKYUdrOcAknbr%2BXXrQElPAnJsIRfiPBIpg49%2FDNtJbcXPkhuY0%2FnNhXMu4wIDKQnB0FAq2bmxMJetyM4GOqUBEomwnBDQoITQ6WYjlBgrSQe%2FY5s7OfbvS%2BYB7vFw6E91PGK5d8thrr9T7dXcNDailinUq61DjyRNhUlWixkjJh2jLE%2B%2BQnvsoGNWr1q89z7Nto5OmF%2BK8eHg6iSRfOwPfG45xux3VmLXAZgE%2FKK1sXJH0dAk8JfRHGQIS8ucwRRETe8e%2BBVHdLslFD4uM2hXstFAf5eEk8EV1hv7ZLtAYeFYZlwO&X-Amz-Signature=a3332738f1b1fd9029dbde9f17193e1fcc8d8503f123853f37fcc9a3e0b394b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PMFZSD2%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC94%2BB6%2FlnqP5p%2BfipMjUg04xY5cV8gKLk35di%2FTmrBMgIgUFVL1QxTbtd8du5PKrcPTM%2FZFgUtY0Xt%2FL50iZo1DkcqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIrCN9m2gobj5%2ByMNSrcA4rUsixyFlZ3Vvsc5YkJpoMk9eB%2Fa50qw%2BeDqZSGTED68uxGGLa7bhz3ZgPkV2i9ZK2XxIb3l0P7ZKFn8UUEdEiZ2OHihjsU6iMAKLaA9W0M04EIiAkU4DwzVpGnXdE8dKaQcp41BHRhU3VeMAB5Z0KXLVQeS5JknsImNMfV5JoSpkcAe7YjuxrZwroqvfK8ExdIYsWG%2BWwTbcG8h2kYpaHNGWsoqHaDKxw4bbQzLTgPTaIU6biXzihO%2BHEvukEi2OczcW4POyYyVl8ZAhKHoZex80wWqBvbwR0GrZKq2NvtfUonOUc4fHSQ%2B5C%2BN309%2Fd4qo5onFKww3KeaYSjeChTtMgZNx3d7fqNpNS1By7ZuPHYahL6XBKbHhqK6GokH0Ue%2FMGa0lumV41V5yszDyYd7ylw9SjvnFGf76ykYXpkqpJ1PWCqlrHdDUbQeUEPZxs1vvBVCVB1J%2FSA%2BE8ip5bKRUNIS3mP1TSoPsQ7AH2VKC6ovqXCnrzORvq7CdgOdUwkUNOCxd%2BQ1Y1H9f%2BlSmAB6uMyi5XX3xjrgKiPLPeA3yRmnPckgN57p7FSNTE0Q3caMFGahNvG9AuKfgTtYhXuGc%2FhZ4rWAD3WivuH%2FWr%2FqbRWoKTD1Lr447%2FMsMPuuyM4GOqUBkq03gyFEedIwjPEwW3LGpgkuxDSuJ%2FbSjn38AKfREkT3ZDaydxkmDxQQNIRQIfXnZbn6jOD1QF0zKbEFpxfkdAn4%2ByQkRUtp2hVJpaqK0Yc5j5noSN2ICsALkwFVnGY4ZftA2IqF1TxWQU0rVmxozcZEKguw7vW9fL7BNqu9iuO8K44hPGPydg84f755VyiTvnE7akf1X9VWkf1GaKEOJRbgYX4U&X-Amz-Signature=50007561d1583052045102b8b583428aa8b0d6e83cb351bf27b84864495ae476&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PMFZSD2%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC94%2BB6%2FlnqP5p%2BfipMjUg04xY5cV8gKLk35di%2FTmrBMgIgUFVL1QxTbtd8du5PKrcPTM%2FZFgUtY0Xt%2FL50iZo1DkcqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIrCN9m2gobj5%2ByMNSrcA4rUsixyFlZ3Vvsc5YkJpoMk9eB%2Fa50qw%2BeDqZSGTED68uxGGLa7bhz3ZgPkV2i9ZK2XxIb3l0P7ZKFn8UUEdEiZ2OHihjsU6iMAKLaA9W0M04EIiAkU4DwzVpGnXdE8dKaQcp41BHRhU3VeMAB5Z0KXLVQeS5JknsImNMfV5JoSpkcAe7YjuxrZwroqvfK8ExdIYsWG%2BWwTbcG8h2kYpaHNGWsoqHaDKxw4bbQzLTgPTaIU6biXzihO%2BHEvukEi2OczcW4POyYyVl8ZAhKHoZex80wWqBvbwR0GrZKq2NvtfUonOUc4fHSQ%2B5C%2BN309%2Fd4qo5onFKww3KeaYSjeChTtMgZNx3d7fqNpNS1By7ZuPHYahL6XBKbHhqK6GokH0Ue%2FMGa0lumV41V5yszDyYd7ylw9SjvnFGf76ykYXpkqpJ1PWCqlrHdDUbQeUEPZxs1vvBVCVB1J%2FSA%2BE8ip5bKRUNIS3mP1TSoPsQ7AH2VKC6ovqXCnrzORvq7CdgOdUwkUNOCxd%2BQ1Y1H9f%2BlSmAB6uMyi5XX3xjrgKiPLPeA3yRmnPckgN57p7FSNTE0Q3caMFGahNvG9AuKfgTtYhXuGc%2FhZ4rWAD3WivuH%2FWr%2FqbRWoKTD1Lr447%2FMsMPuuyM4GOqUBkq03gyFEedIwjPEwW3LGpgkuxDSuJ%2FbSjn38AKfREkT3ZDaydxkmDxQQNIRQIfXnZbn6jOD1QF0zKbEFpxfkdAn4%2ByQkRUtp2hVJpaqK0Yc5j5noSN2ICsALkwFVnGY4ZftA2IqF1TxWQU0rVmxozcZEKguw7vW9fL7BNqu9iuO8K44hPGPydg84f755VyiTvnE7akf1X9VWkf1GaKEOJRbgYX4U&X-Amz-Signature=321cbed55018dd981df2c54e0d7c01e3fd3c3fa4c9155c2b047b6d93f6699a04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664V7YWUSB%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE7ouC1GqgoNulrPRqi17q5sTEnBQpTTIIjqCqn1Zr0QAiEAlmEXhEVWoe6Z6lUGL0KzA4A8VEk4zhGyNhc90K3QQSYqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMElZP3S2XkKS8d1cSrcA3gEX4ZiIfz62C%2FtRbyiF2%2FXcKaeY2hzKaamjO4ragyWztfzwLd56FuvNxobLoye%2FUvYA2S1FR6%2F%2FhXVkxY8iEMXO2FzqsqxwhE9xoph7xbmuo%2BiPbhM6wIt3iaVcNObJal%2Be%2BuXwyOj%2FQ0w3yttkW0QcDK3bHgH8l9aYeZgglT3BMyRNqMKRToTC81bzNVPw8CDBYfuqqpAoK7l554XiiF0HxMW0sHmejKSZnNoqlFR2N7D0kR2DnL3h8y%2Fnh%2FkHrWShFhhgB1Hu2aCxD%2BIpaaY1tRXEWoDjjeUl5ABBMTWXxDu4WWwfVV7mkdyPYGAIYP7Ng9toN6Fuv%2B3R4Kle7F5y45VboZBbOl0PKA%2BZBMCuyfpah2Zq93Bp5WoEJ2Hm18hjjcQNNLaPod5jQvzXdtEgdASgy%2BOiz8eaD7rYPyMXXjL0xju1f2%2BNHwBi%2BokC6xqgrgjkzPpVEQ8MDyopjgsgL266918dGg346SBXZffGxWTNpNtlfVQrisryenlO5wwzaE20AIGDHYZ4zzztkgCa63VCdPDXiIwFdpXN3emWv3HgiM9iuJdrF2PiKkPL4eqxvmkZcCS5kVhHCK0En76CBA13%2F4KgbbHdjOzAp2SJS9sO9MJw7zFNifoMMKsyM4GOqUBivBVd37yvT9Eegp379FW1npUrY0w4w8z%2FXreG5YqxX%2BWnPdJFdrHup2qVGvZE2hNlqahgosRcYS4qZTY8PPvFYZPqDI1Zw1aNrHSHABAZfjP8PZiml%2FSaqV5ueGbx9L9GJ58lT7UokNxiAQtop0RFlKGTcZvBQdHNroUXYeyuzjaNVn%2BihMk%2BkAvEjA5xeb9GW3WMFdTq7Emc0rESohVQ9VYoZ55&X-Amz-Signature=510b621e10e0ea478552496263d31a1eb8927edf98402e0f701d012817d24aab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H267X2T%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHsvO9%2FkUIlFvUWggpA2Ey9m7CTz5PQgYukrmSJNJ5MkAiBmsm39ESlsFvmLLMNlcWPwlhTmk2SsK8Q%2BGMb5zQADjyqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYOB%2FwopSBL17wPu8KtwDcu6ODwFY1OxCeVuHdtxQmlckotCVCWiyQmaydGgx33eY3DCBv6S88X5nwRb08HpCkT9Sq8LDCWbABTrV8W3nnWq1fo09RnumxGyvP6PG4g6NE9eSs5siyxgNaNeLvc66BinBVJEfyBMBgzmo3NXESwLmVW40jxoqWRMeeWJGIZ1Z5VR63zuMXtOAggrWj%2FXAi8R0gQ91%2BdDCcYE955SyCyQ6pB1M1GXh276z3Sgrvfi5hJkqTp9BcfdxADXb71j4ub5sWZeXak5c%2F382YnYLaz2gmL1y%2FHfP2Umfyq7MX8c%2FQ0Nn5bZ2KqcI5A45jREANjX38vU1pTGH%2BNYAHoiiVUDK3tMaaWrDhNEmhf5ufReAes9Kp3c8hq2ihIx%2B9W5IRbBCoR7AHgPL623k786kAS%2BjyVV%2BvEhi3SKqpCbNwKjPfL5FzlGBGTE020n8GZSFC6OMGchAdHeLiya1ITEDNvX0RVRNAhHlIuKPclNX20FSVesEIQ%2BHSQWUVrfzZT7u6jT0ks4%2BTUW%2BLfmlh5S7%2BNR06iIcoDia1qi%2FpNWM99ex6uddivlT2nSWZpa54sdUrvcVETUm897i1SLk5hEg263TsIX1%2Fz7T0y6Wi5LdpeqmQ8j%2BfUManWmmN6MwnK7IzgY6pgGSxrBNgsLx13Q3iJ5M9Mebt8OTdp%2B%2FaFJD8ICUfk9yUHk7hZI00%2BcZFoDSMqZWME1ZNu0Q5BT7JETykxcQEKYyJ7M6QASVgYE%2Bscf81p9C%2FSjGh3OUFW14nAW9mgG1CoxKMJmMNK3b8uJEF%2FX5MrH8SfiaGvAzO%2B8b0aRHYR8B6nQObRZRdSUR7D93qqzSY33XTunZQqKJBguqFr2pHN2h9VL3p2hf&X-Amz-Signature=592888464448895fb48d35cb795cd49dd7f4c839daffde146c54dcd85d11e4c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H267X2T%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHsvO9%2FkUIlFvUWggpA2Ey9m7CTz5PQgYukrmSJNJ5MkAiBmsm39ESlsFvmLLMNlcWPwlhTmk2SsK8Q%2BGMb5zQADjyqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYOB%2FwopSBL17wPu8KtwDcu6ODwFY1OxCeVuHdtxQmlckotCVCWiyQmaydGgx33eY3DCBv6S88X5nwRb08HpCkT9Sq8LDCWbABTrV8W3nnWq1fo09RnumxGyvP6PG4g6NE9eSs5siyxgNaNeLvc66BinBVJEfyBMBgzmo3NXESwLmVW40jxoqWRMeeWJGIZ1Z5VR63zuMXtOAggrWj%2FXAi8R0gQ91%2BdDCcYE955SyCyQ6pB1M1GXh276z3Sgrvfi5hJkqTp9BcfdxADXb71j4ub5sWZeXak5c%2F382YnYLaz2gmL1y%2FHfP2Umfyq7MX8c%2FQ0Nn5bZ2KqcI5A45jREANjX38vU1pTGH%2BNYAHoiiVUDK3tMaaWrDhNEmhf5ufReAes9Kp3c8hq2ihIx%2B9W5IRbBCoR7AHgPL623k786kAS%2BjyVV%2BvEhi3SKqpCbNwKjPfL5FzlGBGTE020n8GZSFC6OMGchAdHeLiya1ITEDNvX0RVRNAhHlIuKPclNX20FSVesEIQ%2BHSQWUVrfzZT7u6jT0ks4%2BTUW%2BLfmlh5S7%2BNR06iIcoDia1qi%2FpNWM99ex6uddivlT2nSWZpa54sdUrvcVETUm897i1SLk5hEg263TsIX1%2Fz7T0y6Wi5LdpeqmQ8j%2BfUManWmmN6MwnK7IzgY6pgGSxrBNgsLx13Q3iJ5M9Mebt8OTdp%2B%2FaFJD8ICUfk9yUHk7hZI00%2BcZFoDSMqZWME1ZNu0Q5BT7JETykxcQEKYyJ7M6QASVgYE%2Bscf81p9C%2FSjGh3OUFW14nAW9mgG1CoxKMJmMNK3b8uJEF%2FX5MrH8SfiaGvAzO%2B8b0aRHYR8B6nQObRZRdSUR7D93qqzSY33XTunZQqKJBguqFr2pHN2h9VL3p2hf&X-Amz-Signature=592888464448895fb48d35cb795cd49dd7f4c839daffde146c54dcd85d11e4c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655GSBVP5%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T082902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSHeiMFwULgiNBwiA1kS%2FQqY5bYlV46WI0ZGYj0%2BwtUwIhAMH73P7WeUHhepqqiLudE2nriohI%2BZXa99ibgdDoTBr%2BKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwh6WgwRbgnwvgx%2BZMq3AMBn4hzE50dpAgfAw%2BN%2FGEPU6ZMwtotGKqfhf88zyDFmroP9%2F%2B%2FstXoEloivjH25jgWO%2BMJQ7vIdE8vx%2B4W4OpunG4YPprmBwSUvTr%2FNqK6I91YsuAaARq%2Bj7ALFkQdHMAQQj%2FBY6V%2FA9UMXK9BR3Gr605C4Vh8NfgNzs7f515QX6QRQ1k3xLGuHFvRXcWv49sHnkH3LY7l35Cqz9XlH6Y4pyN77NZO9p7EFOPwQlv0T%2Fk9Q2mS0w%2BU5OeaGKWJCFtR4jHPiKy6cJcjyskbWrBMG0hA8BT%2FdNxo5jpabyERvmpYZdkxSlcNeY5%2BIO%2B28JHQ2rN8LsSDwFM65J1RKbYvc6MnEzmUhxM9NTc6rva0dJQ04kBevHu%2F8cLQlLc%2FUMIZX9pQ%2BeZxezWjYFm4nBufStR71NYrTY718LvL9AyjM%2FRBPbOF20upy7asN%2FUMTKy%2FaAklcAkoeqEvsKGzHjybxH8MMBBYDLew9DKUj5cvr42xauYMN8RLms3s9jJT8%2BaSxirU3gnionQhwNcR9mgqImr92uRIlYABFafUILQxmJcHeL3Ld13ovU8w90YWAvhUbBqrtFSowZohaKLeIwC1HUaIk8yI09kCF07B5Tly0IUjNhDXQ66YHkmm1zCWrcjOBjqkAXyXnKFfbDZ5NmL9BOvDCcSeCDMXUReyfqhQubRmSbS2RhzRw%2FGV3s7BiDLNepft2f%2FCCM621mPSiNsldlQVugcjP9QMqCadeN7S0ZDBG9k0C8%2BtuwOlIgQJGGpuSOY60OgDGpcjsJP3%2BBvrxKbxIY3kmMtx1ddLsPOjgKldUkLyoPXikGs91H4CtjYFPPKdPdkDKnjFZDJOkFDHi0L7de%2BvfxOk&X-Amz-Signature=62aaf15ff198e59880186623ae679f61b129500d5cb0364b0491a54053dad79d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

