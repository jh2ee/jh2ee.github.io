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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GDP4ERX%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQC7ldKEp%2FPoM5Ya9gbjaQBMr8323eWtEvWcM8GfhBamaQIgS3hQheoWeZZ4V%2B4EiuZm3pcO4tNOvLa4yQeTquUcsQgq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDGUnvRaL5Jp%2FNfUquCrcAwXdmL9mxL8tYtwhEz0myx2%2FOaCgsMg6buGygXB5d34Tdz0ccfnXQ%2BsYRadEBhjmcau5BaZPOqeq8m%2BZSFtNkpzCwTWoGm2xGUh1XTPQYVleuuUA47fp3VKwLEkk95d%2BEhUiqfKVtBiLhfVGA5ASbnZOf2JUygAimwWDnkBOEh43fIfONSLkBSxxXXg8umXabp1rTyrOtRYC9wlfcRj%2Brt0BzjSkeVZVy9XgNgJKpC86wpt56UBaslioQHxKrMAOC%2FwuO0%2F26xvGiX9B%2FnEpvUIJEkfE0HqNkDURyKBdUX4i7ctXssalUPSuTkPSsYKeYr3hssiWUzt49ztF2PU5Nnm31kls6OUeP%2B3SythuNG3zhIaiXQWHmsum2XynGOk%2FzD1xOOaeMt9qCqxwLThOF8BzRgXRCCMa2OVUZQF3wuGGTbjG6Ic%2FS1UwpEbewKUWU6leSnevaEzHH38Eg7BDjrg4mFoBMRv7ZeBeY3cIIccj6Ng85zQSNfM1key3qVLOPHT0ZPYxGFWPvC%2FKPsJFzhZqKg%2FBaol%2BzES9WJ%2F9LCcQqjphoWJybWhnSmzhGiauqqXc8fF%2FNZ7eCP5ErWcMqcWHoZszUOIdXG53MEPRvhIVlDCZuDNJzZ%2B5tfiMMJ%2FKhs0GOqUBJb1DOXrOcLom%2FFljb88imIXid0tCtIV4PjCfjseOPCriZGpokG9kHFEbKM7HnZQTpPkI0MEeAfZudEVypxT1bOAqjgrQOEj4vWwvglguuL7liyS6f7Q76PYfUcm3EbPjX2T2y%2F277d3ycT2e9TTWQSEGbkkBVfYX4TpUZyww79KOay%2FoiFm6qF9MAw7%2B3Ua0Zdd9Ib95MM55wBbZELz3fBXn8Xwj&X-Amz-Signature=cef903f5c75eeb911f9abe5f7fd7eda6970c0aeb8bea66ff9596f6ad3979e144&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GDP4ERX%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQC7ldKEp%2FPoM5Ya9gbjaQBMr8323eWtEvWcM8GfhBamaQIgS3hQheoWeZZ4V%2B4EiuZm3pcO4tNOvLa4yQeTquUcsQgq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDGUnvRaL5Jp%2FNfUquCrcAwXdmL9mxL8tYtwhEz0myx2%2FOaCgsMg6buGygXB5d34Tdz0ccfnXQ%2BsYRadEBhjmcau5BaZPOqeq8m%2BZSFtNkpzCwTWoGm2xGUh1XTPQYVleuuUA47fp3VKwLEkk95d%2BEhUiqfKVtBiLhfVGA5ASbnZOf2JUygAimwWDnkBOEh43fIfONSLkBSxxXXg8umXabp1rTyrOtRYC9wlfcRj%2Brt0BzjSkeVZVy9XgNgJKpC86wpt56UBaslioQHxKrMAOC%2FwuO0%2F26xvGiX9B%2FnEpvUIJEkfE0HqNkDURyKBdUX4i7ctXssalUPSuTkPSsYKeYr3hssiWUzt49ztF2PU5Nnm31kls6OUeP%2B3SythuNG3zhIaiXQWHmsum2XynGOk%2FzD1xOOaeMt9qCqxwLThOF8BzRgXRCCMa2OVUZQF3wuGGTbjG6Ic%2FS1UwpEbewKUWU6leSnevaEzHH38Eg7BDjrg4mFoBMRv7ZeBeY3cIIccj6Ng85zQSNfM1key3qVLOPHT0ZPYxGFWPvC%2FKPsJFzhZqKg%2FBaol%2BzES9WJ%2F9LCcQqjphoWJybWhnSmzhGiauqqXc8fF%2FNZ7eCP5ErWcMqcWHoZszUOIdXG53MEPRvhIVlDCZuDNJzZ%2B5tfiMMJ%2FKhs0GOqUBJb1DOXrOcLom%2FFljb88imIXid0tCtIV4PjCfjseOPCriZGpokG9kHFEbKM7HnZQTpPkI0MEeAfZudEVypxT1bOAqjgrQOEj4vWwvglguuL7liyS6f7Q76PYfUcm3EbPjX2T2y%2F277d3ycT2e9TTWQSEGbkkBVfYX4TpUZyww79KOay%2FoiFm6qF9MAw7%2B3Ua0Zdd9Ib95MM55wBbZELz3fBXn8Xwj&X-Amz-Signature=cef903f5c75eeb911f9abe5f7fd7eda6970c0aeb8bea66ff9596f6ad3979e144&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMQ537EJ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJFMEMCIEn6UXAtES9VpImpNBmuMvLVdIt1IH5YGJa7x%2FybyyHYAh9HGIJU4xbnzAspM0A9bpIE2lrrHIBZU3Uug4rbJiF9Kv8DCD8QABoMNjM3NDIzMTgzODA1IgzXvfrafHV4yyc%2Fc54q3AMzd6uMBju%2BlQTmjvQx6yyxeSvwC%2FY4NQFlP8vXa0LTCedWVcmN1izPKbH3sX6uNf%2FRWBNA4wQcMCV51LPnB5qwdwz%2FrzLa8z3bJouUCmICNZ4cJdiKhpCutEn8FhuIcZNdDEWkL0qs1anxfYILgdIHKd9sqRE%2BUBNW8qwkmBraFRKanFuXSdLoLX2ZQejy%2FS0%2F3IQzln35dENAZOZSJiJLcafsKRJLnPPi7Gsx7eGJ%2B5fKnaJR09FbBMv9%2Beu3y7DETR9PkVauCrgQ%2F6j%2BpaQit19lhPXEhms4K1%2BGJ6xaV9anHJKwADG%2F8ZUcZ4y%2BYUi68M%2BNfzqm5KUT7pGhZVAxqWM45kk0zLrZodxRAGoyXNBEFLBC2RRdZgF9IBJM9sZSpgAlJkwe8zZLPh02On9rFVCcBtv5VlqygXEXQUXAENdAgudpPm3joFu37m30M9UaKrFQ3L%2Bcy2cFOIlcDu5mvWURs4eLyGJUvPVzUgvdqSIK2W2khvTe8NIIQ1Vm0nRGZBk2jccl54N0gE6MbL7TznvGSSjxjr2KVuOQ2ySRLRXo5SEnF2yfnEB7w72sJAdOlXIy3LXixOWTo4fQSimPwPrMbctb5MivGct7C0rcbsK20Z45qcdSBW6G2zDNyobNBjqnAdAdX%2By%2BQdh4Gh7OjPnZpxhHrtYbXUf8LpPbhuFVG4IbYXBjqrzsflC4E7w3%2FEdNoyRvQt4OwQoYLU7i68UAHvMKOiWCHX8Ngpnp0bdmng0%2Blb8eJHGTaAhSxJUDvW5g0t5ihEjjwjZCMIXEdP%2BuokKl%2F%2FbAiJ3xXV%2BsztwFMiBhSDrNqylhujPys39jayg2gQ1gvXRgeJrYqdW6I9uIKoq3Hm%2FAShxV&X-Amz-Signature=efe221950b4c0ea6870cd7378d006401b9fbab81286a17aa760966bf31ca9a8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWUFFE7G%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDRNCZQ%2Bhe5iZ8BgIE%2BWRk5aA8XtgUKJC7h1xOw65bS8AIgXX%2FKZw%2BShJOupi2Kjv%2BRkAiASgO%2BWzzhTSX7xRrVrxsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNo1IUF9lTW%2FSujcCircA9R9sDzTrtpLW00XSlVYT8Vn1%2Ffkgm8YhDnhyc1HeDX8eceYi%2BNqpiFgkJKBa3J9FUZ%2BIQPZb3T%2F7SlmgbqJ3AMlW1mrQzwC%2B9kUbiQtv7oXPSJHV2dLFQtV25mwjmUWNScLmGCd9IfMOz12ZhA35ZFWG%2FoOLK56CWLK3jxQMaCIuEZo%2Fxk8QTfsmRwUmemwhLd4s5iyIDMkWQagMVrLnz28AfrqvJhmkTW6PkNATJa74NdMofbudLjIS%2F1R%2FLqFn0l29fS9n7U%2BR03Oqg2Rr3vdeZIZUi%2Bph1k%2FTCJ3OIi2%2B4oHstSv%2Fnh%2FUFksKnwrq6w1nyS3YymBtCUoxLCTKHRjMqKUWoMtMKiK%2FI3EqoM2i8ULF%2FqxA1DeuZN%2BDg8LYD6h6vpP%2FMaRiiTOe9TcfigvprrUi7aQ1E9HX2O6wLOQDzgVPuzs3S5bckZlFsef2at8od4CaiTmiYzQdVMBtZkQgzI9ZNXRwHrXVdkpDwSOuwFIXUdPgJ2XeIvuZu0OVVt%2BDQEdLvhIheN6%2FfPhXYB%2F5BBOxqgHNfqHOTt2rATrRRgyH8H2Znqx0HP%2FtuBXQ8JcobNceDtDQIrjBSfz68P4FcRKuBBNpV4XcFZ8XsPX4LwimJf7fHv6cu63MKnKhs0GOqUB35y%2FrwopCI%2BujLGMACLmj7vn7mYq6EP7EAWsUeUWBBfkX41qf5h9WeIzESpmeco4d6UtJAtWSzbjvmUKlgqfQC1N3pfTtZNkBb30CE6Zsl7iIZKKb8XREbwLWST7jUF8mX2CzdvVSIArpTe43HaBc2%2F47O9SDA5uB8U8j20yTb%2FG3jh2PYO8rOU0GAobSQ6zYDg%2FUi1EdX4Hx7XNPVXInnPeYf2l&X-Amz-Signature=8a6e03e051b5fd817262595db0eb4fce10ca285cc1bd4f4b670f223dc7169b3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWUFFE7G%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDRNCZQ%2Bhe5iZ8BgIE%2BWRk5aA8XtgUKJC7h1xOw65bS8AIgXX%2FKZw%2BShJOupi2Kjv%2BRkAiASgO%2BWzzhTSX7xRrVrxsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNo1IUF9lTW%2FSujcCircA9R9sDzTrtpLW00XSlVYT8Vn1%2Ffkgm8YhDnhyc1HeDX8eceYi%2BNqpiFgkJKBa3J9FUZ%2BIQPZb3T%2F7SlmgbqJ3AMlW1mrQzwC%2B9kUbiQtv7oXPSJHV2dLFQtV25mwjmUWNScLmGCd9IfMOz12ZhA35ZFWG%2FoOLK56CWLK3jxQMaCIuEZo%2Fxk8QTfsmRwUmemwhLd4s5iyIDMkWQagMVrLnz28AfrqvJhmkTW6PkNATJa74NdMofbudLjIS%2F1R%2FLqFn0l29fS9n7U%2BR03Oqg2Rr3vdeZIZUi%2Bph1k%2FTCJ3OIi2%2B4oHstSv%2Fnh%2FUFksKnwrq6w1nyS3YymBtCUoxLCTKHRjMqKUWoMtMKiK%2FI3EqoM2i8ULF%2FqxA1DeuZN%2BDg8LYD6h6vpP%2FMaRiiTOe9TcfigvprrUi7aQ1E9HX2O6wLOQDzgVPuzs3S5bckZlFsef2at8od4CaiTmiYzQdVMBtZkQgzI9ZNXRwHrXVdkpDwSOuwFIXUdPgJ2XeIvuZu0OVVt%2BDQEdLvhIheN6%2FfPhXYB%2F5BBOxqgHNfqHOTt2rATrRRgyH8H2Znqx0HP%2FtuBXQ8JcobNceDtDQIrjBSfz68P4FcRKuBBNpV4XcFZ8XsPX4LwimJf7fHv6cu63MKnKhs0GOqUB35y%2FrwopCI%2BujLGMACLmj7vn7mYq6EP7EAWsUeUWBBfkX41qf5h9WeIzESpmeco4d6UtJAtWSzbjvmUKlgqfQC1N3pfTtZNkBb30CE6Zsl7iIZKKb8XREbwLWST7jUF8mX2CzdvVSIArpTe43HaBc2%2F47O9SDA5uB8U8j20yTb%2FG3jh2PYO8rOU0GAobSQ6zYDg%2FUi1EdX4Hx7XNPVXInnPeYf2l&X-Amz-Signature=8936dae44e1dfbf29efd3dc062dee4a833fc864465331bf3cab0680970faf33d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWDZGSKZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDHunzEz2dxIAsmuRKw%2FVicFeEo%2F0m7MeFX%2FjCKn%2Fa0rwIgPmd%2BWqvF7gNMIEqYYOu4q5vn4ajfoGoiLMEhHLSOLagq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDGb7z8urLIBDqVJC5ircA0dgiVx4hYjkCkIimC6q%2FLe9hU466gW%2BoRH34rFkF6LmhDh2G4OvjKNMgaPgCpd5PuiLOsMM3o6yuzfGkD6etoVVASOpU%2BV1wB16%2F5QQHnckIcdFuhotju48dWUpaonGVoFvJ3KBxT0ok5SxHYi6Kou55wO0GpUVl9NbZrlZwtGxJNDGZIAW53xlcaIItULO3UEyxyA7LMCeBqdQLnI9NApHagzQa6v7C9t8qPkjIrQTPAjFMlpp9%2BZIS%2FDdVfYavrIQlsWNO%2FxYohF0SYwLllaHi%2B1iz0Qd55hOaI%2FUg1rVC1WTACABj6hii0mHe4qYwxMYsDlcIfSLKpasqzU35c96uQNXZMxXUU8NMPwpnEc%2BBeVlw%2B9ztkPX5ujoYgq0sdTO95rXHZda43n7JwMq2vLgqONpNglLRsUUsT7WQPqgVcjQSte%2FQjH43vCa30knpqtNNzpkgW6xmgfrBalhRGje61rikGiRIIaolrU3MvI8symtvhGfSJIFZeosj6xunCjt6XVA8sPXj8fkJz76VqMi7e7Os7eXwG%2FjGwDzEPp50b%2F8IJZB%2BhuXPDDVwHnJ%2Bg3maXhgHxABOR7IBSL82CKIUfdlwdEG3fCiAqbFr9CRlyHCOOgf686jw86jMM3Khs0GOqUB1nPkp8gcHV7Wy9lgeMAMfA0rHnSvt0iReJmMAeuWDqhJBJS67eNUtXh3T%2FcCR3BfU5lV1EBLzgKgRnsbDAVz9DUqq7EKnAkEUDKC88qbLxrDiyX0KHMbHzu4X22qZgCVhKLYexASWqnCRacOEh9IvJuIbZYJjvBV9s7NUDpsijZpTIcxZ0YWThLjhttzsT5DOXEzJnW%2FF89g%2FwK8BqhO29UtS5wL&X-Amz-Signature=b5d90eeedd1cfeb4c6635f771ead9bb57501d755467ceee79d4774cb316e29bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGFNOSVM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQC9Yqy%2FiK1pwHk%2F8IEyytfin1nR%2Bjf73xOwS%2FIFhB1ALgIgM%2BFNElk9r6noHO7qJ%2BBEUeYaqS4Ub5xOf7SgueIhYTkq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDBhhAjr%2FJOKdo4vI7yrcA%2FyUX7kWOVzPxp21CHWYMT%2BkqkUv%2FPfgvf08kaug3cdz%2FezjgkXSuJeeYGA79w6BgZCdvRG94WbvXNo2maBMGA9lAueIBXjfzBRSiiaoBnzju6h%2F1K6Qc%2BU6ocvW%2B5n6X1nsAoegX69d9vLtfDNcx6iEVoa%2BK%2FhaaLr4JNcvb9qlhkIVOnuygaPLzwBZC%2B2g%2BbQ%2FcVwguLMpjVH4HMTBRs%2FECtyxIT0gXopz13iTrqck7gi%2B1VrJ1lT3%2BEayuWOgWzFzrNdxUErwKfppr7V1lgBe8BtmyUyyUpX2gWy4il66Q3PtkhiZUoVjYO4LZ4BBLYk95hGZmqY7l6j0Ow%2FJ8C2JBxoIvUNIGEboSHPFHWPRWhG1uJhuAP%2FiKIve1iHl9qM8wxrXKtQ8t8X6ayWywerZNBHKffk9k%2BfXM69ZPYYFBkcha4GUe1dFyqbpfgWWFQsERejwg8PO%2BANFN5CNXw84g5HaTfre54eY77a6ctpX2mo9qswjcNf06JPl2G3q0LRCZdLF2FtpYbGllaEMgx%2BHVnq%2BzcTdl8Z6inCs8S9%2BIzQk%2B7XqirlvW5pWgoymG1yd206d2pzH%2BNGCIcKYW8Of%2FDfc6hZd2pUmC%2Bb5Dh%2BpDZHdlpny0C8nGNPbMMPJhs0GOqUBHgl%2Bj1J%2Fg4JT4xFlrW4Wg9MRrLNRYklOMQVbcUEruGQXUxATdPQjpL%2BldXLZWKeXYyF6RFE4DqMgXpeQRK7wYWvm7uRh3RPja061yZpJJsHNE9mo2yb00BOTPorBg4Azy5THJvqk7bPV1Icov9rSrL%2BH6AulrkijwjOvrZeuG%2FPK4cZvOEvlOEf3opVE4F%2FqhsNobYLmdx7h7KP6VR1bzKGytVwv&X-Amz-Signature=24b52823d2c04ab27aa99f91c6417ec3b617d20f530d4021de9e82d2a1e6e3b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6JID64L%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDEErR%2F0R9wjOTOoV%2BO6KO5MSejMdmCwwe71aw%2Fkt137wIhAO0BAAaOlRXgk7x18SUX3FySqkH%2Br8PSezYqDRgU1RY8Kv8DCD8QABoMNjM3NDIzMTgzODA1IgzqunL0S8YE1dg4UTAq3AO0c5jxizjCCQlJtDMcjVIWcP%2F2ZbAXo9codxWi60aBZQg5ytepkL3sfockLpZnPeAvEURtDF4ncL%2BkJMf2mJMxfkHpBO89H0CGWx9r71bf94NP7AjxmSDpiv9OlwQkTQ9jtkkBHLud43%2BezuAJyxTcOW652Kp2tne5Mtt54zEQzJkQR2FSCdtDE7PD9nEq2QZm9HS%2Bjtl%2Bx6i0WBgwCniypghLzc4i4IBuO2NUi%2FTJNcgXGXiIHBTIAYqjxsfHuy3w79aVLI3rquCJ34QzUAbw6KFWAxlGjxJSgKmlSUOopPCpbkf09xGrXZN%2Fx%2Fo6p0ueYLwYYzuTgHRjkxBfgF7K2WmkUuZGlxBCmxBZ%2BKQsAab8c2CzhGTmmG9TVbcillW9o28EMoxlkdXXPKj96XiTImZiczTjNI%2FBMoXNie5GhYNZdhwK9ZOXCGDko%2BZh%2FrOFf0A4f%2B74NGscQ%2B8PSLS82ifXGTHD0mjIiQJA%2Ba1kM3XHBuBx0a3jKiEwWjNYA2XMjvxhDPw4%2BKPrgFkFpgjRW6sV2TN8q898ejDVY09wnrF5UPFf%2B4H7HzXc9w5LExRe%2FwypLkUZIcWuSXL%2FJekMWG0Oji65CWBQIx3gWiX%2FKI2%2BoAD6viVRBgQC6zDByYbNBjqkAapOXgKZlYJL7tkd8VQCnxbuxLv7Qw6mFve8%2BQepo%2BTVIHRzAC34zValHNHMbZAVSyKjqOGzmW4NCroV7wqrpbOFU8J157JDRivahcukijXGdW0MIw%2Bd0r8LJO%2BRiO2YPARr1t5JZS1Q4dpCJZTNwZyQKgxexyessYjLoimL3iy95ZNAAXcifclgm5FjbGwBwtRrK75Szut0SAUJ2Hp902nIcxtp&X-Amz-Signature=da57e372f8ae30cefc25b2fcbe1d9f0e3a0668d7de063ef1bd3047094fcbf08c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZF6EOPM2%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIBH2rvPaTaTH0W1892zpFNSDf%2BCzQpWIQlzXd6KAkxB3AiEA1aQ5z0jf0S65%2FGVUWaYz8GAg3tGKqWNecAf%2B8Emh5vEq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNZ7plJkh4sU01iOwCrcA7ifkQM5zKuoCEnmwMT5%2BSlkL%2F5BlNaR1tLAMKQjCT%2FbcoxHBcmgRTZnykrYR6i6AOt6n6n9L9sQ56vv68kN5vG%2BUdYlAPjcrLvWKcdUnt7MkMApRZhH%2FXDKyNPbFAeyofaUE%2BTlDuAenfLGT0lfT2RlmENXRD%2Fj0lAtersNgC6qB4wTC9eaGHYgIh7RhsmuF3e2Lc3lVH1fvHX3wLhsfNCgI3gyVhqJPpB4LvFp8DPVUA5BYaRpKeQezp8LzLaj6r1QNF49HSGDO88skzmghToowWPOsK1ogYOrcz2OLPGeX04jwNOP9uJHXe8qx309k6xOYsi0l1wb%2F4NkFLw11KK9e9ZDgEPBh%2FwPyq35nf9lC1reOFWIXvhLxnsdhrdikWGDrB7ehZbzljNc2pY7mwi4nirzywn6JN%2BjJy6B0j3%2FbiEO8lFYQQuqFfD7Y8u1mRIHqPVSS9bzI2nKIQPlmXkSnZRfslohPBUjX%2BfIRlZiSIfDp3e6s4wbLR8LqMRr6ybmnuLhNGx2eI5RKm8DA3qgF21TJ5VfxeiWtHPVrbIhxA7cmgvYcn7vXIqGFb%2FlvcB910XBvt71Bi5i6D%2Famzs9HrkuYf9R5cqTqx%2Bt657%2B3XNLJBAcvMhwS9M6MObKhs0GOqUBEy1yRg8wUGDzI8h3M6DErt4zZjNbQIWHW8FqirbGf6uKSRYtIVYNsKQcZTkX%2FMYBZa9IxfgxFpXFGtmsD%2FDZuaKM474q4X6tj9L9En2RyO52G3R99F5hi9f9igDT9ZfceXcUcAW0hYbdq%2F5%2FAjIJb7dbnksyUlzx19vhnqpO9xuLxXUuwbtpt3Iz%2FIMByfFLq4lHLSxz2xqCgmiir7lNgItPf8Nn&X-Amz-Signature=5fab887c2bb505ba25ac49960a6fef4e31ea62917051d0b89a79e8a468c4b28a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZF6EOPM2%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIBH2rvPaTaTH0W1892zpFNSDf%2BCzQpWIQlzXd6KAkxB3AiEA1aQ5z0jf0S65%2FGVUWaYz8GAg3tGKqWNecAf%2B8Emh5vEq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNZ7plJkh4sU01iOwCrcA7ifkQM5zKuoCEnmwMT5%2BSlkL%2F5BlNaR1tLAMKQjCT%2FbcoxHBcmgRTZnykrYR6i6AOt6n6n9L9sQ56vv68kN5vG%2BUdYlAPjcrLvWKcdUnt7MkMApRZhH%2FXDKyNPbFAeyofaUE%2BTlDuAenfLGT0lfT2RlmENXRD%2Fj0lAtersNgC6qB4wTC9eaGHYgIh7RhsmuF3e2Lc3lVH1fvHX3wLhsfNCgI3gyVhqJPpB4LvFp8DPVUA5BYaRpKeQezp8LzLaj6r1QNF49HSGDO88skzmghToowWPOsK1ogYOrcz2OLPGeX04jwNOP9uJHXe8qx309k6xOYsi0l1wb%2F4NkFLw11KK9e9ZDgEPBh%2FwPyq35nf9lC1reOFWIXvhLxnsdhrdikWGDrB7ehZbzljNc2pY7mwi4nirzywn6JN%2BjJy6B0j3%2FbiEO8lFYQQuqFfD7Y8u1mRIHqPVSS9bzI2nKIQPlmXkSnZRfslohPBUjX%2BfIRlZiSIfDp3e6s4wbLR8LqMRr6ybmnuLhNGx2eI5RKm8DA3qgF21TJ5VfxeiWtHPVrbIhxA7cmgvYcn7vXIqGFb%2FlvcB910XBvt71Bi5i6D%2Famzs9HrkuYf9R5cqTqx%2Bt657%2B3XNLJBAcvMhwS9M6MObKhs0GOqUBEy1yRg8wUGDzI8h3M6DErt4zZjNbQIWHW8FqirbGf6uKSRYtIVYNsKQcZTkX%2FMYBZa9IxfgxFpXFGtmsD%2FDZuaKM474q4X6tj9L9En2RyO52G3R99F5hi9f9igDT9ZfceXcUcAW0hYbdq%2F5%2FAjIJb7dbnksyUlzx19vhnqpO9xuLxXUuwbtpt3Iz%2FIMByfFLq4lHLSxz2xqCgmiir7lNgItPf8Nn&X-Amz-Signature=c26f8df4a660c6f494ff326e2efba4a85f216cac41963ccff6817773f7b8a73f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBBQXQZI%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDoenivU3JRhI8v062uMlYg%2Fn7GKVzuPCbfdE8VfFaoIAIhAIBf8IxsUssk1Ias4dsNH7dQYUUPJDFMHVFGknFynwhZKv8DCD8QABoMNjM3NDIzMTgzODA1IgxOuozR3A4sH34bbP4q3AMWpFdSDBuXkxBwWFJOJaE1KaJqGsYtgBmTk60uD6gynbDqQZGB6JNBjga5TUHFZvx5FPS%2B6v4B3MJQqejb%2BHHUfBAep45496ZAg5E%2BmO3PWn5ErbThKs27sYkawTYHIil2ISQl8Un1BMsKjxomBSsX6uBY4j4rtmZpKtWrjBEiALBjpx%2Bh7YAyxYbOBSegSdpxTchw3XqCQcoH4yKiBU2%2Buh32KzY5oSE88zzEQaDFUisnTY%2BtLqEPLP%2FMiEibSa8%2FukAj8C64le9e%2FuVay8B2%2FJudHR8MtPBO5fUGWsA6OzttqG%2BFLV%2FxnCVkWeNSEQI%2B4ko4Oow7A9hCvZ7ueF8mPs8h82AB9pBtw1aLexm8M2MEspqlW7V38ufhnWmn1PCuyv3Ng5eZxiABS78rMo%2FQo9PGzJ7I3TMGP2e5WF3CTuMC%2FHlR0FTYTpE3Kb5EXaDXLx2MtxIiZHsSsIdPemjPQ4xc7svdMWH%2FTaqZaxocxKT%2FxKXu7y2%2BWQ%2B1ln6LoVn9%2B5EHRAjBx65hGlaZzlUUJpCcxTbWCHXFv1vZs47X6tcTrePy%2Fyzt%2B7AmHOOWxki4KprohqHKIMXuHjY7QdeFhftVlnhWd%2BSzstCHuJTAJXl9%2Fbesm5mZEPy6ETCqyYbNBjqkAQY6E5R6M7u4t%2FaLpuNkqMLYnrLogcv8smNAamci065zN%2B2jUDcT%2FlqZc6pnr%2BWxOtminPZNPvk%2FLXQAxID1kobbXyu2M4lQLf5pAUQfMGAFKZ%2F6T593R48w8vn4irIcHswH%2BwFKaSEKdJfcLEXqmbREtxzWhozA8d2oHyCPGKnDqrGngN64WFQT2swycX%2BloEJaQJ0Vc9vfbArf5Pp9GWKzOCLt&X-Amz-Signature=02191844d0b57c21d801dae408fe8ddfab87f8373e058bc78fc03f7ebb7e5b97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCHF7RKF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIH%2FDzM91S4gGxMbkZ11M8XxXJ3La8WAn3C5Rb23f3hJUAiAJDHRmA5rgG3nsPYoi9CljkOf1yVXhM1z6FVaNUQN%2FSir%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMGkrIcWF60Cbz7x6LKtwD%2FinRx08OPdseWRnxrCVWK3NyT7ESpH84xscdehjupbEMx1zhUmdKRI1ro8u6VZYwNFZKS%2BSOiN2jGVhRR4vLuwA7uFZRb6hX6jE1zpVIFyZoXmqCwsZp6ir7T46PKBtBBJy9entsmkBTisL9eE6XShYcbdfKel8KlhyV9tSk%2BJ2lIi0%2FUJNm3sPZcWLhDb2xRcBbwMHRm4uv%2BdTaowfRP4et1sog%2FDHM0C5tY9kq7CWMXQOkBRCUFmNTjU0s8XGdftvZfvihDwpI%2FGEpIR0ZJXBju%2BXN%2FngBzNuI4pOitpGgnkfssrqWxzb7EeZNy2KrOT8VKkx3c2CVsyRTSA%2Fq8zezIrBd4Rlq9XBDXvyQHdVu3ITAL%2B%2FNwjUUUa9NnCb%2BQoqyh%2FBbmJOpTSwlWpAmjqDL5cLWiwdZHQlHA0HQl5uJ1JdzJegPuSI22wdLAIn1d2qlTZ7BA6X1LyTG%2F9eAMST6haEuVhI9%2FlCBOIeCziHkxlNi4e9bwPELmxDb82lb0cXLX5f15pC8TyP55jhw9SN1X16fYKKYgiKbsNHQLMIg7VN3eP50YbWNtPO%2BMxLqMO1WiNDHTOlJlEc%2Bx8S7T2UOnKfjxjXQq8vsuQpP2dr0bciIbig%2F0KCkJHAw8smGzQY6pgEwcBDPZYN2NYMunQfacJvvZg%2BFSvgAQQ7Pp3Xe%2BCe%2BxTRC1RWEItsNm58devU06mCUewyXI8Fxb7mCBR8V5i0jC5rw2IgKeDvMzRMVjjO41snmbccGc5ozWBboLXEQK2peEFPeOKt%2BnGXDmNNyYho94bQvjUNuwRF1qZg4qTIaysXAc7YgE4G%2Fc52APeF8%2B7ChfkIqPGKNz2%2BWzOcHfl%2F369zLSS6V&X-Amz-Signature=7388eae718194f26d649afb5df850df9403201dfb6b8d8368b93980a02c59d39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCHF7RKF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIH%2FDzM91S4gGxMbkZ11M8XxXJ3La8WAn3C5Rb23f3hJUAiAJDHRmA5rgG3nsPYoi9CljkOf1yVXhM1z6FVaNUQN%2FSir%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMGkrIcWF60Cbz7x6LKtwD%2FinRx08OPdseWRnxrCVWK3NyT7ESpH84xscdehjupbEMx1zhUmdKRI1ro8u6VZYwNFZKS%2BSOiN2jGVhRR4vLuwA7uFZRb6hX6jE1zpVIFyZoXmqCwsZp6ir7T46PKBtBBJy9entsmkBTisL9eE6XShYcbdfKel8KlhyV9tSk%2BJ2lIi0%2FUJNm3sPZcWLhDb2xRcBbwMHRm4uv%2BdTaowfRP4et1sog%2FDHM0C5tY9kq7CWMXQOkBRCUFmNTjU0s8XGdftvZfvihDwpI%2FGEpIR0ZJXBju%2BXN%2FngBzNuI4pOitpGgnkfssrqWxzb7EeZNy2KrOT8VKkx3c2CVsyRTSA%2Fq8zezIrBd4Rlq9XBDXvyQHdVu3ITAL%2B%2FNwjUUUa9NnCb%2BQoqyh%2FBbmJOpTSwlWpAmjqDL5cLWiwdZHQlHA0HQl5uJ1JdzJegPuSI22wdLAIn1d2qlTZ7BA6X1LyTG%2F9eAMST6haEuVhI9%2FlCBOIeCziHkxlNi4e9bwPELmxDb82lb0cXLX5f15pC8TyP55jhw9SN1X16fYKKYgiKbsNHQLMIg7VN3eP50YbWNtPO%2BMxLqMO1WiNDHTOlJlEc%2Bx8S7T2UOnKfjxjXQq8vsuQpP2dr0bciIbig%2F0KCkJHAw8smGzQY6pgEwcBDPZYN2NYMunQfacJvvZg%2BFSvgAQQ7Pp3Xe%2BCe%2BxTRC1RWEItsNm58devU06mCUewyXI8Fxb7mCBR8V5i0jC5rw2IgKeDvMzRMVjjO41snmbccGc5ozWBboLXEQK2peEFPeOKt%2BnGXDmNNyYho94bQvjUNuwRF1qZg4qTIaysXAc7YgE4G%2Fc52APeF8%2B7ChfkIqPGKNz2%2BWzOcHfl%2F369zLSS6V&X-Amz-Signature=7388eae718194f26d649afb5df850df9403201dfb6b8d8368b93980a02c59d39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZHL3B6Y%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T152645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIEF%2FyKeNRKpJ63WAnCM1Y1iPUj9%2FkHMajo2ReBXgPjGhAiBriV0CNlZ3JztUX4y5%2BteGb7jCtxG42ipluojp7N8c0ir%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMhWeenxIA5aTxWTLXKtwDpi8oOxCQVkzY35cEAO4mQ2Xju3AtM4PAMWAPBUBQwyBuJ2iJv2mhbnVswt0g3sBjiH0uqGNDP0RQQ1HXP0MIJQpyCiMRQ2hGepx3XnI9Owj5ikdpPPnxwMcFt8GJzFGDbVgbFA5yPxBogxfR%2Fpm8fS%2BDp6Q0FK7V9wkGkSjizDPEZhKJ1qWx1%2FLe7OyGJrWqFaF79F%2FBCcA2mYq7CbU2YsjLPXFzVC%2FXJXPnUsNlq%2BDsNeLgo42L%2BOG%2B5zBSqq0%2F5x6vm7fp8S2QzDdtVRbQPzxts8WxwEaXi5Fu4LVZOzdR0Ex7yzk%2BN2P%2FiF%2BtOPg%2Bz5mP1eLjD7O1Id1MAlgGO55B%2BwA5wo95imzf%2FhPybIVLOhj9BXJTIulTeNm4wlXLJh1%2BVzEs7AwnNcTrnJDxrIM2bRRz9vePBNv%2Bc1xeMsv5yhu4iS1VlmN3WJMeoDohcfEWaaOyse1CxaJQF%2B03sJXfbgv67KEOrnYFtcJpdbut9ttiY8LFmxc4I2vSTaRyFELBjoFeaLpLzfKMoeXsQFQG%2BZ1%2FSXsbS1guMq73RmHFhIbA0nKkFlAIFH%2B6V9eNkR1jC673ucUNHKLHja9Bqf%2FieS5YYoEeHcN1bDlzYFvOw5pdPzrDl1csWtYwv8mGzQY6pgG36A4%2BUIs3z56ETXtncXGIkaLqeemAktPZRbn32USVZehnuh62pRnDqRa6NxE9EhtHx2s6COAXfpTmWIB7GQfOjXIqZfJ%2Bg5BczpMiCPJDtJjBE%2BHf2NYFAo8gUYif%2BH5iDGMLlNfpksHz96RvwBbyHg3%2FNt%2BExm5K7RB381vzrDpWj%2BULcr8sHSiI4RkJqU1IqqBpPUA1UsQd3v55RoFRlWwr9ApZ&X-Amz-Signature=abf665dd318375b42ba9fef64831abd9cba6d69f3d2fb608309b223be25b4f1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

