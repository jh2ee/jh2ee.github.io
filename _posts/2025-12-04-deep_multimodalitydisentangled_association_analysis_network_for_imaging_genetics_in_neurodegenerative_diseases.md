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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIU36MZX%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCrCJGwlAS73n7GvmLesBkr0hcYJOeuP7CxMi6enEOY0wIgUAxZw2FoXKa9V%2BDDPR5iAk1soj1eOrXZDOivRTN4ByIq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDEgp0rEriQh%2FBGh7OyrcA%2B3wt2ZlKwa6fEaWjq2foKtNnrc2FMdTybo07NaVW%2BHlIO%2BEijuTxiPEncAkSkHHDoUcSlwl9f2zGIfAwpaAgUf6CofNekRebf%2BgQU5iKOMa%2FE%2FU6gQ4js029pbX%2BQuysoMFOTAgRciU9OpoGhEFwX88eAobALCmIQT%2BT8aoZHSNQfKlpwWmB3wXWHnV9MFX2cD7nZSdFtwIvZoLESrxgUbvq4Ls1oTa7%2F2lk8hxHUAir1sd0xqSCwqxIawYlE4r5iy9JXxO1JKTq0dBpf4EfZsw%2BlJOUXNs1kfFlEhSh3L1Sr6xpuQsG2JK3%2BKlH%2B5hzJxOknnQrzs3F6SbmV8iVWsan7PZP2i842tMQO83wJdapewy40LcmHx7jA%2BSg0PTiA5BivUDRXGnEvS2FtFQL6Cm1YhAq9vzq5dwQaaAewZ1XdIszKVy9vl5WTOrNEwphTZvygu1Pl7D%2F1ZSiwVrwZwwvAZRDSNXMu6Qm%2FattB085ZKTPZfbEd%2BJZccQNIhvPw6XUgWD%2BqtgTRViiHKy93rh7LXVnFMN5uyTkdycT12KLGvqAJQpJfnIbviok2WMVPYRd6UA%2Bcwwe9P8nWthL4862YjW89ojnO4qQAcP5EBbB%2FqZC5fYhiS5ml%2FPMN%2F6ossGOqUBD5QBWgxbnWhLWkh6hqeCuUr9PuI0wNlYE18PkiBlU%2FpbaoKGzIMe7hhK7OwBpOHxfsvpKwW7hAXa8ZIhG6Ph3fIbkXKElmo0DKbUW6Xm8bHlfGvp4PyKiX4ms3MfCfyoaZoeGa%2Fp43unBrgG5UxcP05OhGXu7oBoX1bWgsHw3Sx00uB2mY84nQhlqbVQrnp%2Bba9kPfir6F9uSmnQwST07umKx2Xi&X-Amz-Signature=7ba494782cbfb7031cca23ed275965c003e67816ab3f4d59f296abdeb5e9ef19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIU36MZX%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCrCJGwlAS73n7GvmLesBkr0hcYJOeuP7CxMi6enEOY0wIgUAxZw2FoXKa9V%2BDDPR5iAk1soj1eOrXZDOivRTN4ByIq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDEgp0rEriQh%2FBGh7OyrcA%2B3wt2ZlKwa6fEaWjq2foKtNnrc2FMdTybo07NaVW%2BHlIO%2BEijuTxiPEncAkSkHHDoUcSlwl9f2zGIfAwpaAgUf6CofNekRebf%2BgQU5iKOMa%2FE%2FU6gQ4js029pbX%2BQuysoMFOTAgRciU9OpoGhEFwX88eAobALCmIQT%2BT8aoZHSNQfKlpwWmB3wXWHnV9MFX2cD7nZSdFtwIvZoLESrxgUbvq4Ls1oTa7%2F2lk8hxHUAir1sd0xqSCwqxIawYlE4r5iy9JXxO1JKTq0dBpf4EfZsw%2BlJOUXNs1kfFlEhSh3L1Sr6xpuQsG2JK3%2BKlH%2B5hzJxOknnQrzs3F6SbmV8iVWsan7PZP2i842tMQO83wJdapewy40LcmHx7jA%2BSg0PTiA5BivUDRXGnEvS2FtFQL6Cm1YhAq9vzq5dwQaaAewZ1XdIszKVy9vl5WTOrNEwphTZvygu1Pl7D%2F1ZSiwVrwZwwvAZRDSNXMu6Qm%2FattB085ZKTPZfbEd%2BJZccQNIhvPw6XUgWD%2BqtgTRViiHKy93rh7LXVnFMN5uyTkdycT12KLGvqAJQpJfnIbviok2WMVPYRd6UA%2Bcwwe9P8nWthL4862YjW89ojnO4qQAcP5EBbB%2FqZC5fYhiS5ml%2FPMN%2F6ossGOqUBD5QBWgxbnWhLWkh6hqeCuUr9PuI0wNlYE18PkiBlU%2FpbaoKGzIMe7hhK7OwBpOHxfsvpKwW7hAXa8ZIhG6Ph3fIbkXKElmo0DKbUW6Xm8bHlfGvp4PyKiX4ms3MfCfyoaZoeGa%2Fp43unBrgG5UxcP05OhGXu7oBoX1bWgsHw3Sx00uB2mY84nQhlqbVQrnp%2Bba9kPfir6F9uSmnQwST07umKx2Xi&X-Amz-Signature=7ba494782cbfb7031cca23ed275965c003e67816ab3f4d59f296abdeb5e9ef19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUY6JKQR%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIGStJK5KiP5m79anufUjIJAxq5G%2F3ucb2yy7e1p8e0vvAiAPAOtSCA0e1mNRO0gIDnjnk1a8rbyiclTubFaX4ifhjir%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMIMy2LUSEP%2FQ9Y91%2BKtwD1jQm8SVE5C6%2BV34gZ14PuTuTSfiX%2Fa%2FB62zhSt3y6EIDPpZrXpc1iXtMbLcIV7iwBVnMd5nuGFgNa37NYcx6v3eXt0VP94Z2nIm93%2B0y2eX%2F81%2FW1VmMnjSyU2EDwF4aKAVKJJZpVFO1Px2SYczKBOrrygRbOuzDsBG4yKg5vIN2R251vlq8%2FwUp5wL4dxRu6P7ZssRZVkKjBBoZBGmYFgY8FoJMTuXOIpXpv5171KohGcDHW%2Fr3axnqlxQqBEzuk5UXVOO%2Bo5rfuI%2BLWYBraJ01IGEelkwy1m0knBQpbS2Y%2BS1g%2BaQtmLsBRWJ4%2BRl5zqs1S4nYMV1Bx4nrnay7AV%2FAWKSnrpQK8eHuxkrL4MgbPTGph93YTYCrPgsYbqZip4ED%2FtrC4KnJCC5GeMUDiiAC%2FcV08%2BKZU4RoqmXN%2B5homa4wIUlOlNspyn0zHTGUfeDyTkRheGu45XOAE5A9yn4TuuHPoQeLR4r%2Bz2WxWapyJEt3olX5EXCGJHmMcxRcaF9scj7QTssbty23ksohGoy0o2cr5F4qna8ca2U%2FQz5ilTRY3l%2F7LPQyne8mcjFPCipw9fWyL1sjF7sr7XIQ6z%2BR%2FF%2BwFQWrUXlX%2Br5tg6RdoHNvemkYUCnPZ%2FswzfmiywY6pgFDhduPDy3l%2FhXC4g8VDttO9pC2dMNkMwnlhuikuXNvA7MOS5ralUa6B7vDxKzNGfQFjHwfsNxQTmvHF%2BbtaLlG8C6KxusuwkEJaDxbzo8KSRscxaggvDOyWasustoMYpkL%2FPo4UJdpY5MiVMpNHhAx355pza4uf4Ir50Ljhxq2j9XDoUydmTMIkHEoQQEIDfVbkbZCHTi%2B7mmFAsiz%2Ff5AmY5KEHIt&X-Amz-Signature=38a749325fc415d9ab85c7f139d90637a4fe852852dea09bc81f8ed730f7b250&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCRN5CFU%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJFMEMCICnbUNOgUCbKm56GZD%2Fe%2B378YtCHitzDsc9VdlcSVI41Ah9rD%2BSd2sXr%2FLRWuUmXUNCHXX4XzZ9qmqUHcxj7MciXKv8DCDMQABoMNjM3NDIzMTgzODA1IgzVoejaotgb0GwlJmEq3APCOeNLDSK9urginOUZVG3QUHk8X5Cp3gEwoO%2Bjc4%2BrxgO6AYtk67IcWRSP2jFdBa49k7%2FBdu4xPRGzWH%2BPNWM9YQtyyGGkLKaTAQUpqogbsWAOYYMaSqLEPVuNQSY4FydElbxWAvVyFU2GyTf2TzTCAWZqvLoU2yt6wS%2BOjTVSZ7XQq4NVQ%2B%2Bprd9SL41CyfMuJnUuzGCKCRk%2FfaLKKwAUT8LvwEUUbaAPVOhtgHHf2QPgvcZQ9VAzksg98rkhtgJre7YkoPZyELFuo31XEk8mXGffTUWrVSsmfuR%2FJ8ApT2dZu6VQJK1dFHDYsxiYZSd375E9Tp1Q2qQCCziB%2FaVxzGCqAmhNj3xp7YIkkku2UUy0ZMNCmhPFKollEJ1DcPIH0%2BPfCEY6DEQIqOIg7MIxkreUFRhtcUEecs1VR21EF5TTVc%2BhO6z0c6bJHPOJ96GJeF9qBzu8fBwce3qwmM3t6lvT8M2pTEU3in3L306xhQvn5YXF4EJPAx%2FWm2mniMDJ6I7UZasfrS0I%2F%2FusxQ92K0Tq7KTvKtLs0WPbZ5ka0Psi%2Biw%2FhfyFbeuobExf%2B%2B%2BLRo907vkKpD54dAL1q9HCNAn6UYFL3nl3KUxfkTErEpWAXXKa8s5Y9CoTOTC8%2BqLLBjqnAdxYYweYFR6PIHwvbzxgQ8aHB5VgExAQM0cb82gwr15OxxTks89fCCPIPbeZ5IaSOTFZJMvCOFDSdFqI3IZOz6vf%2FDhZ72hy%2FqNmBttgyGJby9Wmd605gENUgxifenaz25c0ZNMQb%2Fts9WJGaVri4aEUYQ1rPEneIkOhaQb4JmaWgHA3Ng2lRGR92qhf0JT0rbyzD3BxHF6blm8UEHNZMdjNgaJltMzc&X-Amz-Signature=ee3ef21d8ce72261cc487396430a36192f475ef84922d4131d66f8a1b27bc412&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCRN5CFU%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJFMEMCICnbUNOgUCbKm56GZD%2Fe%2B378YtCHitzDsc9VdlcSVI41Ah9rD%2BSd2sXr%2FLRWuUmXUNCHXX4XzZ9qmqUHcxj7MciXKv8DCDMQABoMNjM3NDIzMTgzODA1IgzVoejaotgb0GwlJmEq3APCOeNLDSK9urginOUZVG3QUHk8X5Cp3gEwoO%2Bjc4%2BrxgO6AYtk67IcWRSP2jFdBa49k7%2FBdu4xPRGzWH%2BPNWM9YQtyyGGkLKaTAQUpqogbsWAOYYMaSqLEPVuNQSY4FydElbxWAvVyFU2GyTf2TzTCAWZqvLoU2yt6wS%2BOjTVSZ7XQq4NVQ%2B%2Bprd9SL41CyfMuJnUuzGCKCRk%2FfaLKKwAUT8LvwEUUbaAPVOhtgHHf2QPgvcZQ9VAzksg98rkhtgJre7YkoPZyELFuo31XEk8mXGffTUWrVSsmfuR%2FJ8ApT2dZu6VQJK1dFHDYsxiYZSd375E9Tp1Q2qQCCziB%2FaVxzGCqAmhNj3xp7YIkkku2UUy0ZMNCmhPFKollEJ1DcPIH0%2BPfCEY6DEQIqOIg7MIxkreUFRhtcUEecs1VR21EF5TTVc%2BhO6z0c6bJHPOJ96GJeF9qBzu8fBwce3qwmM3t6lvT8M2pTEU3in3L306xhQvn5YXF4EJPAx%2FWm2mniMDJ6I7UZasfrS0I%2F%2FusxQ92K0Tq7KTvKtLs0WPbZ5ka0Psi%2Biw%2FhfyFbeuobExf%2B%2B%2BLRo907vkKpD54dAL1q9HCNAn6UYFL3nl3KUxfkTErEpWAXXKa8s5Y9CoTOTC8%2BqLLBjqnAdxYYweYFR6PIHwvbzxgQ8aHB5VgExAQM0cb82gwr15OxxTks89fCCPIPbeZ5IaSOTFZJMvCOFDSdFqI3IZOz6vf%2FDhZ72hy%2FqNmBttgyGJby9Wmd605gENUgxifenaz25c0ZNMQb%2Fts9WJGaVri4aEUYQ1rPEneIkOhaQb4JmaWgHA3Ng2lRGR92qhf0JT0rbyzD3BxHF6blm8UEHNZMdjNgaJltMzc&X-Amz-Signature=de979e28e1e4a8d200179da4f8a22f6de89374d10b36d0703f1db43978e4f0f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FHDP5ER%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIFmEfTA7zRvOgJqTnre515mF1keubEbKK7lDX4oD2XnFAiEA1zuMVGchAI6bH%2BguL9fcRx5CdF6cxWV%2BQ0r%2F2faQ7BEq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDCJDvuRYjJFynbuLjCrcA9LhjgjRASVg8ZUhCr5QeN5OaJN%2Bx5W%2BurCeFeP18l2XfHcfw%2FHDiWbbgOIrGeRy219L2EUmVRSC5P8LmTKOhZ93etTYYRV9Dhz47gPMR%2FYUGx82yKzgWy3QwJX4xOdGjX8ycD0%2BOS2new%2FtzzKz%2BGhG3SeEPeRBGSIZ1VIX7Xitfl%2B0GWYb1Rejokkib1JLASjR9Sv0omrkHafObVyCU4J2XAxEIs20t9sTdezy22FRmFn0aUY4oBWMCHAH3NZuYSeFEAvEkUn79PfByyBT2o4kCjXYXJQneoKtF%2BgruMaJJBLT9M5anj0AmdGusefcQEW8BwYguI%2Fmqob0ti5IOLrLqNpWMx%2BpW044cO1fafFgrb0hXlKVnNF1qOrdkBozhGUIuZtQuhubHv%2Fj6PDdEUlUn1CjL0iOEyYlOuGz8OWhVn1MkVlfV3Yx%2BPHWOIV3Y69aQB0KdYfMJFw%2B9XTnvZeA41B9UGjOwJmEzUzw3%2FfetkHlU3lUp%2FSEtpFJI2cwfi9beZnEhOXZkz6TSkDp67VOONoGJuuKm9Nk1MGC7YfBuIuQM%2B1ZLOYuy3SjBhiUQglwLZiAchOFOpuuc0Vd9OOesk4ZyzVhwLzvHB6fjFBl%2BKtYMfjnVwmwf%2B5ZMLH5ossGOqUB29Z1KgKjgjYm%2BEHxOSN9CGoUvAfZ2%2Bwh0jPKNZEaPdSab5FCN7XycL3iuwo%2B21guJCjMoO5MI%2BpLhIQ32filuzJLsteE4ca9JrCJRN0pTjQcaYHpBbf6R8j3K9qaxTfkMm%2F4dmckYgQMJNuxAuIF8P1cH0QGYT%2Bn30SzH%2FiIx36YLF0REKvfR9G2Lkp4bOtOUgYenGFr6N0RSkmRKca8%2BnqFVs0x&X-Amz-Signature=bf2f7ed396298abce4271d9e16582701e180c127c408165201faa6042273a2d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q44O2ZOF%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIGi21sRd3WCRg0DWbtc2StFHr4qjxFWSbjWBG25jBlMvAiAtZge47avGvFMv695iRJW2Ujzngms%2Bpr4u3TalBswAvyr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMmPEblYQzGfRKTr39KtwDjczSdeBESKNGjqwmyvoT8zgGHZkC8bo19Zl4SSLnfp8VfUM31HiSd6A8e8ynlHdpOQw%2BRLH0gyL%2BsyaxSI5H2uR96JRP%2FNN2lRxXCRQceYPdp89sWVwrabsQyXrFpzPawtVMMkYNMK4WDStKhSJ9DGtkV%2Boz1%2FBv8uTf6VEqkopFIAL8UPbk9Em9%2F7BoQRO6oLjxnhJ%2FbeNLcLmppSx52qdjA6PMMtF%2FYTOSRZkIIXEXSAHmCWaQTerGhs45wslHz%2F8SVVDn08e0TTaW1TPI0HIZ7EjbD8KphH9IBcwbEig7JZJ8ZbIHfm0rvIVFYdNQtSdGHHiWeV5tYJQ2Ifa%2BoOPUAjcHY%2F0PsIiy23u%2FHcX%2F%2FGTpdPuREM54Lg8w40F%2BPvomAqHG7K5ZKEywMPVxRa9v6ZsVgunMhHP0kJsWs7JH%2BlGQL4eoGYJIbdZ%2Bfi9yBJ0six9Q%2BQ7wpEwKH8pxTYOgNgWbsVLuq%2B3AmbXOZMw2AUuG5Q12ONpZ91Ok67EXyjjUC5aeJUg%2FcsC0YVs3kQjKOSEPjx0vNEVjT6kntHm%2B%2F2p964hWuukkogDQUBmGd9%2BcuxGIofIs1vsFABUf78mDMQ8oMg86tsHSD2tmWPTVosk%2BsfdQIBwAmOIw6fmiywY6pgEMOpdED4EAoG7Tdj54Vqk6w99jE4zbMH3VsEttmDgZU1I5tDQbg4BybfqNlHpk5f%2BpE0z47BzrLxeSu0AUyZ1R4JEFKxWp347Egxtjf5J1LzQbAe0PiJmSX5bbpZJhsojYu0DhGLxEjKVZzW6UTZQL7OfMbnx53oVCSCFVekHfsJFsdhPvr9Q5kDfK8dHT2uyju2%2FBV5ORaUILLfjiazlb4i1OhwH8&X-Amz-Signature=579b3b33d4efd350bca19e2c932f4c83318cf14400771288a2d106450a087661&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SCMKZVQ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIBLAaKn%2FDIi6KLbfkiNOu9DwA40VSR%2F6sFqjLmW8iuFvAiA4hZtS9HDbbVpjQbGR6Hur%2B%2B5%2FgO1OVyAseemKfJV1jCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMmXqtukITEKKkUHyeKtwDcZxOfet2UmSsUJeedhmo7MKanbuPZb%2BiJ1IG3YzgZsTbGCoGiJBoIHm1Acxjt8c4eUVMjonERucRkj1ZhVX787DyK6IzBblfLm%2FOJWHzcq0L6MtcNJosqCGYqVEZmjhaKcCYa%2FN3YjeCXYWIrFQ6zLzdqETVXG3blce6rm4j53tsvcXF6Al3p7ljc%2FXryk4CqmAAB6Poe%2B6YDvH69YzQ%2Bh1zq%2FXRVvQEOEaSEfj2h9mSJAfK37MYvzZiQoww1wjPFq0hNwXnyycQc1rYmiFmylrtEXkZiLIUqxJGaGBHhMp6rjuUDYSePYV%2BV5%2Flk2tnoKxijejxXcmXXYcBe2bQHadT21bUV1Ut2%2FZEOXP5gXheA4vb%2FLJFBsKvbwnLvCj25%2BhiNVuRPGX9UNvWoRrYnmTU6s6zW%2F%2BowR7YViNmU8txi6dmO1dXT5XTt8SVrMZ5Sjg9l1myCkE8IgNWer1SUuiXCspSIN5281mwFRK6cfH2YatRpWmQ1Z%2F8rk7bhjuf6sobu9JUdxRb7%2BZXzzT44gf3gOgECD8sk40nDORssQqXxzeiTWsl6mGWiyk1yqBl%2BiGwYATNqLpcabtFXSrXb8JmIaatZ0U5fiZc4%2BdV2nan80%2B6%2Blh%2BcPZG5kow4vmiywY6pgG4sAkQ7purFfGvTYvJHLEJ5HA3BT0b4F%2FJTZ0ddmCDL%2Bzx5syMP6Eyl7fu4eQgzxZOdD6jR86xbKua9sp9bJqikDj0z2koQW8405wSJV9xf7zH5P5eorQk1c6HmKvwHVYE7FOnLEx4xfLQYh8DI4BhK2q7A%2Fw8niPRUAuJ%2FSx6g6H8yn6OeBo5eUTD0Jx7qN%2Bkm1ETHPBFDaaMnEa7SFZjI7IelVZm&X-Amz-Signature=4613a841069e0b1c8f648e12f09302a63fc472933dd0d0ad1acae597268cbeb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCS32YTY%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIATM6cpB2flDfcJ2l33XhO5b5erXWmMUmgkb5gsQbbwoAiAgNjT%2BJTD1Tkk35tfBGMfAXpjk9ZI9kMVdGUfaPTRz3ir%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMpApQrhGj42Ran%2FJoKtwDoc5u5Ql1mYnWTCrc8mnZ9yA63v9791CzTcHNc%2B3NRr7RYUNLc8niNG1tWLanD0AiFv4jHHpYU8RHXRGSS4ftpdFyPKWjjRMqq9aJNnJRsRfFB9wS0MNtc%2FsSqacaueE5X4UA36%2FZlcY6r6y%2FQ5VPhXBxcCuHvaSGHMjuV%2BaWeDhEI2YhKh5uimLcvPTFgVtbSyzZtzxBv42RHOVlHeO16ux9t6rWObDijk%2BrsXrnV%2FLqSVrh3fI3rYYA0ax4e9jiQp6LI5TiWET41gG0esXmBw6ci7kHk5zWqwiQFpA%2BNuHeMB9HKnvYxM%2B%2BLXrInWFRQrSJD3Mvrm7NLZ9jALTzA4Jiwj8A99Q9EcTiEqyxOFy6it0XUFtv6oavhTtoMWKX4gMqza9vXaBIOZxru4y0RWB%2F%2FRg0Z2vh2N59EeiPJb0Gxwu8mt5exMVpgXApRtZFHf7Gj26xtdiyZNidBJoH4owlcaZhcIa8f3UM1zJRCgEN0U0E81w%2Fp2cXCIfu9VxpOA%2FICCIXcukNKA2euB6KN8fgEfTSxhp6Z4SU5ULCe3bo9fXY0wSmfyiLvFAeMk4eaYfTzQecPEmtNqc2JbcedXvQCR8E1ONk4HdvawL9A9df1nBHCF%2Byzm6Ugkgw2%2FmiywY6pgE7azSNS29za9r%2F2fUrBjJM07F9ZchOqE7b%2B29OqDYUTBd5U27mUF%2FtQpyZz6Gz5YNyGdUXDKnB2niuaXLrzVyNSrRUcFQF1Tq3qeGMnMgXyZuRRGHyNGgDMnk1EWaK030ohv%2B5s5xbs3bDCGjnoL8SMhXvX%2BOt38pW6%2Bh26ePhh5udMBK2yDiAzb3p5Il2qdQB5PB%2Fb%2B7IpQrI6DS60VsE7bzOXY4Z&X-Amz-Signature=262a84d5863e10a9e0b8a45415b41adad52899c0f970016af0a20feb91812bef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCS32YTY%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIATM6cpB2flDfcJ2l33XhO5b5erXWmMUmgkb5gsQbbwoAiAgNjT%2BJTD1Tkk35tfBGMfAXpjk9ZI9kMVdGUfaPTRz3ir%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMpApQrhGj42Ran%2FJoKtwDoc5u5Ql1mYnWTCrc8mnZ9yA63v9791CzTcHNc%2B3NRr7RYUNLc8niNG1tWLanD0AiFv4jHHpYU8RHXRGSS4ftpdFyPKWjjRMqq9aJNnJRsRfFB9wS0MNtc%2FsSqacaueE5X4UA36%2FZlcY6r6y%2FQ5VPhXBxcCuHvaSGHMjuV%2BaWeDhEI2YhKh5uimLcvPTFgVtbSyzZtzxBv42RHOVlHeO16ux9t6rWObDijk%2BrsXrnV%2FLqSVrh3fI3rYYA0ax4e9jiQp6LI5TiWET41gG0esXmBw6ci7kHk5zWqwiQFpA%2BNuHeMB9HKnvYxM%2B%2BLXrInWFRQrSJD3Mvrm7NLZ9jALTzA4Jiwj8A99Q9EcTiEqyxOFy6it0XUFtv6oavhTtoMWKX4gMqza9vXaBIOZxru4y0RWB%2F%2FRg0Z2vh2N59EeiPJb0Gxwu8mt5exMVpgXApRtZFHf7Gj26xtdiyZNidBJoH4owlcaZhcIa8f3UM1zJRCgEN0U0E81w%2Fp2cXCIfu9VxpOA%2FICCIXcukNKA2euB6KN8fgEfTSxhp6Z4SU5ULCe3bo9fXY0wSmfyiLvFAeMk4eaYfTzQecPEmtNqc2JbcedXvQCR8E1ONk4HdvawL9A9df1nBHCF%2Byzm6Ugkgw2%2FmiywY6pgE7azSNS29za9r%2F2fUrBjJM07F9ZchOqE7b%2B29OqDYUTBd5U27mUF%2FtQpyZz6Gz5YNyGdUXDKnB2niuaXLrzVyNSrRUcFQF1Tq3qeGMnMgXyZuRRGHyNGgDMnk1EWaK030ohv%2B5s5xbs3bDCGjnoL8SMhXvX%2BOt38pW6%2Bh26ePhh5udMBK2yDiAzb3p5Il2qdQB5PB%2Fb%2B7IpQrI6DS60VsE7bzOXY4Z&X-Amz-Signature=2ec5bcc9ca1ddc4007bed6364e965a344942354070489dd57d3c60257587f018&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZHJ6RFQ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCSR4t6accjlTt5Qn733XMl5vpiYcetw8z4v%2BkUlesj7QIhAJ0alWkfQPWdK9BrSAO8Yvl57xiZb3BfFJ1S5ZMw9njiKv8DCDMQABoMNjM3NDIzMTgzODA1Igx5mkV9UR77INfBhdwq3APmBo5BRuSvaURCpeBSEEYyof5W2YgwNWVZAiEtikcaJ35E%2FTRr6XqK6rRCaVDw8gOGwHovK%2FXAa3fFrr%2F7Ps90XXvN0KkV7brVMKsX%2BdWFATqeGWz8urTu%2Bnfsex2aZe40yLmkpk%2F1%2B7dsm08jGP%2FxwEtTPbGac6vXH439ssydghPAKEF7qDWiXfOV71UBmP2KEtc5nXb8QorQTrIdWJDSIKEslMmlb3iwrWKVgFDNvmPZmI0QQNk%2Bo0fM5tSH39G%2B6%2BlflciL1ULOgR9GV91V3sKkFWQo2qJFbEIhuCv%2B4eMaa4J9bixwPhPqlNhBIKEeJl%2BcgW2CpPDloDu%2BMRS2HtBB4CbaHGj2jLPtiG7nNPfovi9T9rTj4dBPfl8Fs1QgUlkpJ9Zok6pSeC0Lrks1%2BX571bn82tqeZUVezua%2BgBrOnAPSNvCVQAgBVE94UhJUseC7WNTSsQbnmnFiyw42YIjXEFISHMJU8icvqGXR%2FOmgRchCCe1oZOstwQ3YwbIeMTIwwcpmgEtbOuRM9VxK795d4J7zLJZtLUbbrubA7V5ZNMTSgApbJLg%2BPKTWZETm6jNLxTn6idw5%2FCIiPVL%2FffxAk5PAq%2FQn%2Fh%2BxdR%2FntD7rS5IJazGJvKoFJzDL%2BqLLBjqkATqO%2FIP%2BLiaapcbLsH8n8nThb3a6pwqaZjREvdgylWldZFWRSWG99pnPyIKQhCC%2BotziyxOXs%2F3kKzSPbAXMnMch4uiTZMtXH0xyzFYEjuhKuxCwlACP%2FcO0l%2BsMYBo8Fr0xFdvVGWQnE3pZMTpMYOqA%2BG7qT5w0ZUvzvvFp7qNtk5w6%2BKuS92iVK9w%2B4t%2FD7ZmNtkJdHetvk%2BTcun7WBXaZova9&X-Amz-Signature=c437867d829e90e4d3c2aa3236c0f7f954f08cfffcc2904061065b9ddd1973a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BDUUPUW%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIHKCB6HloeV4y2H%2FPVDmATwot2fBkKh2XY%2FKMKhCxFqEAiATMsGhiPxHj3qay7moFI3JhPrBoqM%2FvhoxbQowSAwUbCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMXAmb9RyJgf5c0at%2BKtwDWvmutMqR45uXe%2F%2FwLiOXF0HbjdXfqRZrbaD7ckVvT20%2BQGJ%2BaHktM8iKZyK1KTDdklFqpQXxb4D2bhCZ0zlc7tKn6%2FRdaJwu3Zaz5C6v%2BGvwPAD9YJFDyfKb%2FfTXO6v3j7DJK5RkQL1FpHIxW8o1D3%2FU1BZKZPv9waqqLxmHkgKr5TlPutp4bqqMIUDW%2B5CsoKuQgAVKC74diCwMQGxodTpjWYNytrxr65DctH8EgQWj0SB4sOJB%2FOlAxPgrUzJdSomXvUdUzBx99ZbM%2FiEiSSQ7jtqk0dzTOWg4%2FJ3WTFxY%2F3VE4Ri3vvZ7qEGNCo4oOKFfLHkRBBm7p4JFibZTL2rUK0EH2dPOrzXq8Tbwq%2BC4W6gMTdTagQ5HfBGNK3%2BVSO6ev5DQ98Dycy85SG3uoFnEfRoxIY%2Bp1TaeVvNgxUg47SYPibwEv8lo5SYmf6Fx%2B%2FaGZSOdoWv217rZziBfu5xVTHzTsIbFP52yOj8lFYPcfjOpidZvy8Y93jO66Y6X3%2BBlElGm4b%2BHkDbHX%2FOhqVATwZFpnqsG0k9dH1qsk4ycvwlnV2mkQuKqMyLT%2FOfEvSbjs1pOkvPSvt32%2BRPAHcf1GLw%2F7XP%2FIBa9pRTfI%2BS12jjJjsvcCxX1%2FiswjvqiywY6pgHTi%2FNDL43yMSrPIeIq%2BrE%2FJ%2F9hIHKGQcfe6yuW0QR4Tjmjs8p3FfJPbFUOx7KMIDzc1Skr%2BQa4xLSzSVzUvW691OWD%2FA53hJRMTi3hjS6Z%2BU4tViNTToc65%2FiPMhx2iQxehLgCkq%2F6E2xeNGIn3z2YBpZjVKPlW3%2FGMoSQT9m8zc%2FzJvZDYL3eYpntSm8JwHpbYSDG77GJYan2WaaOy5ODGNSsybyu&X-Amz-Signature=036f659d20f249757ee05fb4c1adea941ef1229c3d670d09ed06fcefa39bc44c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BDUUPUW%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIHKCB6HloeV4y2H%2FPVDmATwot2fBkKh2XY%2FKMKhCxFqEAiATMsGhiPxHj3qay7moFI3JhPrBoqM%2FvhoxbQowSAwUbCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMXAmb9RyJgf5c0at%2BKtwDWvmutMqR45uXe%2F%2FwLiOXF0HbjdXfqRZrbaD7ckVvT20%2BQGJ%2BaHktM8iKZyK1KTDdklFqpQXxb4D2bhCZ0zlc7tKn6%2FRdaJwu3Zaz5C6v%2BGvwPAD9YJFDyfKb%2FfTXO6v3j7DJK5RkQL1FpHIxW8o1D3%2FU1BZKZPv9waqqLxmHkgKr5TlPutp4bqqMIUDW%2B5CsoKuQgAVKC74diCwMQGxodTpjWYNytrxr65DctH8EgQWj0SB4sOJB%2FOlAxPgrUzJdSomXvUdUzBx99ZbM%2FiEiSSQ7jtqk0dzTOWg4%2FJ3WTFxY%2F3VE4Ri3vvZ7qEGNCo4oOKFfLHkRBBm7p4JFibZTL2rUK0EH2dPOrzXq8Tbwq%2BC4W6gMTdTagQ5HfBGNK3%2BVSO6ev5DQ98Dycy85SG3uoFnEfRoxIY%2Bp1TaeVvNgxUg47SYPibwEv8lo5SYmf6Fx%2B%2FaGZSOdoWv217rZziBfu5xVTHzTsIbFP52yOj8lFYPcfjOpidZvy8Y93jO66Y6X3%2BBlElGm4b%2BHkDbHX%2FOhqVATwZFpnqsG0k9dH1qsk4ycvwlnV2mkQuKqMyLT%2FOfEvSbjs1pOkvPSvt32%2BRPAHcf1GLw%2F7XP%2FIBa9pRTfI%2BS12jjJjsvcCxX1%2FiswjvqiywY6pgHTi%2FNDL43yMSrPIeIq%2BrE%2FJ%2F9hIHKGQcfe6yuW0QR4Tjmjs8p3FfJPbFUOx7KMIDzc1Skr%2BQa4xLSzSVzUvW691OWD%2FA53hJRMTi3hjS6Z%2BU4tViNTToc65%2FiPMhx2iQxehLgCkq%2F6E2xeNGIn3z2YBpZjVKPlW3%2FGMoSQT9m8zc%2FzJvZDYL3eYpntSm8JwHpbYSDG77GJYan2WaaOy5ODGNSsybyu&X-Amz-Signature=036f659d20f249757ee05fb4c1adea941ef1229c3d670d09ed06fcefa39bc44c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6TMGNOY%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T110938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIAM9ojQPxW9SjlalyxE2aSZO2igXsuUW8nerAyM2%2FwBdAiBmCEQzrGHAVmeAbjEhRvaa2j8dUznXHgFPZ%2FlOx0SIMSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMjroCm82rxvbsRI32KtwDf48jdaG0by8JEEKrTko9zx9JU5ZzVkawdgrulZEGGL7HmnGK9b%2FEk0xzSLeNCJEv7DBI9WbuzpUllwbAtsOpxf%2BJidkFvdZdEnYdLbRs9M9yH%2BKtLJB6%2FGHgMu1g6DxXB8cu59LHKxo6ZUBqGDAcH37erQUm2tNN2V%2Bq2qTkh1tokSbTpf642vET9VEvclaav0QPxoLuawYFoVaMlmD2KlGSkbZEimCm%2BlGW44Gw4edki%2FptFZZ98zj0PrYxu7VcFvsGAOK7izu6XQiEwRUhagyL6qqLK6Dkex%2Fj4%2Fj4wOHBotANrZR%2FA4Cfgyhb7dHv6bxQK9f4K4gfTkt%2Fq5udk7mQ93OAjVIwk8prl96Iysm7aNboMlKgOuVCr9Y3AGyZrnHLfccpPYrFQLytaLbnZszFyWlt5drVow3MUe6yZKit5DhHZ%2FXBjDTJMosCWhYVtTvCHETxRN%2BtqQr8G04ooSNrHMXMOVZhM1buXxh95veTo8ZcipznRGv0srMbaEVyueumLVI6aOuxdZB5SpiRnVDludNvgVpaYsp5oLoG8Af9wjWSghsRv2G%2FC4oJtt7VuaGJLT%2BaeWaHz5VObVv%2B%2BLxCyxLRz%2FP%2FVtMa6vZZndyIr7WjnZCwIfusQ70w6PmiywY6pgEEugCexnAER0zs63IXQ8%2F0b%2F%2BOykJkGgwXYeCy8DJ64%2BjALrYpjpDHEOHQuU%2B%2FbWo3QaIvYG51RWJVdYsn5mstC2nW6BATv%2BFysyHrmU%2F6j%2B1Lh%2BgokDar99o0y9FRp5Sqjvfmbink8RN1d7jy91uhmlWN7of4hH4szp%2FHM3Cc4%2FPuWzc3DQCKgNat56ReEju2deqyAWSLA2lBuamc5tZyyZTURc3a&X-Amz-Signature=7f1e128c10f2377096bbf163eaa6402111bddd697f27795a79cbaf8da3fb4cdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

