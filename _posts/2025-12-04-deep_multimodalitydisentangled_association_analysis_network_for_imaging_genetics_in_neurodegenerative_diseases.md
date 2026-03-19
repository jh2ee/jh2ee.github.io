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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HKKVL72%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDt7AE%2BAbWw90%2FmaDQHzsjApNryaKcPxiEqKp9ZnyyiiQIgEwAZLa6XNBhEDkiwOoF6D%2FuJnRyCUYTofbKb2%2F9XK%2FEq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDCFRCWjVkzw3Ymee5CrcAwOphxb8sQEbunNYY6TvjAjdfCb4uLMBdhzezdEjjrTBAvcL9lMbW%2FKYql7RvPyHLfM0Jwv9LC7RhPpUBs8fj98t9h2VK%2BhXpXSwq3fM4ttRhzkPXw3M1fAeGMImbB1mtsuz22en29FCsZwicvzudwuGT15Qx3VPKS0zc3P3Ce9VbXSRXzI7qizEhd6PqfJ62x%2BRnndHbwvoaiBsDBu4%2FemlOnUHc%2B3gvtZdlLR6HANl7lbzyd%2F%2FUi%2Bv2V9tZrWDtYoOIqeGAN%2Bs2TaRg4TS%2Bjc8gypxC2GQ5I27GheD1VaRLy68hiM0GnOuxPKX%2F5fdHYU11JUhAx0rQNK5uIA8WNlvGrs2nmXSMvqleG05kQnG%2Be0G%2BotCBSYIwsIDfSn4f25JY2p0Z69FCePHy5ENXN7sRl%2FZrXDrsChDGRwIbLFzjzPwZ2jbb0zMWZCow05bpH0n4alVK9zJofEJ3gy4mSGhm3AtUMZVgXfB7cvTJWwMOeZRi7iOJN57T5qk2XaIp9usEc0KlXbrFBnGLvciTkLi%2FepcYnJCublXEWtVl82fpcL0C9yq2jioQpstENPuaob%2FcJwFfZKILbSRRB%2B9XGFVfkgtlKJGfVtrE%2FwlqsApmFj%2BQnQ%2FfrVIj7ldMLGk780GOqUBwk2vBxtcPN4fRNKTGQ9qK4Vp2iShzIgNjXa4tpUAbKBApD%2BOst9WOeICn8uTb%2FLVJi6u4h9s7iKu32fRjNsVqlPhjmfv0Bk7hetupaON0%2BVyt4KhmFm36sy0OmZA5Y3o66bXtvamPzRzVZFEEGPjG0fgOD9XWY9SsQHopeBEoDYq3wMFNjId6LsJNzK%2FHb01D2kG8Ejhp25G89FPIX2QgA%2FHswZk&X-Amz-Signature=c7f8695db9be9d48f029254010721f653e52f9e097964e8a956782745985e739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HKKVL72%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDt7AE%2BAbWw90%2FmaDQHzsjApNryaKcPxiEqKp9ZnyyiiQIgEwAZLa6XNBhEDkiwOoF6D%2FuJnRyCUYTofbKb2%2F9XK%2FEq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDCFRCWjVkzw3Ymee5CrcAwOphxb8sQEbunNYY6TvjAjdfCb4uLMBdhzezdEjjrTBAvcL9lMbW%2FKYql7RvPyHLfM0Jwv9LC7RhPpUBs8fj98t9h2VK%2BhXpXSwq3fM4ttRhzkPXw3M1fAeGMImbB1mtsuz22en29FCsZwicvzudwuGT15Qx3VPKS0zc3P3Ce9VbXSRXzI7qizEhd6PqfJ62x%2BRnndHbwvoaiBsDBu4%2FemlOnUHc%2B3gvtZdlLR6HANl7lbzyd%2F%2FUi%2Bv2V9tZrWDtYoOIqeGAN%2Bs2TaRg4TS%2Bjc8gypxC2GQ5I27GheD1VaRLy68hiM0GnOuxPKX%2F5fdHYU11JUhAx0rQNK5uIA8WNlvGrs2nmXSMvqleG05kQnG%2Be0G%2BotCBSYIwsIDfSn4f25JY2p0Z69FCePHy5ENXN7sRl%2FZrXDrsChDGRwIbLFzjzPwZ2jbb0zMWZCow05bpH0n4alVK9zJofEJ3gy4mSGhm3AtUMZVgXfB7cvTJWwMOeZRi7iOJN57T5qk2XaIp9usEc0KlXbrFBnGLvciTkLi%2FepcYnJCublXEWtVl82fpcL0C9yq2jioQpstENPuaob%2FcJwFfZKILbSRRB%2B9XGFVfkgtlKJGfVtrE%2FwlqsApmFj%2BQnQ%2FfrVIj7ldMLGk780GOqUBwk2vBxtcPN4fRNKTGQ9qK4Vp2iShzIgNjXa4tpUAbKBApD%2BOst9WOeICn8uTb%2FLVJi6u4h9s7iKu32fRjNsVqlPhjmfv0Bk7hetupaON0%2BVyt4KhmFm36sy0OmZA5Y3o66bXtvamPzRzVZFEEGPjG0fgOD9XWY9SsQHopeBEoDYq3wMFNjId6LsJNzK%2FHb01D2kG8Ejhp25G89FPIX2QgA%2FHswZk&X-Amz-Signature=c7f8695db9be9d48f029254010721f653e52f9e097964e8a956782745985e739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WW6CLBRM%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIFJTRIXQPB43F3NqukYDu%2BRhJTxsFfd3FPjQLOumLefNAiBOQKDZ%2FQnjJxM5EkOnCM3NPfOlShJxSOaAAKZhqa%2F1YCr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMCrle8Al%2Bds0dQZPPKtwD0fOsFFSkTyTtRgywnRTHQM9oWnnF7wLx16x7Ozhw8IYxb8iC7rg8Iywy8ClEr2bdwjKKKGxtmEW%2F%2BJtHEbaXCw%2FF7zLPGP6CMsNZkL2Vlhel2WU3mBmJr4fpeBdb96xqb4osx2FfVum2rOkAo4Iz2hIlqEuKCZevH5fUwL8Dm0nlsphhnxOkGf9NWluZH7%2BQg8BTD9UekPPciyT%2BnbR82TnBmJbgnGYkmnOPDX845HfAT6QNT4f%2BE%2F%2FRX25eWkRpC5vYXbvsNaNqi9vpW2qjNOGMnSUHqabEEPN%2BRbrtNEYDOj0gvNfbXTsAt31i%2BgqBTFQ2vaBIe%2FVg4pb6Ybjmikn%2FYnKnIzv%2FUzk0Sxjw%2BkFvWVxvfBwjlNRsM9I6%2BL7C5wRi2pn6joXZIYtDCVLWNHWPotrSrEqfejKKac7flCit4v9DGmlLAILeyy4P9LG67rRicYLIrhOTWBe%2BeKJG%2F%2FURuLfppfOQeNlqCgcsBliXC3VQUGU7SyVGT9dsRYVB%2Bm6MH2JOYSH0i3nBMWBDmBB05m%2BCbXD1bPV4UYHu9i%2FjZMa7SAtnStgYpMzx0orVPHh9Qo4ftRXSjgR5TPBQ%2BwyMx3ObU48S0FnEEhv9oqodi4hPKViyE%2F%2BNHWgw1qXvzQY6pgFwrMDy0V8rhWUeBKV7DmkEK33re2iL3v%2FK7h0LNIQ56zzgTq0YYXnGHvJmKDyNvW8QlCe%2BWLhYFRJBJNlzpZgEhtrJpV0yA3RFQEh9sY6mqsaxF8BbtxOjC2rghpxqBhK7lFxvywRrdaXB23PZrCe43a0OFzy0g9mrgnZ%2Fr8tDybR%2FUY3Hh%2F5HYCvalfgO7yZR14%2F5RJbLv8lu3DNeJrLDpib5wINw&X-Amz-Signature=8c220394ca900d1bcdcfbe25c1307baab8e41d9a5570ff09d7bc993353793700&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XPQIDPT%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCthZYPAHqVNDgNA5sk6Wa5l%2Fk645PycI8mr6uwxWtisgIgGSDz2LXMe%2FnAFANWeKFs1TTclJcvIMaDwzlUD6RqbSQq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDH3JWat3kWFKVlw4mCrcA2kaskSKcdbyUUdp%2Bl4r0jfRZtVeC%2B0Hesiffq3QFdr7THEgsZzcAgPeLPQw1X%2F9ThbLVqL9A%2BbP%2BFZyMGjccvAdtdnYEupGgPJ08GIcpfIyX%2BV1%2BNtaTnQ%2B4Id5i3LMKMs2KpbfKZtwSLdEyTXfVZXRpnUA9SsasRrGSE2oXqomo9MTdfDi%2BpKtTX%2BSn%2B3AqpvvVWc08vPxZuDyp%2Fz71%2BCqUvujc5djTp%2BWJxmvE4YyiWfg2qauU6WdYW%2F7dbxjjfyt6F%2BfukLSNM6Z7qsk3dUJTLiB%2BOqaQIBPV9SWjmgtWa%2Fk8Y9mjgqA6zTTULchf2MITUGdDxGuMXV833JXD8KJ8gB398qaiL3wxNnRb9IROyCRSdY7wm5fmX1mLJl8nmncLLHyoyNt6f3668c3TgLMAhBq9HatPsx0EUpfww%2B0ykt2H28XASVn6GkpC4GkZlV6Cqf4Ssoc6UC8NviVXUrQMb93pnAdQbuxYniWrZxJ9SRDkw3TnGImRdhSPWVVib6ZS9JAkhcX3odbyH3BQ0wwTWXjDKwtTAkGtubXTEDbW6CkhNt3I8tdJsDARUIKrB8rZlocnqzEchHE8my7UrRj%2Bf5wS7vTyiMgH8goXIdWFRViomnGjFQkCk3cMPWl780GOqUBASbH%2F9nSqgsZbLHYjVkgMmoN%2BEgBcX2HeLKveGroR5PJ4vtRPIEXHo26JNN8GDStdL4VO%2BzcVk1WBLN1x5TorqzWvrqVhqiebWarX%2B8DVfPGkaKBDkx8EM3QYJxfonCJbGAZkwOAMnV9b5wBfUevdxnfe9fzjRKgwhwHWrGZcK4rKNbgxeKtrIa%2F2RW94H%2BhtNKdEk8584N76hbYahsCBvbg6oRA&X-Amz-Signature=46f7b98b9a8c2a8f76f33a65744375e58c423720a1495b23fc25d34924c94cbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XPQIDPT%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCthZYPAHqVNDgNA5sk6Wa5l%2Fk645PycI8mr6uwxWtisgIgGSDz2LXMe%2FnAFANWeKFs1TTclJcvIMaDwzlUD6RqbSQq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDH3JWat3kWFKVlw4mCrcA2kaskSKcdbyUUdp%2Bl4r0jfRZtVeC%2B0Hesiffq3QFdr7THEgsZzcAgPeLPQw1X%2F9ThbLVqL9A%2BbP%2BFZyMGjccvAdtdnYEupGgPJ08GIcpfIyX%2BV1%2BNtaTnQ%2B4Id5i3LMKMs2KpbfKZtwSLdEyTXfVZXRpnUA9SsasRrGSE2oXqomo9MTdfDi%2BpKtTX%2BSn%2B3AqpvvVWc08vPxZuDyp%2Fz71%2BCqUvujc5djTp%2BWJxmvE4YyiWfg2qauU6WdYW%2F7dbxjjfyt6F%2BfukLSNM6Z7qsk3dUJTLiB%2BOqaQIBPV9SWjmgtWa%2Fk8Y9mjgqA6zTTULchf2MITUGdDxGuMXV833JXD8KJ8gB398qaiL3wxNnRb9IROyCRSdY7wm5fmX1mLJl8nmncLLHyoyNt6f3668c3TgLMAhBq9HatPsx0EUpfww%2B0ykt2H28XASVn6GkpC4GkZlV6Cqf4Ssoc6UC8NviVXUrQMb93pnAdQbuxYniWrZxJ9SRDkw3TnGImRdhSPWVVib6ZS9JAkhcX3odbyH3BQ0wwTWXjDKwtTAkGtubXTEDbW6CkhNt3I8tdJsDARUIKrB8rZlocnqzEchHE8my7UrRj%2Bf5wS7vTyiMgH8goXIdWFRViomnGjFQkCk3cMPWl780GOqUBASbH%2F9nSqgsZbLHYjVkgMmoN%2BEgBcX2HeLKveGroR5PJ4vtRPIEXHo26JNN8GDStdL4VO%2BzcVk1WBLN1x5TorqzWvrqVhqiebWarX%2B8DVfPGkaKBDkx8EM3QYJxfonCJbGAZkwOAMnV9b5wBfUevdxnfe9fzjRKgwhwHWrGZcK4rKNbgxeKtrIa%2F2RW94H%2BhtNKdEk8584N76hbYahsCBvbg6oRA&X-Amz-Signature=2199087094420d12834530122a9de33bddc5fd45beb05477a9e814eebae4edb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LRMPKN7%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIHkhG3xQhmYwKBOs87putmaQotyJOxETEr7avP%2FGumYhAiBsJCMM5etjLxE%2BB11WQNsnzm%2Fpkg%2BucL%2FTSRH1IIHzVCr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMLVe2swvepLIOuk7rKtwDV%2FsQ4A5YMs0fIxi0NzG6MPcd6%2FdOvQKYcfVIMMQxNWyAs8uMmKhjlTdpraaxFl8ZuGVBh%2FBgNZqZGcwJUxhoYSrpfCbXDgzGj24ZntoSqob%2F5zE86bXKXxVhErDl4RfMLROrrkYxBFE9W1ci%2FkWgXffoCyyPgNXCyW3NgE0QPcKCiZeN%2FdGczJ3s4Jl8hebuEaWuzlFblJ2qz2YjBRmldTcpDfZYY8gxCnc6ow0hKKCC9H%2BCIwJZICw7qoYMHQyde2fTP2fjdxfN%2FRZtZwBVHPYZKVWcQx%2BQAHII%2FAc%2BveTQU5f%2ByVSqjzLNaMzJDA4QivQP9ax9YWVdDQqBemyOJOLZrxhPcGt28gMCr7sZgTvzsPge8CjKJQhrFNzUrcGypgGlMw5P8cN9Ig8jKUUK43y981ZSPVpwwVwYbeaFYwp%2FYBAR%2Bzuiu6JiAr1paWq5ALX%2Bpo2BZzL5xUM9KFxyEJI5YLjgwXqjAEnNmU0IJTyPEZdBItfjg0sz%2FTkily8SOYmKIq4a6INWlSf6OZ2T5f08mTq4owoMun%2FMpUpaoA%2FhHlMiX%2BC0tXRmGy%2FEGJFKjgna0wFLQ5Gz7zcz%2FAMmlvCKM%2BgkiV52Bro51QrL3h%2F4yol8l9bzowVFQOUw9KXvzQY6pgHeGt4l3zCISqCWKEcO3NelKbQU9hM%2BE%2BaieG9QVgJ9JFByIKwS6g6SwSgaXAfEYqaoeBJvHIwMxfhbDCQ%2Fz4WUEBbJ6eE%2FpVlLx86M%2F9nBbwivJH3ZB7qXk6bDBRmbJzGAz4n3zRdyv2G0Lie1tQN%2F8g3nwn2wMCwWMqQjwa8AQ8PdlblcQHoJgMT5LKKd0MElwJq%2FB9WTvg%2FSyfK0xb2jGBU1E25B&X-Amz-Signature=0af7504e07fa73a97ef5546d43f3a0b1c357826093a4b4fcbfa5ebbd24f86639&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674IHJGSZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQD%2BWWpmyrFou7MV7NZz395I3y6fGH%2BlPB05jpaypYcDwwIhAPap2R2LFfffxrb6C7alBkWS%2B3ve7qYFvBrsJTcic8VdKv8DCBwQABoMNjM3NDIzMTgzODA1Igw%2FLJFGMzsvWyOcJe4q3AMj8Lwynb0e1n4XJSCeOU2GWs1TOedHKT6zH3nshVrvOnKAcxbdVZPyIpMYQH38XjA8%2F6kaOE9skj1JYhzYw7FG6F%2FSfDdePOK3FAn10n%2B1SRjNVvf%2B6QoiRTUmo3JLyx%2FmYnQOR35llQIzyCT1dvDSt5A31l3aWU8gbm2A4FvSdTdGPR0oljG%2BgYjhjhFJWofZDkQBxCAEo4kH1vFxFpyFUaveG58NHCvemscQzTnlAzQpVrQPh4dNggBBWAWB48HL%2BGtsrIEf0jnom7NNjDXL%2FGp3sofgMfG4zo21ufZMzGvZ9G%2F6%2Bf3yyThAuRQqRzDRyy5uvCpLy8okmGoJnmrZpDISpB7rw7fxPXwyBfnZnDodUqIP%2BEWQU5eS2EuyLQuZCa3Qeep9B5bk7yEUhZdWMoKXvLV%2BKaYOR2uYbCRaSkP4Zdx49yGDKLyIK2LwCZNsJTsBj5Nt%2BIe3C%2FvaKhhRU0eazsIZOxLbcYVCnaRikJ7FxDdc4RDeOs0Az7aDgTO6l%2BC6JAYck5FcAPCk4x8pmjp105GXU4yrSK7k0FOzLigAisXoqy6OL7lKHJZjaQP9YCa8%2Fc91nlLmfIO2QmkffUfIVpPX5exN0zY0ps5qE2tLog8bilVxzmYRWzDlpe%2FNBjqkASUW4yMEHbI4em75lYLKDdXOorRXyu622XzI0m1QHFVnBVEf%2BNTK63CChN4Qz28Cyw66QfsqBeCHeTlKIg5OcyqzEeWToHTrMVcdNo6ZmjVX2GLAYd33Q9J97mX6lpOpIFyuPikzNwk6NebaVPRl1s0cWhuIlMKysrC%2FjIXeI0e0YNsrPkvpv4R1t6rnGxJNO8H5g77gyZVSUE5ewoIvqk2zg2Rd&X-Amz-Signature=9fc669677b937f0477a77fd9f88042bd01e527e5c004fe5706d4b78b061fe417&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4HU2MFW%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDzGESaI9rldqO9kuwtyaorcoQaJDjJwRxHMNKYztGpmgIhAIZF%2B0KQJFo9hTUjE90PdEFVsTWT2%2Bs4N%2FukYEKU%2BO%2FyKv8DCBwQABoMNjM3NDIzMTgzODA1IgzIAglanInyIP3hKawq3AOiO7t%2BaK08Ew3sOzptiy88YK5KKe5jj4yQuKAiaFDW3dJl90tmtOInLOhDMWn5fqyjNCgtAmqs9xqoEQkmapm4M0CCIs%2Fq8lfhZjz1CkaWefrTR0ZYyQsYOqUGxfcFgk4Wfg%2BHRpRCR1lgB0XYB8nPMYbhRRNoEShXJnh%2F64D4pv178Vg6wSA61glSCTuGCn%2BQEbQ%2Bh40%2BV1HuTniDsOWWoTIJb%2BOH%2By6EEBaa3%2BQ4jeNqpFtuBZWmlqiOPjdnLeGNngGwjhG9MRKBkE3IOKtUMBgR3xbnzSEvqbqfRcUmauE0biOMdqjDxXtR1bVqUr%2B9hCXP0wZYw3HgbeXNLvUU97vF9G5whIUtbLvRSBT2ZDa02o4HabyXu0PYj0fkpe7KfH87kqhjdFOG8%2BWovtvpi8LJBJRtjGIQ5%2FE0pzVgsajPzfsLMXoBnlZ2N%2Fwlx0ssTx7hYdLJG%2BzoxVCxwq5y2TrR4hQ%2B6uZjxyzIv4YG%2FgIT3ggZ459cuGsUzRBX%2BiCu0F5JDYNGeGF2HRDPW165j83VmbWr5f4JpUBuT%2FiMLg59sHXm7%2FZs8YDD4bcj9OabeTLt7i3pp9OJByFki0Y8hP6Vx4m%2BEeebZXbtu4JHDTNzJQTPIjVo%2FXeNdDCupO%2FNBjqkAUXJT4gDX3Z5AHVvqauefPz65JOsmQLq69EIumf%2FfwdOTuaXgISFpbtHed8BtlbxZNsx42ADK6wRTAQfgRLik61bc%2BStcMdMqdjPQZDKkTZ58ZcntTAYWOvIhrMzKphtqDKgt8tZQh3axKm65K5Jndez50pYJpYysc945%2FUgIOIQBWgH%2B7CoYNgqhy844CFPM0tkabt2cSCXhSdxqm377jsGAvXj&X-Amz-Signature=9d39134e18ca62df664a4d42f560362555407141ed6b1360b8aa2dadf58dc413&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSMUCXE3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIDTcfKM654tf8OHPoEm61vL71Z4zgpNASqZFOwHR7P01AiAt%2Fxw31yBeuQ4xLoUq41RdM1uvVm%2BS5eLVitMWDq6rQyr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMva1Kb5%2BOwqJ2hPQFKtwDorSFVbsn%2FMYRzAFboDoYGRBEo97PsTxaUMgP5xaeljeLtArUwzVPzaMActSd%2FKguV1redu%2B9Jl%2FVPkXQDsu3mRRs6%2FPdQyos275n%2FuPrWhzrxIJLkwxH%2B8oWM1VaY9hzADReSSJthFugvaWOq5OqB7oYjMGUApjzAfWpKDsmOGc2wbTZBWN5MRPsl0uFOT11N5JWErIkJ4uvft5F0Tq0rnGRqBqtKOqy5TjgR68XrO2N9e1SUib5AYBSn7CSMnHuHL44Hs5wZjAALgaTRaYwdzVlkYMt3Q%2FYnWEMB8Dex5Xswlizf8tCwCpGvXKnzlvZUdQ7qNn%2BakWEHxuWqL2Ti%2Fbi%2FUsUooguNTnK6djoJUqp%2BSkHyOD3VvhhlnLsycg9bRsOxpL1q2U0bTVsr%2B7cCiIIccL3fch7wxe3VyND6d0len%2B3atn4j%2Fz5ZlIrz%2BWUbjJbR%2FTIt3hqf%2FtFRaunemtONnzbidqIrEPKXWuP82ALLsSXNZKW81dccTCaMmNCbv3AC7qnbXHOeVEn7gqWmGFpTzPeKDk04i5x1OfS%2FvXSDGfaFK%2F%2FT1zZyYASGUA9fsokigma8AEZChTqJVrcGktWhdMJr9ZlhNf%2FIbX4RL7%2F5AKZoV5kJGPkB1Yw5KXvzQY6pgHMGXTjeD4DC2%2FFy16uoSHyPuw7srMmydkrAH2lBgaVwfg1PoQKhQGPuloJx%2F%2FiQwmVdo9%2B1QHaUIWRkhmyH7jbTDGE8XTYWn43JzdJmwOLu6%2FAU0b5APYLnse3a8D%2Fng0Kilj6WFIi%2BaileJu7LPAGacCUUOHxzDzg4N5CRa2Ij71dPQkl8HMjRlJO1D3Qcwc0%2FZ6mcozPmZ4YPlZ7u0rXpPzflA3S&X-Amz-Signature=31f6a67cfa3e6512e3f28039030e229ac3832f0a9e829ad001b637c36759ed61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSMUCXE3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIDTcfKM654tf8OHPoEm61vL71Z4zgpNASqZFOwHR7P01AiAt%2Fxw31yBeuQ4xLoUq41RdM1uvVm%2BS5eLVitMWDq6rQyr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMva1Kb5%2BOwqJ2hPQFKtwDorSFVbsn%2FMYRzAFboDoYGRBEo97PsTxaUMgP5xaeljeLtArUwzVPzaMActSd%2FKguV1redu%2B9Jl%2FVPkXQDsu3mRRs6%2FPdQyos275n%2FuPrWhzrxIJLkwxH%2B8oWM1VaY9hzADReSSJthFugvaWOq5OqB7oYjMGUApjzAfWpKDsmOGc2wbTZBWN5MRPsl0uFOT11N5JWErIkJ4uvft5F0Tq0rnGRqBqtKOqy5TjgR68XrO2N9e1SUib5AYBSn7CSMnHuHL44Hs5wZjAALgaTRaYwdzVlkYMt3Q%2FYnWEMB8Dex5Xswlizf8tCwCpGvXKnzlvZUdQ7qNn%2BakWEHxuWqL2Ti%2Fbi%2FUsUooguNTnK6djoJUqp%2BSkHyOD3VvhhlnLsycg9bRsOxpL1q2U0bTVsr%2B7cCiIIccL3fch7wxe3VyND6d0len%2B3atn4j%2Fz5ZlIrz%2BWUbjJbR%2FTIt3hqf%2FtFRaunemtONnzbidqIrEPKXWuP82ALLsSXNZKW81dccTCaMmNCbv3AC7qnbXHOeVEn7gqWmGFpTzPeKDk04i5x1OfS%2FvXSDGfaFK%2F%2FT1zZyYASGUA9fsokigma8AEZChTqJVrcGktWhdMJr9ZlhNf%2FIbX4RL7%2F5AKZoV5kJGPkB1Yw5KXvzQY6pgHMGXTjeD4DC2%2FFy16uoSHyPuw7srMmydkrAH2lBgaVwfg1PoQKhQGPuloJx%2F%2FiQwmVdo9%2B1QHaUIWRkhmyH7jbTDGE8XTYWn43JzdJmwOLu6%2FAU0b5APYLnse3a8D%2Fng0Kilj6WFIi%2BaileJu7LPAGacCUUOHxzDzg4N5CRa2Ij71dPQkl8HMjRlJO1D3Qcwc0%2FZ6mcozPmZ4YPlZ7u0rXpPzflA3S&X-Amz-Signature=1a3c8b21197bd02e7cd87820350385d204e44159617009b416ca4734c833122f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4FM3ESV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIHOZzKQfmbgRtf72wvfrNsLF9j7009ZthdgNKVUHSPVRAiBwYXpsGYUztQFB%2FoPzxadhUYSw3m96LgX%2BhRhjqOnTcyr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMA7YoA46YYexraLM3KtwDoxAgRvEY7u0VI63pRooDyWAud1A37ovBqXP5qMllUBrHQBhcfKaFR1z4R3rR5xgEHE7NXz9mh7fDfPo6VNuMT0xYcm17%2BeIlCC7O8k%2F4JOFT11v8MMBCIsT3gN82fYoNQ0%2FqB1q0ULpoo5wzl9JROaqeDIaH3GSYC%2FzTtwsXBsHTBfRIk%2B3qDPi7BcRxjFylTz2NFjJe6HruIjNr%2FXR18CXvBe%2Bo%2BBlT%2BryjcZGX%2B1ueJ4d7r0TwOdMY8VJQKTSOmgd0CXMEk92Acn0xUraOuCIiq27hOEDBg0kApb0t4McRkk2jDSF4fIVbrshV%2F3eMMQXFf8v7%2B0oGFnmY8PndQI5Wf2TnjyxPlM33UpcUsBgXUtWHtDODjC796GV%2BGGXsrI9utK%2FeD7rishBAA%2FNg2bQhTUybbVxPVeaT0mysyUzS5fsViLrq9U5TpIyIsv2bb%2BTuTJjNCh1PjCk6tgJYbMI18FLWxGIQy347g3Al2V9QaKiZzAyDE6mvyDJZlezS8pDUPRDKKo3rK55TEdaAQtD2hLNyeiMQFCOfRLjSR9%2BtETJukSG3%2BHU8ndNqkfJ0Y%2FN2Cue1vc%2BShLNsmSzY2HCseQu20A%2BtpB6IUt9OLqPksLB%2BQ%2FxwAqfN8xUwsKXvzQY6pgHYDG%2Fc3uNpbfXQodUZHRhsOHEro9dJCO46xgCmURVXMuGmYKiExIk3W9szRo1TJbmkORT%2B5%2BlwhZceT1NXi3r3locRvmQmjtCFAxDzdzXBVbh%2BU20KjQXe%2FsisgrxBqY0%2FkyvYFMVS%2BOKI%2Bf4e0i7H7dnYKRRGTjE50al0hBpP3FtJyFV0wSL0BOMJc7TuDEtFT7N%2FgPQBxtaUK5NPilII7DLr9pE6&X-Amz-Signature=84b212501f5bdf3aac6125f58cc55adf29ae1416cc31087998564a7bdbd91c5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664ZMJ5WB%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCRSiZ33ngSLZfAGGs%2FBKpd8GesEycsmkO5cXy52NRdmwIhAPrDdvmpBb3j6KXPlWljbnT6n7TDVBad0umL2LD8qxAeKv8DCBwQABoMNjM3NDIzMTgzODA1IgxSU7nHQOigFCew7i8q3ANWAc08ne8N%2FF%2BMKKjm3u3CuPHlAQQ6eA3rniHDnscx8DInIDWU2pCPFvaaRMhdrZIK%2Fy88C0pNxxtCALahKG5PwBnkMDoM8E2WpTcbdVQGaM1Xp%2BseAcEeNM%2B2eCRFiw5L8G67zZqDdxTOQH97nq3chyx1nYejVeDr1kiLNOPyjJc9sSNNgVwd5frzRSVLAxpQi4fceeCXmONy3fbdndtHm8lqT8b5rWpJf0LT9dHZax96CQU0FOKZuM2P35boch90c6tMpCj09kWlORxA5103Dk2uT1gUfttHP%2BHuxezXnvc71laRAnlX%2BzIXk9q4b7PetsnTsSfiSgKfPNF40uOTZF25BRt9Jizl41blfsfB66%2BePTqERcr8yaenYEMJuqBMJZYatVfE4kK8hziPta1WyboYH96oIaHmllevOKKrVsJNsr3tb2njJDsFMnwaLrVyuovbbBEZK2no4A9ZKOm%2BmbXTwlMvKAnhcOhZ6nYmfr6LoKe4X9r6uPUMOcgE3BGiHxODJBsfWhiFyceHrHahqraXWGkeJnFcJdFqnvVbnzqYmDASltigQnEKfbdnzrKBsH%2FsKklQCvELldE8pE5%2BYvRoul83A6W6ETmKIvnxXlbE%2Bjmed6VwNohW9jCQpe%2FNBjqkAR0jK1ghpz4moxiAuf9RssuoctLZWUX2BpxD0aSbD5vSaTpf5bTyT6gB9%2BUlgrkcSd2NIBwhDjQqV4ZHeTkg61ltWJOmHereZ%2Fms%2FdIy%2FR5pVZt3W2tFhHjFsJcBSEAcccCuyVGkkqPbbmjkcAXcB9HhOkM7%2FoNLDuKFLNZkrr%2BHNQ9OQzBMajHyg2bwE3vOrD9fhotjO9ekIObFEe5FXXeigh1%2B&X-Amz-Signature=c513b73ca2c3fe8809c5c561f32f2c8506def1e982b2e57613ae6e0546729133&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664ZMJ5WB%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQCRSiZ33ngSLZfAGGs%2FBKpd8GesEycsmkO5cXy52NRdmwIhAPrDdvmpBb3j6KXPlWljbnT6n7TDVBad0umL2LD8qxAeKv8DCBwQABoMNjM3NDIzMTgzODA1IgxSU7nHQOigFCew7i8q3ANWAc08ne8N%2FF%2BMKKjm3u3CuPHlAQQ6eA3rniHDnscx8DInIDWU2pCPFvaaRMhdrZIK%2Fy88C0pNxxtCALahKG5PwBnkMDoM8E2WpTcbdVQGaM1Xp%2BseAcEeNM%2B2eCRFiw5L8G67zZqDdxTOQH97nq3chyx1nYejVeDr1kiLNOPyjJc9sSNNgVwd5frzRSVLAxpQi4fceeCXmONy3fbdndtHm8lqT8b5rWpJf0LT9dHZax96CQU0FOKZuM2P35boch90c6tMpCj09kWlORxA5103Dk2uT1gUfttHP%2BHuxezXnvc71laRAnlX%2BzIXk9q4b7PetsnTsSfiSgKfPNF40uOTZF25BRt9Jizl41blfsfB66%2BePTqERcr8yaenYEMJuqBMJZYatVfE4kK8hziPta1WyboYH96oIaHmllevOKKrVsJNsr3tb2njJDsFMnwaLrVyuovbbBEZK2no4A9ZKOm%2BmbXTwlMvKAnhcOhZ6nYmfr6LoKe4X9r6uPUMOcgE3BGiHxODJBsfWhiFyceHrHahqraXWGkeJnFcJdFqnvVbnzqYmDASltigQnEKfbdnzrKBsH%2FsKklQCvELldE8pE5%2BYvRoul83A6W6ETmKIvnxXlbE%2Bjmed6VwNohW9jCQpe%2FNBjqkAR0jK1ghpz4moxiAuf9RssuoctLZWUX2BpxD0aSbD5vSaTpf5bTyT6gB9%2BUlgrkcSd2NIBwhDjQqV4ZHeTkg61ltWJOmHereZ%2Fms%2FdIy%2FR5pVZt3W2tFhHjFsJcBSEAcccCuyVGkkqPbbmjkcAXcB9HhOkM7%2FoNLDuKFLNZkrr%2BHNQ9OQzBMajHyg2bwE3vOrD9fhotjO9ekIObFEe5FXXeigh1%2B&X-Amz-Signature=c513b73ca2c3fe8809c5c561f32f2c8506def1e982b2e57613ae6e0546729133&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666TNPG4P%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T123124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIGKkJ5c3Wxh8Hyux8gnctPDNyLhipEFN0RrxmoijDSQ3AiA%2FAWzmglZggMbIEfvpuiTtrhVG%2F5tao3chtFzK7NtD3ir%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMmaGNrydSEey3waDTKtwD5PNpXkxPVZan7fLsKsfwbJ4mki2V2aQ8pdM5S1dvOQnqJXkMrQefOk9WCjzB7qPcDDcOnCJq3TCd8t03G8oNnpKZXfamn%2Bz9gADOoEmxvRZQjALD3Xp%2FI9jQM3cAR%2F5gUgYLaz6cQO9zo0YihZd9lnzCEHN9CeIL2St1iE95lamRoXPqUy9Bd%2FsJn1W3bnZQca%2FAIglHdBGuZUIK%2BvZxZ4L4zBmEWksSIRIA2Ee3A5ZUhdMpzYc2VW9fBVJd%2BrKuR7JAoFIgZrNurP4o0dTEZd%2FdR74s%2FpKNKf9PTY%2BmRE%2B6v38nLjIsQZ5I7rkKPWvDMm5HHwOZyfNFJiGwr3k8Us3PeWRsLpHJJdzmU6ZPqHyHjd%2BgFwssCky%2Fg75UVnTSLepz%2Fsoa4uXueGHl1T3tYj0MwnfjlwTAQw%2FnTNaYT4yd%2FSctuVYmnBKp7kdhoo4oDCsAsS0%2BpPJqSwQPdDdvtyJC3seE2vcklLW0sPNf6kQjLMJzVjcE4YXGKxCzMLGbvaoXJKJo32FWQfL9lMOIPUPKdPuHoSNtNPSfig0XtGAjiE02xkv0qwremGN19acSOACtHii0GZUmZbEdV0840gWLRug9ZyI1ZWBh1LMkrBumBDDq8nFnSCl3zf8w1KXvzQY6pgEOWFz3F1vmLpbtwOHlbzty9HRZk4Bz8pEL4TB8TjJOgll1sddrjiBpohygId0bXoEqioKY31%2BpdVDjj%2BHft2eEjmI21hBxCsfr6OKI%2Bg%2BLZN18KT2Lb8L11INcTNuAl4%2B%2FSySotBdSe3xoDUmOAdzvvDcq2r6QIIaxzgrnlVH40ULn2SAek57azy2vVQHblsWri%2FGvlHvwDnKKWQMUsA8HueBwL5wQ&X-Amz-Signature=fab891ea94c8b9011b437e32e7d0756649186097a1b8c1610c8274f7c2d40d05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

