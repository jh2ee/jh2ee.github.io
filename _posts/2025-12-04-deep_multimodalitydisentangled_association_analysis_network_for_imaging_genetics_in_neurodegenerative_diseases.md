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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIDNJ5DB%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIB%2F4ROFCvM5FyDW99FWfIWHOEN3fFUoJGukhl%2F8A5674AiAamji%2Fl1UStdSJ91lEdv6jnI6fZkrth6IiybYSQ3AJUir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIM9Ws5H7G6G74S55y7KtwDB6gYBASAvN5y4dIfR%2Bpqh%2FPv%2F0beELpleYWm%2FioKtudCUgNHBEbQXeOEd0%2BeYqWE1B69QVo2O1DPfRbabP%2B%2BM0OFgf3SOZ6gmJOlJ1MfnOBoYJLQ%2BLoeJAXYAUS9FTYkFE4I9BqMpk6SXIIXnyFC6%2BGOMYWpjyu98qnLxAmbMLNADV6jDvJuLzxS5l1YYmg%2FPLZ45HeIoM89i4UaAOf1x7PKl5GxuzDqlTyUqbg8C3%2BhSSxIehHg%2BCYvof6YF%2FM59MCbc6f2VOb8dL2vA5rOBNEk1xp56Xr9YIReteGqD5ffG0s7fmHnogcdRctVL5YgJxnIdWP6agGh4yIOk4rDHfsYNUOlSx%2B5bIIceBCYMHeIXhiIDFc4R7oEIf1uDlkE8q5P8u7KZYtXEsNWGQfMnl2NmLGpVZahkR1D%2BctlS9Vskx5%2BxnRuR125HQPuap%2B19DJYQeAs4x8OGYOgKJ1zuGYqKFoZCSelmFSnXnIm%2BwG66%2FwkIYfIwtWz5n7GhhJHHdv7aeGQo4RSCwGxSRFnw5dSg1KzYPDb4x3Vle0lGmWt2vdNbTzSCNs3HMfDkAYekGKDs4TW%2B%2FAbBPd8em2tqVMum2XahO%2Fli9kNnwxaa9H5Ayl21BtrhQ3mKhEwkIWTzAY6pgGca%2FKK%2FBhWTZMTqdOlI6OlpR62R8N%2FPJR3zrTEgVZ2yxYlWIjQRHDKg2twAT37iN1TG5mMoFbPCjs2tWtgDA6%2BPw0NB3h4%2Bektl%2FB%2Fb517ScwpntFWX7tDx2v9po4drU8EYBDZMHl6DHu3vuMTp7vGi%2BIRCCKvQYg7ufRSoWd2qnXrqBdUQOvCh6289uYjHAK30tJxymo01eRda36XgA3N5io2t65%2F&X-Amz-Signature=b77168a7c2aa234cf4811805fb469cf2bddd1528a59b16593354d344a9fcc66c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIDNJ5DB%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIB%2F4ROFCvM5FyDW99FWfIWHOEN3fFUoJGukhl%2F8A5674AiAamji%2Fl1UStdSJ91lEdv6jnI6fZkrth6IiybYSQ3AJUir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIM9Ws5H7G6G74S55y7KtwDB6gYBASAvN5y4dIfR%2Bpqh%2FPv%2F0beELpleYWm%2FioKtudCUgNHBEbQXeOEd0%2BeYqWE1B69QVo2O1DPfRbabP%2B%2BM0OFgf3SOZ6gmJOlJ1MfnOBoYJLQ%2BLoeJAXYAUS9FTYkFE4I9BqMpk6SXIIXnyFC6%2BGOMYWpjyu98qnLxAmbMLNADV6jDvJuLzxS5l1YYmg%2FPLZ45HeIoM89i4UaAOf1x7PKl5GxuzDqlTyUqbg8C3%2BhSSxIehHg%2BCYvof6YF%2FM59MCbc6f2VOb8dL2vA5rOBNEk1xp56Xr9YIReteGqD5ffG0s7fmHnogcdRctVL5YgJxnIdWP6agGh4yIOk4rDHfsYNUOlSx%2B5bIIceBCYMHeIXhiIDFc4R7oEIf1uDlkE8q5P8u7KZYtXEsNWGQfMnl2NmLGpVZahkR1D%2BctlS9Vskx5%2BxnRuR125HQPuap%2B19DJYQeAs4x8OGYOgKJ1zuGYqKFoZCSelmFSnXnIm%2BwG66%2FwkIYfIwtWz5n7GhhJHHdv7aeGQo4RSCwGxSRFnw5dSg1KzYPDb4x3Vle0lGmWt2vdNbTzSCNs3HMfDkAYekGKDs4TW%2B%2FAbBPd8em2tqVMum2XahO%2Fli9kNnwxaa9H5Ayl21BtrhQ3mKhEwkIWTzAY6pgGca%2FKK%2FBhWTZMTqdOlI6OlpR62R8N%2FPJR3zrTEgVZ2yxYlWIjQRHDKg2twAT37iN1TG5mMoFbPCjs2tWtgDA6%2BPw0NB3h4%2Bektl%2FB%2Fb517ScwpntFWX7tDx2v9po4drU8EYBDZMHl6DHu3vuMTp7vGi%2BIRCCKvQYg7ufRSoWd2qnXrqBdUQOvCh6289uYjHAK30tJxymo01eRda36XgA3N5io2t65%2F&X-Amz-Signature=b77168a7c2aa234cf4811805fb469cf2bddd1528a59b16593354d344a9fcc66c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUQHFK2Q%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQC5VnE43u%2F%2BA9WIIvKh9knaAyJ3sdCRqqEkx7fP1J6aRgIhALkzOjDX0Aag2YRZdGrM4YjgRO5Pr5j9Duea%2FQW1wmQGKv8DCDEQABoMNjM3NDIzMTgzODA1IgxAg55bdVVwqqTnh58q3AMuf8mQYlxRC%2BG0FvmX7IWI9IH4WcwiFcdYvqgARNKUGLSeCHSQs1tYZVwZw8S8U0BDgfB45Ahg81WJxHG0lFe1jV6wutkp008ZBqbasFcSxC%2FFLEDPeDEUg6wfPrWwF10Ekycx8ogDE7mX%2Fz1eNWvn8S76TQtKspH%2FfuhDwxR0VoN9cSd%2F9KQcwbkIKjw6GzED%2FXcxkTTSsZ%2FrqWGCYnWGyyx0P12CbcoU9dzk8Hpt%2BTYCqFgjNLPrLGKqSFrLOiqcycB2pb8VqIUinAKQYal%2F9KfxVAWN8NzLmTeBFDAI9eCngLibXObBF%2Bxs9cAlLyGGcwWHFdV7w03mshmeWb2T1tjRoWAeWJf6fdxtyXk6uSOxL268Qc%2FfBfRyF%2BSztmRViPPez3PnIu6xWrzqcNwBwvSPrFjbTLoowjphY2FGp6v5oq4%2F3X7z7Nl%2BygyYGx%2FkQCY42jM80hKHq8%2BHzAdTjdGdZdYk5qmDdXgeqMnPpSu5QTncgMgdQhR%2FDnysqFBdG%2FycOUbpZ0XyPwUgdZyYvN5clwORGzGWQOjGD13yN5TP9XLq3DZnDDalzrvxj2Z7LOmG2L2sqVDJ%2BDxzzUpIwd%2FCyyd2dFF2QI9f4del7Uj1Sd0T73eYXRlPszDogpPMBjqkAQBgHQl9Js8u0uZNwbLWhYt3FWYFpzyStjj8aAVsHj0QgnjSDL0FcFYKnfPGtNMHKmicKQAt2%2BgYFzMznM2I8aG93NmMpZJw8HTGVS2%2BFq5uWXm1wxgEpcCGCbCgXdeb%2BIRthgOogaGK54EMvFpmqEeWDwduO6OTGD6KVLH4jh0EiQyS%2BB0oLMgc2CS5EcddFRGtbykKGTci71KM12yaasR7mNk6&X-Amz-Signature=99849d00449453789fcc8a0f766d4fefb967f6994822724582864ef536a76feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VBIGE3E%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQC9g5m%2Fi%2B%2FcRhL%2FUNEZIQZFtdKhWM6wmlIgaPi84xujfAIgPTaoERJR0N3ibTP%2FCmLU21Fs8GDvxuzE%2Bdi%2B0CtMrtQq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDIgBXDbe6PVHCQX8UircA9HMEHT3aFY%2FWQIPS%2BiOYJvOHlhDDOu8wWbKeEcNHgprVPMwdcJx4MFd3yMrAvqgwRbw2j0qf3d1whzq2KKfxKtO93oH2A%2B%2Fywcyh0hZ7MvCnR1Aeyk2LofqCg3fevnMr%2Fil0ITz9p3BoVwt852fwzMNT8sk%2FvIi57g4Nxe75J14t7HauojmMlriXvXf1j3nYskqZ4NAzWeqPAjCUpiO103yy5acuLBJrkhBExv%2Fkx288WuTzD6zguxpR%2BrnDqvpDJ6JgC%2FvXYs59rBv6Hz%2BD84ZEf70rYdx24qIAXyzJJCp9U3wEjxLxX38zgAOb112SewnBuVXGXgQ%2BKX0Vs1omrrNEIPF%2BRkkHC4BzVfWsHFZ1eblsGA6ZT%2FhdeRiCCNubABzX%2FSb3HPU55qruVTC4ScD4pmxkN3NxAxB%2FvfyJJGJnFA4nIxPuTv%2FJuxMSwwyAx4ZJu%2F3o%2B4bRH4B2kmo08YD0Rs5av0Pvv0KtlWZYYgBNKlTGiIXN6s7EDzhadMnSQle2OrLp7qG2ZCTBlinovkVfIIc%2FnmduK1fsgYpKZwr8VFFDxL79Eu8Uv43g3sTJkBSXTt6vLoTtQ8CJNZ5UTVZb3bYafzr4jesgpUy75hCo9tVcWnf6HbLGwl0MI%2BDk8wGOqUB9EPjdNuFDqlwanCazbl3Z1Ay3iBAiI%2Bgq6TSAeMj1k8nRDES3nHrYgUTPxP8ghi7DJ6vIGuyezqcOFIzH8GH%2FcktZWXAJc2j47MY6O1YUcklGETs%2BYyg1izgZBm8ukMDsFEmuxLsU14JQYbTHXn5JDH9EaeqoB8FDJvCO%2BtttWllj%2FmLnDrvSYvTUnamn0ORdBt2rlsc%2BrybYn%2B3fcKGXg1M5Dly&X-Amz-Signature=82afab8a004f7708f65539a38f9df72cbc7fb4a4aeb378582c1a6584960cb4f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VBIGE3E%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQC9g5m%2Fi%2B%2FcRhL%2FUNEZIQZFtdKhWM6wmlIgaPi84xujfAIgPTaoERJR0N3ibTP%2FCmLU21Fs8GDvxuzE%2Bdi%2B0CtMrtQq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDIgBXDbe6PVHCQX8UircA9HMEHT3aFY%2FWQIPS%2BiOYJvOHlhDDOu8wWbKeEcNHgprVPMwdcJx4MFd3yMrAvqgwRbw2j0qf3d1whzq2KKfxKtO93oH2A%2B%2Fywcyh0hZ7MvCnR1Aeyk2LofqCg3fevnMr%2Fil0ITz9p3BoVwt852fwzMNT8sk%2FvIi57g4Nxe75J14t7HauojmMlriXvXf1j3nYskqZ4NAzWeqPAjCUpiO103yy5acuLBJrkhBExv%2Fkx288WuTzD6zguxpR%2BrnDqvpDJ6JgC%2FvXYs59rBv6Hz%2BD84ZEf70rYdx24qIAXyzJJCp9U3wEjxLxX38zgAOb112SewnBuVXGXgQ%2BKX0Vs1omrrNEIPF%2BRkkHC4BzVfWsHFZ1eblsGA6ZT%2FhdeRiCCNubABzX%2FSb3HPU55qruVTC4ScD4pmxkN3NxAxB%2FvfyJJGJnFA4nIxPuTv%2FJuxMSwwyAx4ZJu%2F3o%2B4bRH4B2kmo08YD0Rs5av0Pvv0KtlWZYYgBNKlTGiIXN6s7EDzhadMnSQle2OrLp7qG2ZCTBlinovkVfIIc%2FnmduK1fsgYpKZwr8VFFDxL79Eu8Uv43g3sTJkBSXTt6vLoTtQ8CJNZ5UTVZb3bYafzr4jesgpUy75hCo9tVcWnf6HbLGwl0MI%2BDk8wGOqUB9EPjdNuFDqlwanCazbl3Z1Ay3iBAiI%2Bgq6TSAeMj1k8nRDES3nHrYgUTPxP8ghi7DJ6vIGuyezqcOFIzH8GH%2FcktZWXAJc2j47MY6O1YUcklGETs%2BYyg1izgZBm8ukMDsFEmuxLsU14JQYbTHXn5JDH9EaeqoB8FDJvCO%2BtttWllj%2FmLnDrvSYvTUnamn0ORdBt2rlsc%2BrybYn%2B3fcKGXg1M5Dly&X-Amz-Signature=e2ba8d5f316bcb55cde73078beb0f91346d6d44056e12043ffdcd08a45f6f06f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFRUL545%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDY%2FXhfAiFCMDnWX1UCwu868uBqaRx%2FVpf9j1ji4hIssgIhAPSPQ63bhELaYFXJ8xteEd3h73mZeprwgqoq9UQ6VdspKv8DCDEQABoMNjM3NDIzMTgzODA1IgxfVL8XmbYs3i%2F0a8Uq3APyBf5lrFnSMyStONtgsIAqCsS8Wsdr%2BBVsjkICV0%2B3ICXLrNTB9yXH4YFO1eZuhqU8DwOEDvArsuo3m6xbH8s3h%2BNEejbDlcydF9UaF2IVQ8bMcVdtpleSzJHRt0I9wSPmhg%2FMF%2BnHbxEUNL3hAZOxx1oXNkxpxeegKhSE%2BHhDNwAUP3sZsSpqdqe3SIRB%2BcAuWrbDAUE1LrFV4UZL84YH0gU%2BiLyI7j%2F8kzPf1YOeJIbcbpv9R2LriTEq15HlOnZG0l%2BRNYQIE77DpyI1ghLTAK0gPJonE9jxS7pHfNdX7czD5tO%2FtE%2BQLl8LBzzn9WyoKiPrlavienbt7MtfnOARWYzyCQjmbfvs9VWDXUjU%2BSrBlTJexmGrK3Z62O%2BNxkCwixfqCcCCxAlXhlEqPSkShvMkzTjjGirOI2vfsC%2BosAAUtdhGeiusZz6tE50T4NGrcgFAjF%2BaOvWpy%2FyE5oj2JD%2FMVIK8K8nuntF3qQ3dWcR4jqaKepRjY28Y2eVes2ZS%2FZ2zhmqEZRVCLgDh%2BzqKCxgyaXbkWdI6pKZHKGnM67VdNRx%2B5XcyTZ6V%2BZfyJgw6FEhKc6sZ7gleQXwVe1Va%2B5sBbki5Bxzm4s1TTL6WW5OTAIW95BbkjasXgjCrg5PMBjqkAStTeCTX%2Bf1jhxripmS5nq%2BDkQnwz%2F0loESXOHNiY0jzOWopjO8mFAVybPK58bUh8j9oO6r0nLEpULMfcOrij4a6BaaXVY5aI1HUSFEXvm8o8j7mTYxbvtzGpxgrw9e2%2FERoWsDxZ3KtcBF0VhPQ1ztGGsrvQQ%2BA5%2Bm%2FWUGPJLeow0bHFz4A1VVCd87rSuBwSNrpYDyKUTrMcwyne5BQ0YdSN%2FLi&X-Amz-Signature=b3ba94ca358fe5eb4173b8866a04615bd66c2cf4e7e304209ad654247d9f3c0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z26IPQ6J%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIExAEVoZqJiWfSrhIjKs4W6KZdS%2FWgIlbF7JBEqnkCwWAiEAx8jqO4NWNIdRllNIE2bq%2FMIJ6pS7XddtB%2BYsgOLRTngq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDDGaWQuoK2LJcH36hSrcA5mmkCLLCl1QveKeJv%2BpNDM2I2OV3r6fIIDKqWKE2IIBmKM0g092%2FpB1l9vixS81IXqbK4y%2BrXzPHthde4joAMO47R%2FDjs1OmeFpgcCRmtGJdC2KH%2FK6obDq7vMoPjnbINT5WFJRFejiwFC6T3hLikoRNiA20nc6oFhQem3Cjlgxt7TznC2w7RR6F7LVxo9tPgySGfpQIsDs1T2s5xUMI4TeU3%2Bv5hdyvONstUV3iYb35gXIcQKheEHjGkYFuIVMWkcw%2B6GTuzxb0EdhvujIGvvu%2BTyFRCsNDPUov2KBIUGbFEko%2FT%2FKhUACbBzXgLmrKwRFrT%2FQxRhEkoijS4b3NFDcM967K1DSF9UIszJ79oVGtJokoo0ajLpTNnR%2FWhhpnsqDw7Lt2y%2FwnndU4p7wbR%2BGMOglrRHlvrWMFfqNynO617CBz8UDU%2FWb7cRbYiiJR82qt3J3t3WYvGqiSv3oWTudOoFWXwRPoFBworV5j606q807fbCdiSbAmc5X3gHBKFMHKRPgjwMvVxpsV8UFg6iergILHWOFvJlSxCjne8ZMJftEU3M4epO0khgZvKRBwmszVSzBaarq%2FmG%2BZVT%2FWo%2FyTwdZ7CT9ftgoCAdZtljzHtuKFulsax7tAF6HMLSDk8wGOqUBncQEIhtPbDn%2F2tQS9ze4K7jrKGTs89%2BheYQcxWRqw%2FdcItJMRtXgI%2Be19s%2B%2BtqmGlDhq1QpFW07DCZ3hFoiM2fK7WYMZafPmZlSVl%2BNusE2lVicNJp0JNMabwhncAVEYRehQa9n4CCH4ZjDaYEy4g3IBM1UdgQDZebuYd7xL4m%2BKnMaHm8UbPGMorVTr4DWFK5UO4vVQ9EapquUuJSasgqhzCCEf&X-Amz-Signature=fbab3224ee45bb90fbd8204445ff62e1885e798fe8e6cce6eaac629097941c52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSVKWMOD%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIACYkISnxo3EHLaSS3fa9c8vt3sz8TK1qm9PBKUHL0VUAiEA9O2i4L1JdGBIIOtA1goMHNabFnsuOC1300QVL2H2DpQq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDKMfsaGRmu%2FdGC1%2BEyrcAyE3cTlC67eaNeS3x3CbCXDouMnIY6%2F4MCD1GzqLnpgVwRl%2FNsJpsImyAlv8SCQEJw1fNhwlhijtk9fvEnciLUfjl50F8TIUbX88qfLRMZCEQNp%2FO3o%2FplAqiQrJnXvIRPUUJllmhAQSi3Wi%2B6uMfrQTMNPli7ml34p4uGptWhsJJwc61%2B7pPwos1efjf0Ht3CK2yeDZc2ZzMkM4JnIiWcWfgDB2qUbrcxTJUt2P7c64MgcGDr%2FQp8DY%2BZBR3aQb59Ylt6X14Qx%2B42VPwqm4gJEm6C87SDakXR46x1I2StztbS7rFcZqi0yKhyzxac95%2BrDF88B1ooZbQQGEOg8MPsB6oe5DgrkeWoH9MrO8d62JIVls2XjG7PUejia029mZQmlzIdW9gJQ%2BhhQtR%2BluUdwrKZviBGfm7GtZiTxdrkUqKBtIA0loHCMBMPwnc8f9h6reVcWjEt76nd805YH6Q3%2FxnrBAYcc8yQgoAQQQcMLVxBI8HCAkrsjgKbH7lEBKPCiGOeI8nxM1aYkzLk08ywhJuVK8ZhfQCNRuyq%2FrC3dT%2BGp41dWO8bbdI%2FwozygnEjFfgVeN7O9iiw3Wjo2P43anQ%2BeayuCsbCHu1yff%2FkIl%2BbreWsbj%2FDryKGTiMJuEk8wGOqUBVI%2FSlK9zoGJwQzrgfY6HLNYBr0TaqpRHWBMMFX%2B6afv2BNFWWyLJ%2FgP5UfONzCtpQL9OWjL9CKWQllxfvFnFkPRaK%2BluKwLKBgjGfdZR8jKa3usMfWX4pehuLvDXDHToaSSyQv0iatO88Bl5U%2Bey1IAPO%2BdLZ8U2JxBxlXDJI803ZPU3EB%2BMPM8ScVYYePSncQK4hl57yllSgkPjtBwfUlgcMZDP&X-Amz-Signature=b3cf6be3dae7a86749647f3a9b6ecd11dae3786bee276f6a8d26d735417d3405&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635XC3X6J%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCYHfa9qlYn22%2FkeKnulvR%2BMiLr7cUytNppT3reT%2FSPiAIgS6PHJ5IAXjWhwXcQTafCipY0%2FphpdQZGvlEfUQ5iU0Eq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDAQH3RBP3LCOKnuFAircA3kAf9txJ72CMwNqk%2BqeJsUtAgPfwIkqKZRrVG9DvHzli23za5eI16hSUE1EZXPlnmbMBF3Ptj2RrtKsU2HB8hNRjqABrD1K%2BVzZvaJ0NRYlo2Z5cOPkkuxVXV9BZrr3SuRw2dC70C99%2BDENhQHj7ZG79jkyu7PDYsk3xiq30FQWjRweAmSrBngT7NVBnZqXUfu2zCQMtQgUo7SEKrBe3MCiVR%2BNXBi4OKy34h3Aw3AxJ2mc7vchdd8csn16xRtjULrOrHGTdiEtdpGEpAIG0N7YCe3Au%2FmovSTuJSFxG%2BTQ%2FlwwuudMMw54j0gJ6lI%2B39821bD4oQwcxOL6%2FMJi9LUI6BIkERFwmQwLUdIgSvLpN3YTJwkpXbkbXBO07NTbPjq%2B9nsF5Hs13Ix6XfVPri1DwXaBvxVXHyKZj3s4ANmqiXb9Cpg%2FZ6TPbufNlXkd70pSHeM7fvCTTmGx9Bel1N80Q8vlLgkIOWd6r%2Bi1lakZFN9mfzybCFflFMpHxVWlSSkdbPpmf%2FrFQYaSiWPZVr5RbM2p5LHgYNVVGn4Qc31ODYVzeGJuHwkmBNTTIDxaSleOIkuRe1a3P7U54deZUieeO7XYlrqiDzg68h0x5yUAsLk6L%2B6BsKUNy1GhMKuDk8wGOqUBQUCtYIifwomDGTySaKKWScbhG%2Fqjm6RVH1Snc%2BSJstP9sUnFZYV2Ij7n776g0mq%2FTOje0cLPqUMtXbcnWgRtmE3UMeCtvK7Z81TNjy4eE79Yyhc78xC9hdsQ2v2W8WWy3GtWc4ii98wSTMWf1N9JhbcUKS%2BeHpMCDaWxWQcBUs1kCnPoLp%2BUAiSBNnS49Ro8ihZh9riJqgmGh6OrelH1mDiW%2FfDm&X-Amz-Signature=332c06a86a3cf9bd33ba60f77071c17b3eb798600956e227a9ce2ed22f0a183d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635XC3X6J%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCYHfa9qlYn22%2FkeKnulvR%2BMiLr7cUytNppT3reT%2FSPiAIgS6PHJ5IAXjWhwXcQTafCipY0%2FphpdQZGvlEfUQ5iU0Eq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDAQH3RBP3LCOKnuFAircA3kAf9txJ72CMwNqk%2BqeJsUtAgPfwIkqKZRrVG9DvHzli23za5eI16hSUE1EZXPlnmbMBF3Ptj2RrtKsU2HB8hNRjqABrD1K%2BVzZvaJ0NRYlo2Z5cOPkkuxVXV9BZrr3SuRw2dC70C99%2BDENhQHj7ZG79jkyu7PDYsk3xiq30FQWjRweAmSrBngT7NVBnZqXUfu2zCQMtQgUo7SEKrBe3MCiVR%2BNXBi4OKy34h3Aw3AxJ2mc7vchdd8csn16xRtjULrOrHGTdiEtdpGEpAIG0N7YCe3Au%2FmovSTuJSFxG%2BTQ%2FlwwuudMMw54j0gJ6lI%2B39821bD4oQwcxOL6%2FMJi9LUI6BIkERFwmQwLUdIgSvLpN3YTJwkpXbkbXBO07NTbPjq%2B9nsF5Hs13Ix6XfVPri1DwXaBvxVXHyKZj3s4ANmqiXb9Cpg%2FZ6TPbufNlXkd70pSHeM7fvCTTmGx9Bel1N80Q8vlLgkIOWd6r%2Bi1lakZFN9mfzybCFflFMpHxVWlSSkdbPpmf%2FrFQYaSiWPZVr5RbM2p5LHgYNVVGn4Qc31ODYVzeGJuHwkmBNTTIDxaSleOIkuRe1a3P7U54deZUieeO7XYlrqiDzg68h0x5yUAsLk6L%2B6BsKUNy1GhMKuDk8wGOqUBQUCtYIifwomDGTySaKKWScbhG%2Fqjm6RVH1Snc%2BSJstP9sUnFZYV2Ij7n776g0mq%2FTOje0cLPqUMtXbcnWgRtmE3UMeCtvK7Z81TNjy4eE79Yyhc78xC9hdsQ2v2W8WWy3GtWc4ii98wSTMWf1N9JhbcUKS%2BeHpMCDaWxWQcBUs1kCnPoLp%2BUAiSBNnS49Ro8ihZh9riJqgmGh6OrelH1mDiW%2FfDm&X-Amz-Signature=077d642274af7d3087d98cc11960157538ff844f18acd2b78806592190ccd32c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7WJH34X%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIExjaWOl0PxjNuVetEPpxdzZ764LE%2BKpl%2FgTpBCuhb%2FHAiAg2n5Yzz2GpkdOTYnDUBpN5Nl%2BpMeUB0UU84UBAY1%2Bnyr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMHEPqOahxh1b9J4A8KtwD0VXEP3JSX%2B%2F7fA2ePLRkGhtwZhej7oHaKKYx4MX64ySU8I54Qa0SdxkigJWNPU3wzA%2BY4q19cmWomGiTcD7n4IVa%2FK%2FbHRSkvfaN0OqVyOu9fdl80N3Dk0dyNvltttyS61jhOYl3op90gKv6EOqlCQLO07GKOmnkFGeCSoKfpJq7GFbSbAjsm5ZB1e4DKEiaQ7h%2FE%2BLFdrKStzTVWuQZKTQDOjdpjUzhI9WzZQC0z0zVoc2msEqvNmj7vmISDkdfe6oNL%2FYfdNBkEkxKzOvLbHw0bGuvHNXpmySyyRhT7URCEUT0bYUaM2QnXTYysHER6S%2B7hfTCUafinUB%2F%2FH3KlvI5jdFgzY31SfT%2Bf9lBHTz%2BeX0GQ7eR8d4xIDw%2FTtiF7sSBGgl5aUlkRfuu91GGZIbddwpbQDfagMrXUl23ARis7ugFDfxY2%2BSUSaBC8%2FmQ59%2BIM9gXvYUocZNKjHA8v4k56LdZ2sn6D0WZxB907VQMSL9PtuhBka017FvzHiVyqKqU4Hg9vkr7JYkGAS5J37E1d%2B3oKxhsoROCTGb4UeDuf8yaJfYnYFJFaOw10l1q1rb3chUorAh3bd0ydTYk5wLAaEtu6iyFUqITSof6MKRjF6MPTl6FscjhTYAwn4OTzAY6pgEa7B03gbE7QHPg41YlpcOxosyDrkEPAYJRLAMxNnxHCm6jNwFm3QZSVTeGfArHWkzrj3qCvcxpVe4ZslfB33S3gUxmVif3qQahml0iroqB8sYY5OWya%2FZWE3foVIJ%2BSB1G9KYkStxd%2FWESa8WP%2FfUdiKgfjEgZwI9yf%2F6zclpi8%2FXzhK9URpri9lGriR%2F6fhWCYeaiQv8NryN5cbb7svRLX%2BAgcdpV&X-Amz-Signature=84c0880dafbfd2eb2b1972e557b58896f8b7e7b0c6b69b24354d96b408f6703d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXKW537S%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDI4ayBvOc%2F%2B8KHrpp23MXl8cl0T2SSUy4oZ1KRuB6fBwIhAORJlFFPYUcPGTibKKKkm5TTo1JEUtnThDk5dAcshiDIKv8DCDEQABoMNjM3NDIzMTgzODA1IgwXvQvGWFZ4B8QqMQoq3AMn4AFyzQrUkIi%2FOsvjpIiELb3Cuf9ZwOFbNwc0wYIZIRP3EfIovN6J%2BGFQL%2FxhnMFdWFc8cUHdLhjsmoaoHutpUUYOiyJuL0hxRAUUf7v7TW3YMuh26n1EieUNEZkhyXaeD3EGCgXm2%2FVTsGuuJuMhvBOZbFUyGQFAWrS4ElNqSiuIObKD2elt%2FBe8WFEQ2G8tk3h778r2bdfyZPP9bFghtpUPRFC5bgA8IOVn%2FDsUuSeJJYsb3AFyNCKWahp3YQpWeEvlUah9xSugor%2FPecuA0TOlUD6%2F6Z2Dy47Xd4fFzB2Q0J%2Brxp3O%2BZLdmUUq7jWHORzAn3jZh7n%2FMoIWWC%2BC349Z1PGOGg5w9wZ%2BWNU6taViTdnEYKM0NX4uJ3%2BKBK355zGrgDaTOR2LwYjr6YhmXJT5y54W2nQWu0L2crfJ5aR1VDPWSsSeU6VIKOUErUOwFlzuNGt%2BZhYXHbjaliA9X1WxAUENfGHAsle1dkdwDYoPx93zYoEnq2FSwKniT0lfS%2FBrXuEJK7FksI6CGLvbFox0GVJE1uhKABDqb1eeb%2FhRlo4W2Lxvvkt2iPFfZIsUhwdc72yDbIrxnnv8jWxS2l6UhP4ReAFKuj0VB7xy5NJKW%2BpGk%2FsDNUj0AzCnhJPMBjqkAdaLwOP1%2Bw3ZQugXY87fFtftYecGN%2Fq09G%2BJoGcWLDJ27Q8ICEk0n%2Fbkr1o%2BSGrOtZPbmR%2BLUeSU9nsKIRRUlleWxFlRVKQE1KBd%2FJdJI72e4EvShnt0xgo97pyFKGDgD9XHzpURQcRcb7lSBGxFCJJag1CEwEIwuc4FrSA3J3JSCORzf%2BZY9TwZ7HiOtygbUUJ3jADg3GSdVG9mt9hEUucOMqEK&X-Amz-Signature=72cddf18d7d607c568ccaa555d504180a66b7255380b9ff99f91abd45e2d721d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXKW537S%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDI4ayBvOc%2F%2B8KHrpp23MXl8cl0T2SSUy4oZ1KRuB6fBwIhAORJlFFPYUcPGTibKKKkm5TTo1JEUtnThDk5dAcshiDIKv8DCDEQABoMNjM3NDIzMTgzODA1IgwXvQvGWFZ4B8QqMQoq3AMn4AFyzQrUkIi%2FOsvjpIiELb3Cuf9ZwOFbNwc0wYIZIRP3EfIovN6J%2BGFQL%2FxhnMFdWFc8cUHdLhjsmoaoHutpUUYOiyJuL0hxRAUUf7v7TW3YMuh26n1EieUNEZkhyXaeD3EGCgXm2%2FVTsGuuJuMhvBOZbFUyGQFAWrS4ElNqSiuIObKD2elt%2FBe8WFEQ2G8tk3h778r2bdfyZPP9bFghtpUPRFC5bgA8IOVn%2FDsUuSeJJYsb3AFyNCKWahp3YQpWeEvlUah9xSugor%2FPecuA0TOlUD6%2F6Z2Dy47Xd4fFzB2Q0J%2Brxp3O%2BZLdmUUq7jWHORzAn3jZh7n%2FMoIWWC%2BC349Z1PGOGg5w9wZ%2BWNU6taViTdnEYKM0NX4uJ3%2BKBK355zGrgDaTOR2LwYjr6YhmXJT5y54W2nQWu0L2crfJ5aR1VDPWSsSeU6VIKOUErUOwFlzuNGt%2BZhYXHbjaliA9X1WxAUENfGHAsle1dkdwDYoPx93zYoEnq2FSwKniT0lfS%2FBrXuEJK7FksI6CGLvbFox0GVJE1uhKABDqb1eeb%2FhRlo4W2Lxvvkt2iPFfZIsUhwdc72yDbIrxnnv8jWxS2l6UhP4ReAFKuj0VB7xy5NJKW%2BpGk%2FsDNUj0AzCnhJPMBjqkAdaLwOP1%2Bw3ZQugXY87fFtftYecGN%2Fq09G%2BJoGcWLDJ27Q8ICEk0n%2Fbkr1o%2BSGrOtZPbmR%2BLUeSU9nsKIRRUlleWxFlRVKQE1KBd%2FJdJI72e4EvShnt0xgo97pyFKGDgD9XHzpURQcRcb7lSBGxFCJJag1CEwEIwuc4FrSA3J3JSCORzf%2BZY9TwZ7HiOtygbUUJ3jADg3GSdVG9mt9hEUucOMqEK&X-Amz-Signature=72cddf18d7d607c568ccaa555d504180a66b7255380b9ff99f91abd45e2d721d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666LJ6QR7%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T163023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDsePzweRX88EXVeCoBPjjFl2%2FfGwzmyEapgjNRBBBGqwIgeQaygQCBeNM4m5oaySCl0aPSCCqFo0nMrnKJdwn%2BF%2Bkq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDH4RNrtkKupgvUIj%2FSrcA8HBKevKHTYvs%2Bj3vdYp3zZ4EVnZmAECd6bA1Zm11Q00rdiXNGRJq%2FQc3z7R2UOoOnSN9yjMOPc557s4Qji3HnTr4uRkvfeUO2Ytutzg4zEYP6uDzuPzw%2FsegMyHaceayLml6F7GR%2BuPKLrWJHRAzYBJq%2FvB6oUiWledRXYFkTfiPMhaDKLLCc2na4RuBNoaAdcMxEToGPRkDTdepTJtZWzGodmh%2BLAIavL21jaCLqoHQ%2FPTzaKVPR5qlrLTy65WzGm8rjg2HgxgVciFNj7t4EcBzpko2y7kkxjTYv5Rc3b41r6xhvK4VTUEf3mc8NPZS0iGKi8RdhtV31eeHbUzH5hKsk%2BlzSh1iSonSQ3wACk%2FKSqudsY8FUWVacf4MPi7R%2FjEgyufjbi61R82qts5Km%2FSe06uWjfbDOirwDJrvBqCPkxWBiVjQo6EEv%2FPBe5roAUFrj5mtUv9RYqyIilP7tum38d3rDoNKaTWtz6lvjwqpqLlv%2FiN6lYfjH%2F8UmJfZMziuegFeNbcsYbSoCZ7nvLLtojPaMLsMylW78G1Th5tQULJ%2FgGPSMN9YggYFOhCIBxM2lyB2iJzVtPKYHm4sttD3tEeeiHEJZ%2FK0Spxghq6TqZgMgKMAVqu8swsMNuDk8wGOqUBIAtzjua4lDGhMOmU7aRpPCuvANw2I9jEIiJz3s0WysK6en89R3tcX%2BjsdmSfmEgTNhA3dco5rguDIvhmZh8JMHPb%2Fxc85jY%2BExSkA5tKORQvtWD7yvpclXSSIQK9UOCMnkirqZzv%2BncHfJxTpz6%2F%2BkHVKW96mB2C0rBK2iJS0fNhhNKc%2Fo7G%2F9D1lMD6llNAKKzS2xo9VgrxrpTK7x56sBeKJOF5&X-Amz-Signature=1a79a851905177bfb8a3001c679d44fcd8b89007a11edd6cf68fe06f4cc2ee47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

