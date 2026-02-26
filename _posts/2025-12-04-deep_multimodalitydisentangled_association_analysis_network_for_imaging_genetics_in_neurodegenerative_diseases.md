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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VUFQGWM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIDVQrs6s4NtFjstl4bthCFqzxQMcmtyOir%2BjLGPxcolPAiAAmH8dVuqX%2BaiyoBNFVBfGVvxQxcmOyDzLDoneVDEx%2FSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMMy6dx%2Bc%2BgRiGaWv8KtwDEhH6sRoxd6tEyo5uRxWu%2Ff2dtaIHYYM2fFVWIgOzfjfWtMyHjSI3z3mxGDIFZcHJ9MuS8WQef30DyG4VpTB1DxRZxDHQ%2F2hNRKAJfvz6VRu43FqWsaX8Zuu1FdvmpvQMMvMDkieB3gGnBFeQUwwf68IINNu76S8nKRi7Sx%2FFURXloC%2B8BRGoKmfLa%2BiKVM6TLMzOoL0dEjqgQto41f9765CS0C%2BZ6QUx37S9lCAhwuJP1a1x0%2BfmHhKRz4wQ%2F6Zv%2BJ2n6k5Q%2FTHwcCPe8mAs3sWCk4JSHtXi95rOouNpV1iRrfArfQrW57xO%2FhR4tyYRXPDlcKwc3G4jNGBP3iAe4EPl7IW7GGqMtwPT%2FpFWL7VewH6Eb%2BzgQcZPo1%2BN4Og2Iz88pHTIFhhDBA7qL91BfAvzYMzXwMlGbcYNB5ekuFUAhZyGioHjzzQbuuPDoITjE%2B7EPqiBI7zusT%2FYg8XJJ%2FNZZ6%2Bb6ms6k0E1rUpYav1KkSNiLKwNa8kbM%2FXaHulFpxrp%2BqvukTRKEdSc7iglvWoYMJ0%2BQscI3CdcadQNuZmnq%2Fzp7eqr9nOnNcSWafeAOAofYlIQ5mhQJdnCleCBX6ZbGGf8OYfduKnyqloo8dAOBsoXzpQAds2s91Aw2tj%2FzAY6pgF8KvHjkKchkG5ZL6nvsvjXx9P%2Fc6azw4G8BKyQp%2FjZwJJKvCo2FGXSz5VYiL1X%2BzOsw1kHDQHndit8stqqUaCX6JAjK8zcpfUU929UFt0sHEGaHyEudMYEv953JdFQ8ei8yRswLctk%2FZNwBMKRN6ElNRRcnUEDPX51QXFSmK08XMouxgqpGFw8ZytrML2l2HJjAmV2Xqhssi3fPxTB5QOtrAIuBLAK&X-Amz-Signature=c5bfc0e0f0496a6a3ab62a88abd82a724456db3f9a9dbd46d4423821904d8244&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VUFQGWM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIDVQrs6s4NtFjstl4bthCFqzxQMcmtyOir%2BjLGPxcolPAiAAmH8dVuqX%2BaiyoBNFVBfGVvxQxcmOyDzLDoneVDEx%2FSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMMy6dx%2Bc%2BgRiGaWv8KtwDEhH6sRoxd6tEyo5uRxWu%2Ff2dtaIHYYM2fFVWIgOzfjfWtMyHjSI3z3mxGDIFZcHJ9MuS8WQef30DyG4VpTB1DxRZxDHQ%2F2hNRKAJfvz6VRu43FqWsaX8Zuu1FdvmpvQMMvMDkieB3gGnBFeQUwwf68IINNu76S8nKRi7Sx%2FFURXloC%2B8BRGoKmfLa%2BiKVM6TLMzOoL0dEjqgQto41f9765CS0C%2BZ6QUx37S9lCAhwuJP1a1x0%2BfmHhKRz4wQ%2F6Zv%2BJ2n6k5Q%2FTHwcCPe8mAs3sWCk4JSHtXi95rOouNpV1iRrfArfQrW57xO%2FhR4tyYRXPDlcKwc3G4jNGBP3iAe4EPl7IW7GGqMtwPT%2FpFWL7VewH6Eb%2BzgQcZPo1%2BN4Og2Iz88pHTIFhhDBA7qL91BfAvzYMzXwMlGbcYNB5ekuFUAhZyGioHjzzQbuuPDoITjE%2B7EPqiBI7zusT%2FYg8XJJ%2FNZZ6%2Bb6ms6k0E1rUpYav1KkSNiLKwNa8kbM%2FXaHulFpxrp%2BqvukTRKEdSc7iglvWoYMJ0%2BQscI3CdcadQNuZmnq%2Fzp7eqr9nOnNcSWafeAOAofYlIQ5mhQJdnCleCBX6ZbGGf8OYfduKnyqloo8dAOBsoXzpQAds2s91Aw2tj%2FzAY6pgF8KvHjkKchkG5ZL6nvsvjXx9P%2Fc6azw4G8BKyQp%2FjZwJJKvCo2FGXSz5VYiL1X%2BzOsw1kHDQHndit8stqqUaCX6JAjK8zcpfUU929UFt0sHEGaHyEudMYEv953JdFQ8ei8yRswLctk%2FZNwBMKRN6ElNRRcnUEDPX51QXFSmK08XMouxgqpGFw8ZytrML2l2HJjAmV2Xqhssi3fPxTB5QOtrAIuBLAK&X-Amz-Signature=c5bfc0e0f0496a6a3ab62a88abd82a724456db3f9a9dbd46d4423821904d8244&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIACDECA%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDB%2FJe2WkkF4N3UIaZ7JbpqUug9Zw1rwRY6Hxk050PaLQIgJJq9dOo5tB22e2wMJ%2FeEbK4NSd5vLaTD3p1X9XVKwy4q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDHWnrK4t9EHwXWelGircA8Slhw1pg2IKpCFAa2rj%2FRQKQ4OEtwl%2BelrjIqThqV14WSopGYbzfNIby3pqWnApuNWciajE0V%2FZDlo%2FADFtT76MKZyE%2FBnyOjKRW95muhRt366FI1UuUsBSmfuswmnLni3TmnzYPstR%2BOqsKhuhbQkXeab5ym%2Fe%2FcLIqukP4Sl1Pam6jV0eOwhBxVpYPuHafpDRVIsJd8FAfP4tzR41rlS8LgWA8ZzgZTxBMwquu4Vqi8JSvLmvdau2RZhr5%2FL7auZAWS1tgATmh6ZlomwYCu4981Wgn2kkf5m1KfEn2YFAOkRa3jaTb4QVTLSA9W5VENYaYVXG66OR%2BOot39Spv3FSUARgBwqMIOlCpk1%2Bo9kfHkc%2Bung7Fs6cYRI9BJX1J2upyOcr4EmYWLYuZV%2Bvppn4Qa3ghNRNUVRRXNiDnM9dmWMxg40SFdANgwY%2BmrC8S7y4DAaEAB9XW10D8C9lKxcjCGfyT9TGcpqiN5Z13GWPpRq9dZKbl016nP%2Fo7Wi3C%2FjLmkaD%2F0pstTqMrldgtxI%2BkfuGavgQ%2FRVoC1BpE5rQf3hLpwprkFOqX97%2Bo4S%2BknIsljtdCUIVWj%2B%2FG6ondbQfpAAh0lugGS9xZkrm5AR614DMfy%2BR2BwArkOHMIjZ%2F8wGOqUBFHZw6%2B7yjpZddHk4lhJeMfz%2ByOSWVYu4Igtfqmcwmiw%2BDgmz%2BWdJwidF2bYPn5gY03rQVG9JDyz%2F%2FRDl6hyuwuJh8X%2FqqAKxX9jAD%2FklSxn%2Bbewjx4LKW%2BVvilBqime5jhaQ5o%2B2evG29tSSTy9O0U8dYjsmqeadGWhIMEO4LbQ037%2BIWa2tTRMibEyjQ%2BJiTEV1N2zEd7PqsJdGLjBEMhWc8WTv&X-Amz-Signature=a8b93899c4254ea3b73188a81fe185cf0cc82259f05d3007d3cb1a25532708cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS4FJZPH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIFMHzKHroiT%2F33svl3pyHo%2BUh4C6AXwgaJzNvMNGzUhtAiAXft1lC6P1ks%2BolQoj1SFBcJUjGIlzKM9LAOgvFb7wFCr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIM9MehQLtdrGfydkbLKtwDL2FFqHo%2BmCyRXMr1oevENAHC5riN0pTEkVBwlap8f%2B3aefE9F7vBCT0muLYN25ebGgGssuB0sGy%2BkeOlzw5cHAEJRQqzK8O%2FB5UpYlRj2impmP2NqvUNiE515%2BNqyuT%2B4CTOtu2%2FOptM0wWnZ7nXi3XYgCker4UL%2BntygqGR8MpAa7%2BJxRJHmnalJQLvw2ShQVcw54HJqdy6KXR1Af%2BtvUfC%2Fv4OqCgRRe3W%2BbHxd1ygrReHqkekgLn0R6ckdQusm1O7%2FDjjx0wXfgAV9oONrEj1VipDJ4DqwPRC9ciW1xB9cGafL4yJ5bFg6i08PNLDv3JJnVIsUDRaZgHKC%2FklaPm03E6XBJUY7qOM7jm5HNN9TVnrdlUKuzLFHJCI9tktvwa6VSH2lqiRMtlNWWw6r4SMsw8AmcpsDj0PYVt6cNK94b9SYS66CDaC3iJN4XrsruTZQ98irSB%2FHPJlkVOi%2BlkQzoxFXUNzAPTKALxHPwEIoJnfB%2FqP1FoEsw3%2FgK35apQDOAMuPBxk949GFd0C4fD8GmT9TWcfE31CMZEB8uvZ1OgSdfTphMoTrx6srGhKf2nnSqR%2FVoU7gjLn71mNzPvxogLRBKM2hDWBuMRQibKvc15gYXBuvd0IEdswgtn%2FzAY6pgHGuKR4COJbeOgfCCRW57QEqDJ6XHXeqStGgLmfJ07cJZIXjH%2BB0rDIGdkW0QglEG1%2F2It55Yu9iDscpxj1FjJYBwNmrj9Ujffpw4eh7xGAsDNmMk%2FiiR1ohWzaq2wCR7e2c6jjClmp4E4COGzfBdSyrHDPVYvVeVfNHCkc6CwomxsDd8szg2y%2BywNUFUcSbYobzOry1%2FlSLHGgcCrOLq6wLj2kv8Hs&X-Amz-Signature=ff181ac0a9a408ae7f261db2aecec27e49bf90b7d6cd371c71322c554d234b8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS4FJZPH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIFMHzKHroiT%2F33svl3pyHo%2BUh4C6AXwgaJzNvMNGzUhtAiAXft1lC6P1ks%2BolQoj1SFBcJUjGIlzKM9LAOgvFb7wFCr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIM9MehQLtdrGfydkbLKtwDL2FFqHo%2BmCyRXMr1oevENAHC5riN0pTEkVBwlap8f%2B3aefE9F7vBCT0muLYN25ebGgGssuB0sGy%2BkeOlzw5cHAEJRQqzK8O%2FB5UpYlRj2impmP2NqvUNiE515%2BNqyuT%2B4CTOtu2%2FOptM0wWnZ7nXi3XYgCker4UL%2BntygqGR8MpAa7%2BJxRJHmnalJQLvw2ShQVcw54HJqdy6KXR1Af%2BtvUfC%2Fv4OqCgRRe3W%2BbHxd1ygrReHqkekgLn0R6ckdQusm1O7%2FDjjx0wXfgAV9oONrEj1VipDJ4DqwPRC9ciW1xB9cGafL4yJ5bFg6i08PNLDv3JJnVIsUDRaZgHKC%2FklaPm03E6XBJUY7qOM7jm5HNN9TVnrdlUKuzLFHJCI9tktvwa6VSH2lqiRMtlNWWw6r4SMsw8AmcpsDj0PYVt6cNK94b9SYS66CDaC3iJN4XrsruTZQ98irSB%2FHPJlkVOi%2BlkQzoxFXUNzAPTKALxHPwEIoJnfB%2FqP1FoEsw3%2FgK35apQDOAMuPBxk949GFd0C4fD8GmT9TWcfE31CMZEB8uvZ1OgSdfTphMoTrx6srGhKf2nnSqR%2FVoU7gjLn71mNzPvxogLRBKM2hDWBuMRQibKvc15gYXBuvd0IEdswgtn%2FzAY6pgHGuKR4COJbeOgfCCRW57QEqDJ6XHXeqStGgLmfJ07cJZIXjH%2BB0rDIGdkW0QglEG1%2F2It55Yu9iDscpxj1FjJYBwNmrj9Ujffpw4eh7xGAsDNmMk%2FiiR1ohWzaq2wCR7e2c6jjClmp4E4COGzfBdSyrHDPVYvVeVfNHCkc6CwomxsDd8szg2y%2BywNUFUcSbYobzOry1%2FlSLHGgcCrOLq6wLj2kv8Hs&X-Amz-Signature=9277ff12046c56079b8a0a8ed601b1bbe31c11674111a4b125d2a664d32abb97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664G3PFDVO%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIGWVtqc9xOgrvakzGcWcUeErqmv4%2FCEKwLz%2FYqCaFfucAiEAiVcFtLU3pby6mcDYCBq5kl1nkWWdeJFsUcwqupIiQ8Qq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDLC9FcPNu1WXQheojSrcA%2BMDvG4IR8ldXtuh6qFMFz3lSeun4GHvhQxokpZp%2FCJyJYglNCaOmLa8%2Bav2p9VR8pFi08LnKIQF3OtDjj72Ee5Lh5Uw0yO0lDjA0PNWfXOFPmfbmJYdfJSJxw92UlWfkZqb67bMXExAlEdfLEKoW6hhzpFzZLIotMD1JoN6NJ6dDCML3Cew%2Bd76sNPMRFt1iae%2BExXi3rJw%2FirHqe%2B1TmiEQ%2BBENAwbHdfx%2FAi2Srt2nmekzbstE2PQ61%2BUsnfp3WOycYH2yc7j64JyfuqDplwDjJKM2%2BCFDjCD36V%2FCRYRPPP%2FKFUl6AmHIkJugsBc%2Fv5himOrsdbv%2BwFsJOmhuF6E7A5vps0h9rjprmyyoSmLOeye%2F1QToCZUxY2QBHw8g4%2BgYy7XmDGbynV3CT73%2FDudmDDuNBTN3ATF1FTqJK6rz%2Bp3NuIl7qQCaMioV%2BcZtSmT5zIUUAOxkdNpghKxgbQh0wB4p3UdqyQK%2BWhB536%2BAKyj%2B38IEEwlY8GyBph0ddkDcoLHEp5oA8eP8tsCLs1xscbotZJQ2176fmBGuYRq6mdRkcrlxptBFadHn83ToPHDI9dNrQ6KAfVEDHqYCo7yytXpbh98vjngiBXheTcBL1%2BOp%2FzCn1IbltFEMPfY%2F8wGOqUBUY1z2NZzeN5VEbZIFUF7jmp2NiXs97OvikxbpWQO0MU3SdpUKFNrHlyyQpwTlX9gK0pRRxGYKZsA46sRh7CRu867LjN%2F7OC%2FT6VFyaajNJuRzGuwMc0okE3qxeOgEvO5Q2pVxqFSwjqE90cyHG0%2B5jhw2VyRAuDjVIZYXbbJhbLtecqAQsT4K52Wz2fSH9t8N%2B5toCZSRdLqeg8MktTKDYEXxrzB&X-Amz-Signature=4f62011a1ff263361f0b28a97070cf7f1971e664b7389e0f412fa29729a54176&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4VHJUYC%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQCJ59oBeWXT9OEknYKheCRwyB9dDYdWHSFy9p29aOFoYQIgcLhDKWJKEh5R0d1as06GJUcUh5qbWuDrTxRFSpuLwwIq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDKWems90PRMdDyo0ISrcA3cepLXdH7Pjaoo0k32bwMSVKCW%2FZZqWj5kgk752YsyX%2B6M3Vs%2BJuJSP1Oioo%2Fg2UEzYZkECFAv2oVmFsXOQMtkxWdGGbm1OSKZLoxiAbvwSkjMyC%2F16WSlPfSbxN%2BmkdDgVUNpOaDz6%2BFl03Iuj9OG6hx7SihKiaUAAGuo2AGwYAfP49QO3IyrwiJ5tYmw0EwEBhIRKACNcjq3m0JN5rIUuVm5c3E0VsnoqeNIYwu5Tn5VnwRzbJNVOLEjGmrz%2FGzaXlYPsTlyx3EcK7JNVThGaGzpC6MDA0EmOiuSlflOmtmoNZCTe0y%2BAASFH4X8Pod1BwLP48UzAGFMWMSQ4Shtai63W4xdkn9J6F3i1ZFYtqytvB5lDdn302t3ikaofb%2Bb2gTWrIKTCFjppmH3sCBT%2FqdLU59iYcVfOL6QOAdqlmYx%2BezJbChu%2FaZ6XwUMaxkv27yw1hWTzUMU4jnBy5yhyXVKrOqXYR73PK07iinlUhEggd7bbFHeORcSjab7eMIA23MJO6rYPadt%2FWKutD7Ecas9IpUijhv4agxloyWF9yybUYcLOeqNJCR1KxwXcK2wZAJTiq8%2FxnKFiIrI9SPGEi9erSg%2BUqAlPJuaAdcIZoi9n361N%2FMZ0oY1rMObY%2F8wGOqUBQRzAJq3IaEyCa3W2RMk4WipUQ%2Bg1FMkq68TH%2F6BN%2FdW4Jrr0NzTiyphVo%2BKt2g7OGiqXLp21oODVKhmd9yV%2F55%2BZwkxDKhf0G7yUiXjvyWGLuCQ43bIwMXvVOfC6tjPuSegYQX%2FILVKopQ%2BKdDEnWdUu5XdSDN00XQUj4iAYMCPhUAkw1%2FkMw%2FI1yUWYXLYV98qkMHcE6LDVKVknFqhwnTaNTfw8&X-Amz-Signature=09c11572aac2e9e11ecf931007e5a638fa0d0c717648ad9b98b8049038479462&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DQWDH62%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQD5qbnJ9OZp7IuCMdkidkj4KXPAc4fyS%2BHe%2FzvRwdiQ7wIgdXwbUGxwa0z7JwJEogaJ4VbViD0eeu7lfKBAIIPVKk0q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDKbmx9uocaoREnrErircA6FfOVIkHsOWKNJXmBTTOeIQ8edPsHj2f2%2BTLmcfd169JbChNRcs2IMa0%2BhG4TCyNEn%2FCftgp1p6o4OzYSNhi1nAx5l%2FBgu79BLl4%2BZ7Z%2B1adHVPNFczHgvw3oMjagyYTmlbVOb4tvmQZdaVIsMS5P%2Fs4oOSmvf3saZPULNZZggKaZ1JbA74pLvxSQdOhSMRtiaEz1B%2FfzVAxe%2B9DTTP%2BHTaVMFohRTHmT1yxXXXZwzE8gtNuyHKneXGzs2%2BNw4Bf%2Fye%2BFDoB5IqiT7yDCTB2MCzwi9xQ8jR6lAWFf1qFcxF3IE5G%2BPykp7S96jgxPNxUvOHaZDsNL1jtNr%2BIp8SX8USSFwBkp%2BmikADaSobP2IAuC0madpVXCiLUYjpyisjaM%2BE%2FzAk5OEq6RUNiPpOFYW%2BnuIZk8bzMOt89K%2F1J%2FHuu6JNEcnj4M7KSLMZbMEPUhz2cRNk7ZhUMM5rENuMAObUSXnMhfNnTKVRYSd2YRYExt5GydHMTZkcMfiNJ%2FeUSK7SATjtZ%2BYHf2kbsqTpI8sOeaZEUgEC%2FMFGWYGU1x6eP7UwYDUEs94yzm8iTGjzFHFcNLGg%2F4OoeTA7FnGi4LHiqeK4mCY0o%2BYtNDpUwSnZio1sVrFydjJHAoe%2FMPfY%2F8wGOqUBweA0F43QOiM60ilGOoyrn0XPShWHoLlXwngGnQYWqNuVrIcY2TWehmtfWQTksVy4dxtCf8jZgwq8DNZiwwSF7LsZxBf8sJLT7QPkPb4ON3f%2FnhzhqG3171bu2W8F3Ri2nTBG9IiFqOV32h7XPf2mOLh1MyAQUZcbetZoMkWvj6AOrMchxmOATRZWUcZYTIFIDzNJkFn1JVIZX1uEWmjGonHo6WpG&X-Amz-Signature=5452d465f2c04af516ae4bb4c46219a5ecdfd6b9dc7525db5553b679a0a81ffb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4RKA3ZM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQD2amUy5yFi6vmQIMpmF2LlcdJTlbvPB9J24gVwtHvZUgIgMZWB9lAJdfhCo9%2BaIHrIxf3TEX7rf9hlxa3Ez7SIFfwq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBNGuJ5rmwcS6rah0CrcA0YD5YUI6OHlAWoLOhSFQVDjJa%2Bp7ACXGKXEkuMabi17%2ByrS1wP7IrVfCIAcwECHS7%2Fu2LeK%2Be3PP%2BxP6o8jwJPQpJXaYEd11kQFqwQxeODenl42gcHpQoVYHQbFq9Y8M5ZaGUgh2LfUyLcBPVlco2KIT1MagIH3%2FdUyy6YLdxkJ6EIDgB%2BaDgiEEGaxjckoxK8szjc%2FNlXfHfzARPbSzTp%2FkEBzdTjn4%2FHy0EAdqLCH5IE8%2Bv%2BvHVJ6Xo2kCtxS6FEbvON3j9D0CQGEuYFZGUUD7Whr%2Bjpnb8xsMTNaADRy%2BkYpAy4qJ6j9l7cNZ477WNdx5t0JrsBOJSHUeW4TmxAGRsgfot69QjFc6e44wj95e0mXfxv3bupmYHiXFcyR0IHN8HTY8bEoF1xIkV%2F4LwCtn87T3QcUxiqzo9xANTj7YojQ0OVoxWDEMSIIatPMothwEBhjCc%2Fo024C95WGUh6YtYAv0ITcj3hL8HBN5mwMI8Z0vM8MtvUMJg9v%2BpPTf3Bs0BapTDPiOk%2BweDr1kr7Xdm4Gy3vMei%2B%2FnQQarfnxZNBQasq%2FXG7hq6mJyk7%2FJG9qvJi5Bdp6rd9Qd%2FyRJhQEm6LcI7VBeMzKml7UERI%2F6b1ch7sokfvC19A9MIbZ%2F8wGOqUBioYeVaFOokQ6XqL2rmDvmU5QN7pwb4937IEdY1AklqoD3catKWlTc8sv8Cma8rZUI7pdZZBHYbQr4GEnSw%2FAroYoyKPAEVzoIW5%2BrQ5nlvRUR1tvr7BwGysktr6fvdH4btDwH1UorEVyvnsjwQCSw7IcEfSYawQlpwweUJLTXVbeyPrHlcx0VSmuFL7MwzPSqbcKGTHD1y9RJqe1P0RKTaF5%2B5f8&X-Amz-Signature=46ba2bc7cbe247824dfbf17fbac50ee5620cdc827a5f0721fdc945b5a9576504&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4RKA3ZM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQD2amUy5yFi6vmQIMpmF2LlcdJTlbvPB9J24gVwtHvZUgIgMZWB9lAJdfhCo9%2BaIHrIxf3TEX7rf9hlxa3Ez7SIFfwq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBNGuJ5rmwcS6rah0CrcA0YD5YUI6OHlAWoLOhSFQVDjJa%2Bp7ACXGKXEkuMabi17%2ByrS1wP7IrVfCIAcwECHS7%2Fu2LeK%2Be3PP%2BxP6o8jwJPQpJXaYEd11kQFqwQxeODenl42gcHpQoVYHQbFq9Y8M5ZaGUgh2LfUyLcBPVlco2KIT1MagIH3%2FdUyy6YLdxkJ6EIDgB%2BaDgiEEGaxjckoxK8szjc%2FNlXfHfzARPbSzTp%2FkEBzdTjn4%2FHy0EAdqLCH5IE8%2Bv%2BvHVJ6Xo2kCtxS6FEbvON3j9D0CQGEuYFZGUUD7Whr%2Bjpnb8xsMTNaADRy%2BkYpAy4qJ6j9l7cNZ477WNdx5t0JrsBOJSHUeW4TmxAGRsgfot69QjFc6e44wj95e0mXfxv3bupmYHiXFcyR0IHN8HTY8bEoF1xIkV%2F4LwCtn87T3QcUxiqzo9xANTj7YojQ0OVoxWDEMSIIatPMothwEBhjCc%2Fo024C95WGUh6YtYAv0ITcj3hL8HBN5mwMI8Z0vM8MtvUMJg9v%2BpPTf3Bs0BapTDPiOk%2BweDr1kr7Xdm4Gy3vMei%2B%2FnQQarfnxZNBQasq%2FXG7hq6mJyk7%2FJG9qvJi5Bdp6rd9Qd%2FyRJhQEm6LcI7VBeMzKml7UERI%2F6b1ch7sokfvC19A9MIbZ%2F8wGOqUBioYeVaFOokQ6XqL2rmDvmU5QN7pwb4937IEdY1AklqoD3catKWlTc8sv8Cma8rZUI7pdZZBHYbQr4GEnSw%2FAroYoyKPAEVzoIW5%2BrQ5nlvRUR1tvr7BwGysktr6fvdH4btDwH1UorEVyvnsjwQCSw7IcEfSYawQlpwweUJLTXVbeyPrHlcx0VSmuFL7MwzPSqbcKGTHD1y9RJqe1P0RKTaF5%2B5f8&X-Amz-Signature=fd7673b08d85a58996ac8fdaca6d6bb4e1d1262eb47c6a5737c4dfcec4c39996&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VITO5K2T%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDRp16RmckHn1NKxDoHNkB1KGqIWZjKJYls07KWPFhcvAIgeQTwDxFcEzHP4wlHJj7i9vb%2BMEimqhBgq6IuYVRwlCoq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDLtMJFoxlrV8HeKpRCrcA6sGJCh7FpEC5o3AruK6zARbk28Wh7J%2BBQJDWRPMM1R5E6nLOrIKOCdnwdQl5mAFsEUEWsoNBYYdfeEYxP1PBxhyVEnU030yRCd8guHwiq%2FbXoPMFqXQjn2%2BC2AZTDR%2FdzVAVZmbAntrP61L5jYWyUxQJqghna93WtXHLfTnxCe4cqTLrlxXJr0ZGa9kgQRUjASb%2FCHlP4NIxAc9Kz4c2ZXWrYgTJ8%2Flx3HezFNbrBCz0NaVk4NfVbOPqr5t1usfIPD8ku0c3zxxv9hDOWfBKtKfwsI7OW%2B3wMrVhrVh%2FNPHDGZtrKjXETD6XjBdFzkqstbQSYHlfAcOLYmRPtO2FPIAC8FS0ooNTICAsWWc4QKbFiFbBqF3ot0ufJ1c9%2FLsstOYpE9rcQ%2B%2BOXu%2B%2FyRVjjNDdQFzB70cV6v0s6GJydVCmPnsIHL1fI%2F3PU4fs1Wi3v%2FC3%2FsUIY4DcEckb4YbHPYOfpu1bar5tbpeqApf3PxJO1Du3ioliyv5xzRHIyhDzyKYfqd7vcEyXvoOeiWxs9lcvT7MPyXnh55Qaa17tXaXUxuxC1T0fUKB2xOLiHuGfSjqk7zLut5svUgf3AL11q7GZFWwQ6rFrJz6YJISyOpSkfWwlnm8e6mQRE5NMM3Y%2F8wGOqUB45LfrGCDfn4jK2T1p3FCi9roXnvYkIBvPpbcAZWuMQUJU4f37zl%2BIsr%2BqeRa%2BpvSCGtTbPcevH5UbvUZzvUHYiwu%2FYUndmbkgLNRFQKv2LmyZdCGq3lXTVwh5QjTubiF81y35T3va29x6ml7IlATHKtiR1hux7VISPCd9tlVr5q6q4C%2Bo5KLRns8LGjzoJt2pcUJ9pu8JlaB6YPNVwzaxUjwOaBZ&X-Amz-Signature=c5ea73e29228cafc9042e9179f82085aab32191f1d53dd8d909a403fdcb5288f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FMCQFOQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQCUnVhIXsFUDYBN%2BexcuULF4uovA3AjjKYdzImzTDI0lAIgQyfG6Ds8Xa49qRFnz1F78joW1jY3HhJ5bR0ar5%2FK8xoq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDCu3SPXwrNnAW0Wc4yrcA4JK5Pxrac%2FsDNkKHAgiIIsqyA0PWG9Vh7nYZwvcM0g9VW8d9%2BvKGdGQsoCxbDt%2Fnt0hekwF36URzqdJ%2Fm4t%2BTSnvgYLyuv7jkpk7JDi4SPM5bvcn0pYSf7fDENzcafYap9%2B2fAVgelGH8dPYHgTLGghsJbLeh4ExwfJz7DIlA528p4mAsB718zcUhp0%2FfBiflLmG6ChMrFFBE4j77BuVi2anzM2cjtU%2BXE%2Bm0enDzRzx8Jp0tHTnSf7vsGGjBJRWcD42ZUR%2B%2FY4zXpFqhViLsEFRMqL9c1dro3MEJPiyIOChcB%2B5WPVJeGNoQSPFp8cTMSukkLdIOjWx3zQd6sCM72kB3A8xqD1u9%2BmL6c3J9uuaJe4rKo3KmqrvZuauIDgOy5dyduU9Al1S3aFMEBRmOqw2rcpv7R4ai073Vo8gUFg6fdWsFY1WaCdCua8JDTLzAdfr00GRKTlqfzUtrdR5U6YAIt59bPAoEjkmp5f0WQctpd%2BIbXDCDGJDC5uSZTwaYeiQ4L%2FTQZCLtoxqrYskgYMKgIKuRys%2BUDFUbmT2hz9me9mer4SradIbg2ImpFd0PMcNjmUBKi7ytRrQJq8Ojr4xdRc%2BhhMoVRYRiDObc9qBP90vMiHOdSeXnzjMKPY%2F8wGOqUBSBEzi1nMqIXikHYBYMteTEll6deIcYzyZUnDyDPychpZrFnec%2BV3w8nxGG6ChlZMlwRrpB3mP4Tb83DZG6gMl%2Fw6uNhbIlz07ERL3cZqAKKeXYpeRdz2ydGJj0%2Fp7MJ22aoxyyLZa4sCaEfKwQIqAFaqQofT5n2vBmM6zI2IDcVnEaQ7Z86WYRXDvUnoS9HuADshi2H%2B9kyzFCHqjoflt0ityzBC&X-Amz-Signature=818ebfa56e4ec0c35aae547e2afb9331f0c69cf63c80a990e88bc2dbcfcf466c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FMCQFOQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQCUnVhIXsFUDYBN%2BexcuULF4uovA3AjjKYdzImzTDI0lAIgQyfG6Ds8Xa49qRFnz1F78joW1jY3HhJ5bR0ar5%2FK8xoq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDCu3SPXwrNnAW0Wc4yrcA4JK5Pxrac%2FsDNkKHAgiIIsqyA0PWG9Vh7nYZwvcM0g9VW8d9%2BvKGdGQsoCxbDt%2Fnt0hekwF36URzqdJ%2Fm4t%2BTSnvgYLyuv7jkpk7JDi4SPM5bvcn0pYSf7fDENzcafYap9%2B2fAVgelGH8dPYHgTLGghsJbLeh4ExwfJz7DIlA528p4mAsB718zcUhp0%2FfBiflLmG6ChMrFFBE4j77BuVi2anzM2cjtU%2BXE%2Bm0enDzRzx8Jp0tHTnSf7vsGGjBJRWcD42ZUR%2B%2FY4zXpFqhViLsEFRMqL9c1dro3MEJPiyIOChcB%2B5WPVJeGNoQSPFp8cTMSukkLdIOjWx3zQd6sCM72kB3A8xqD1u9%2BmL6c3J9uuaJe4rKo3KmqrvZuauIDgOy5dyduU9Al1S3aFMEBRmOqw2rcpv7R4ai073Vo8gUFg6fdWsFY1WaCdCua8JDTLzAdfr00GRKTlqfzUtrdR5U6YAIt59bPAoEjkmp5f0WQctpd%2BIbXDCDGJDC5uSZTwaYeiQ4L%2FTQZCLtoxqrYskgYMKgIKuRys%2BUDFUbmT2hz9me9mer4SradIbg2ImpFd0PMcNjmUBKi7ytRrQJq8Ojr4xdRc%2BhhMoVRYRiDObc9qBP90vMiHOdSeXnzjMKPY%2F8wGOqUBSBEzi1nMqIXikHYBYMteTEll6deIcYzyZUnDyDPychpZrFnec%2BV3w8nxGG6ChlZMlwRrpB3mP4Tb83DZG6gMl%2Fw6uNhbIlz07ERL3cZqAKKeXYpeRdz2ydGJj0%2Fp7MJ22aoxyyLZa4sCaEfKwQIqAFaqQofT5n2vBmM6zI2IDcVnEaQ7Z86WYRXDvUnoS9HuADshi2H%2B9kyzFCHqjoflt0ityzBC&X-Amz-Signature=818ebfa56e4ec0c35aae547e2afb9331f0c69cf63c80a990e88bc2dbcfcf466c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGYHSRUL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T074146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIDLwB%2B06TJBOFZthXVbocRyVw1ck0JIKbpeuoxqFZryNAiAFG%2BlI6jjL3xtMSVe8q08OyYDFfkZF8vKPpJBh8pdH4yr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMe2uD0bncY42jxnLqKtwD33cj7fgnjvhBbisGBT2nqC%2BlsopAPtfpM%2BiSRDe%2BHL8WBUYgAVcIU7zykoRX2uug3yQu1WbdNhKtCdivgNGD7Eb%2Bwnjos6gddAwcGhMmn8p6eUNOQIoMNnxdRSJj5V3mhJsEQz%2FmHF83Eg4YL90987efEcYli%2FdyyOcq0y6yfimKzYEldY%2Fc%2F%2FkuoDsylKbbPih40lXnCkgjjEMArFr0A6g4ORovLjqlVrVb60o8rUH8zjH0cJvzSS5JPGrSqQ58okYj9ol2DOr%2FGQl3V9%2F%2FvLUFKlg8vY3xlpUYZJIRGpabLaXEIYGrWlGz46LIL2422nkP7TwmZHhtA1Hr5A30vnme935C%2BDQFyq%2B5fjaIUCvqgIw6DkXEhWJC5gER6%2Bzmt%2FloKMU1Vjao5X6fbEfOiqKSYjuJIvDZETcOFXaRGFlih57pACuaX0XqXYAWQ6U%2B1tgivNGDQOIdKSy%2FEw2imvYWATvdIbb2Y0GWKjtlOxmVXNPEvb%2FwD4QMMmMILE0ezHEsHJrBccf4UpyQGUHAz6taAy9NSHN6chaGmERp1EMETUSbFuj76%2ByN%2F0ehRJfyJMatXbeqUYeTo%2BtM1VES8ngA3n%2FgJXehxhcDEWOZubh8ex9TprgHwAZ5WpQw09n%2FzAY6pgFLlk3vzQm%2BLVHGbCIQve6fYVAigIs7K%2B7tF0hF%2F1G%2FpPjcUrX66yugNW0RHR0M2gObkLJT7VSMvfKUSD%2B4XOPLENoWqyFnX2v3KURFOSoxmPT69FElzKLeChtM5%2BCa5Z78FBAyx04qukgAJLs9mw%2FguQNEV5sNDY89dN8MZxP5qAamuT37nVDbEBcR2DSTrkVqMM9bQJLgArrlJOHWV1W12vqx9yfS&X-Amz-Signature=fb4ffea0a6a52b56fa8553fc7c6132097d77105974cd51fe7ccd6cf92a84ec7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

