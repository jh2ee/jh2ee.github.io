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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SP4R735%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCJXqXF6aHk62g6oEVhmRFolBKRYAZAsGGBgOg2O4w4XQIgUE2CpB5x2gKUBl7Pb93qHYgGHOrqKPwlxG4CoRlSPwYq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDDDlYDAEEKeXixdf4SrcA4T3GEL%2FrZYhQAghkbMuLYdygORMnXkh62Ctpa8c9GZEzz%2F5NPIhWhdpwTkCcXCFd0QxyImDfXbb%2BYP%2F%2BuTNf%2BCk9uUmi4rA1WeUFejXKej9bAHXhrQyk18IS5JlwYhgu6%2F8fV2xEx%2BNsZVdAzAV7pMJmiGN3nAUrblPBeDB8T%2Fr8rJV5Kh6eG49JUXQzCE2I7jDAJnqKKIWtDVCkvk2QJy%2FJJe3%2F4VK6%2FMyLO10JT39bKi517YkBSTmqO2PPkJtYYOMWpGgMG1nnEwJdQCOPvFNeblyYSyq%2BykQWOvnGghjaToun80bcKKycmFPSCBuOFKIqsMYVuqRYRNod%2FXJ2PRidXh13dN0Dh%2BJguqwzA4Q9b7jQrD2RJ5bxTjIOhKgSdfGSIJoOZo2eycoGkICctGTDbVfwUbk5WmMwbcpiRR6OdvOn5jUrBEyFfWotGPwkrf%2BfiMc58PVFFLmzx5yDlgEcNMkeXUCOanDFtuVXKTPJqhJOSEdYSAFQPyXZ8%2Fevmey9rgXFPanvd%2FvF08d8ILwQeDEP8PxuJ57FOllHhXbW9DU%2B1A%2F%2BGMYaoYCxuXesYnb6UHbT8lJBcr3oeqshp2MZt4ywhNFzkKZj4TsdGEx8WE2VLFlrgsHUA5tMMKTzMwGOqUBcK3jJKlL5%2FCovCVvWBLgwx6fOg3rdm4Fs4dXmweXl4KScxeatXyphgYicvlAR3X5tlD%2FuedgnpfSRxpoUiDoQk9SJIdkcApShflKzWLsYeiinEdHQNwGbNB0upHcV93zU54yNs1sCcdMpapzKxZowPtBUHnHoI0B6Xeq5CMhMMDdA5du5XXzU9Ip%2BwycHwkoEbusCa%2FcMfeJGylbikrKckFBM%2B1v&X-Amz-Signature=7e3c9f2ea84b873628e8414dfac5c9318068098934fe7428aac8094142649a2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SP4R735%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCJXqXF6aHk62g6oEVhmRFolBKRYAZAsGGBgOg2O4w4XQIgUE2CpB5x2gKUBl7Pb93qHYgGHOrqKPwlxG4CoRlSPwYq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDDDlYDAEEKeXixdf4SrcA4T3GEL%2FrZYhQAghkbMuLYdygORMnXkh62Ctpa8c9GZEzz%2F5NPIhWhdpwTkCcXCFd0QxyImDfXbb%2BYP%2F%2BuTNf%2BCk9uUmi4rA1WeUFejXKej9bAHXhrQyk18IS5JlwYhgu6%2F8fV2xEx%2BNsZVdAzAV7pMJmiGN3nAUrblPBeDB8T%2Fr8rJV5Kh6eG49JUXQzCE2I7jDAJnqKKIWtDVCkvk2QJy%2FJJe3%2F4VK6%2FMyLO10JT39bKi517YkBSTmqO2PPkJtYYOMWpGgMG1nnEwJdQCOPvFNeblyYSyq%2BykQWOvnGghjaToun80bcKKycmFPSCBuOFKIqsMYVuqRYRNod%2FXJ2PRidXh13dN0Dh%2BJguqwzA4Q9b7jQrD2RJ5bxTjIOhKgSdfGSIJoOZo2eycoGkICctGTDbVfwUbk5WmMwbcpiRR6OdvOn5jUrBEyFfWotGPwkrf%2BfiMc58PVFFLmzx5yDlgEcNMkeXUCOanDFtuVXKTPJqhJOSEdYSAFQPyXZ8%2Fevmey9rgXFPanvd%2FvF08d8ILwQeDEP8PxuJ57FOllHhXbW9DU%2B1A%2F%2BGMYaoYCxuXesYnb6UHbT8lJBcr3oeqshp2MZt4ywhNFzkKZj4TsdGEx8WE2VLFlrgsHUA5tMMKTzMwGOqUBcK3jJKlL5%2FCovCVvWBLgwx6fOg3rdm4Fs4dXmweXl4KScxeatXyphgYicvlAR3X5tlD%2FuedgnpfSRxpoUiDoQk9SJIdkcApShflKzWLsYeiinEdHQNwGbNB0upHcV93zU54yNs1sCcdMpapzKxZowPtBUHnHoI0B6Xeq5CMhMMDdA5du5XXzU9Ip%2BwycHwkoEbusCa%2FcMfeJGylbikrKckFBM%2B1v&X-Amz-Signature=7e3c9f2ea84b873628e8414dfac5c9318068098934fe7428aac8094142649a2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQE42DO7%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDCk49sfx0yERSR7%2FYLL6I9PehNwqhrVdVcuOoPIbAfbwIhAPs9KgMFI5wcdiM45Kg43yxDARjboGBezErvF3paAMu%2FKv8DCDUQABoMNjM3NDIzMTgzODA1IgwcRvTAcOgCDMi4GDwq3APvGCXCLbIf7jtgPl2Peib6543ULj5T%2FbUD8BMcjjYxTVUiVOhzau34bPtejapEna89X9h0SFLulNjAnsiHJrsetwd1PrADYMHZfoWnVrm5PKGJ9F8vfgX1t8x%2B4jiUWkkhCGdaXIRieR4wZfr6O%2BLP1HPvlsPpMberZjJrnW5vEaSfqAoXCTDMjrTivG2zIH4P7f%2FJEllykIGW6qbyOjK1ublo1cQsgptk9229miS1m0cKDjoF5YihswGguiwoCarImlPTXvKzCzO2ZgVRDVlFRhc%2BVg8XneRDrGOddK9bbCRZQcn2IWda8IeEj96RGGppOxXM%2FifW86vLNbsNvcyZvbP2eG3C%2F168TE%2FDFT570XPi9cpDTD0VadjyMZTpovp%2F4%2BqEf2wyNVnIyIgAtRmfL%2FvKZJsV%2B7iAvrgzNp8C1DIzzRrBAbTMI%2FU7OeBgSLFUbubL759t6QzrMsDshdq0eCiDKXKS5benXscBS16ZVyKD6rmxBkoR53JH3a5s5OPylM7qwCv4nXZL0tB0q0AB1vWln%2BZuTgw%2F9i%2FBXitGQX2632l%2Bkxg9WT0n5OHnPZi97UFB1CTjvQOMmN5jzpG4f8nyJDhQxLTZ72jqx4y1Usf6QbXIZ4bGszEC0DD4k8zMBjqkAQHxJIAjoSIMganfyoFRAJ%2BaM%2F7HI2WsuWmlb276tWRDJFyajLA%2BVhUvPiNP1oEFblMBnjR382Kv9%2FBxZ%2ByUWcOWc1sl8ZYdGPa0aNDSMjXvKVcZ%2BrwlLF0btXpeG8JNg1CMiaHD6vLHgKtL5xUpgy89lVg6iH5DEnXz26v0Uj7AI%2Brc4EABQVQMIomRtrw0pbrIakwMuR5UXVGlk%2BK4bidocEPP&X-Amz-Signature=1d55621f69dffde8a0831d653413fd72ad32d0b69061599c000998ad897b916c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6BOZFTK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDCNt4U20tPDvQ%2FB722%2F3k8J8wSGG68%2Bl%2BzBdTC7UO8ygIgYy9CdKTTfVCcxPaXk4atxBppf2KWT1Dsm92gbGB9elwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDEOMP2Y3piAiGOWD3SrcA7o50e8DOdfR71HXEScMIrExNsXW2ELrd%2FWF3GnZJKLJmXk28nmBbmURUqnWMMosmFc8qBE0yOYY%2F9WcoFI0wfpQRLw8gTVFlcKfYWY2Wjce5sJYTe7UbYsGOOK9J%2BBNU8nfz8kUi7A0zxwsgYiBJ8p%2Bf7OCc0qOe0XW5FNZPxevhyK3oXcisawK2EoRcNhpRRGV0UJB6%2FaaxSm3sZOIvQfPuiwIvAi2%2B058zdmvJOpf6847lFHPC%2FvGBsbb2uMw2%2BBlT5QSuJqJMJXB1Yu%2FU7zCf69PGrtwY%2B5944UdUlRt9GfhBvLKGucpHm%2BF8C4CHOIkokfTVSu%2FYBf66uuefuV3A6voNsaMnHhn1StP%2FbpmfcjFqi94RNs087Oh73ggdRVajqUyTxaH2L%2FzEBswezEljns2ppH4VTsGVB9BDS%2FaFddrn5aAmyW%2FJeJgjdXfFp3i%2FBAhFN1YyS0jTjtkPw1FjqQRpLGIpom%2FIsc5sP0eNhNUa2SNk7uEaWNnw%2FIMfyH3wbPquJdEygAw9Wm4RnG5DGQ1Gs7jJhOZcQq%2FHVNPF%2BgE4YRHCPc4xoHDDtbsC%2F4W6y7tQuhepMO442Cjz0%2BggUh8p%2BqJAgQk2%2BLBREV25JtdPLQoFGDmHm9CMMqTzMwGOqUBTfpIpcbd6D8wexOKMtIPSTtERX3JgSCCz7DkCH1qVAWPIIcArbiDgQhyffj4uaqSeJLJUYuPQBRO20CXDLqxsHkB4OiCnDOkdMlsoQDk4YKxBrGwzJvSScgnLwVSDBFm%2B8IKuq52%2FIT3VXphJAhDfJMtdCplkSnSOEi4WE%2ByGcFX4A6%2FqgL7tgJocPUM35J99D5PU%2FIZVfXmaK29Bk%2BjJR%2FVFxqt&X-Amz-Signature=9b97cf218abaacf527353692f8c5715e485f8620e260d20b71d3c7203e15f68f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6BOZFTK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDCNt4U20tPDvQ%2FB722%2F3k8J8wSGG68%2Bl%2BzBdTC7UO8ygIgYy9CdKTTfVCcxPaXk4atxBppf2KWT1Dsm92gbGB9elwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDEOMP2Y3piAiGOWD3SrcA7o50e8DOdfR71HXEScMIrExNsXW2ELrd%2FWF3GnZJKLJmXk28nmBbmURUqnWMMosmFc8qBE0yOYY%2F9WcoFI0wfpQRLw8gTVFlcKfYWY2Wjce5sJYTe7UbYsGOOK9J%2BBNU8nfz8kUi7A0zxwsgYiBJ8p%2Bf7OCc0qOe0XW5FNZPxevhyK3oXcisawK2EoRcNhpRRGV0UJB6%2FaaxSm3sZOIvQfPuiwIvAi2%2B058zdmvJOpf6847lFHPC%2FvGBsbb2uMw2%2BBlT5QSuJqJMJXB1Yu%2FU7zCf69PGrtwY%2B5944UdUlRt9GfhBvLKGucpHm%2BF8C4CHOIkokfTVSu%2FYBf66uuefuV3A6voNsaMnHhn1StP%2FbpmfcjFqi94RNs087Oh73ggdRVajqUyTxaH2L%2FzEBswezEljns2ppH4VTsGVB9BDS%2FaFddrn5aAmyW%2FJeJgjdXfFp3i%2FBAhFN1YyS0jTjtkPw1FjqQRpLGIpom%2FIsc5sP0eNhNUa2SNk7uEaWNnw%2FIMfyH3wbPquJdEygAw9Wm4RnG5DGQ1Gs7jJhOZcQq%2FHVNPF%2BgE4YRHCPc4xoHDDtbsC%2F4W6y7tQuhepMO442Cjz0%2BggUh8p%2BqJAgQk2%2BLBREV25JtdPLQoFGDmHm9CMMqTzMwGOqUBTfpIpcbd6D8wexOKMtIPSTtERX3JgSCCz7DkCH1qVAWPIIcArbiDgQhyffj4uaqSeJLJUYuPQBRO20CXDLqxsHkB4OiCnDOkdMlsoQDk4YKxBrGwzJvSScgnLwVSDBFm%2B8IKuq52%2FIT3VXphJAhDfJMtdCplkSnSOEi4WE%2ByGcFX4A6%2FqgL7tgJocPUM35J99D5PU%2FIZVfXmaK29Bk%2BjJR%2FVFxqt&X-Amz-Signature=77a2ebe6b64b9b7defd1192bdc43a2138ec48273234bff9b3def7fccb684f6c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5UJJAZG%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIAHy%2F39rxuC5Yx%2B7lL8R%2Fm88Qrrk2tp4j5BrECmguKw4AiBPhoQm4rtkPLiCaOj1YQ9Md0PX7aUQBve92yHu041Tlyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM2XcUmD37Z2dL0jVnKtwDHyEtlrnpIC4%2FmTvcIm0oj1k5aLhaKF3NFUyOLEUaSmGSea0y3pQ3d8a5kCB4gMlqy%2BcOC9DpprwKiqhYsoX4%2BG0ifKmuUW3AKiBMmoAUerGJnYljnRcRSOS8jmXG10yVRfQ5pbD%2BeJd2OpUBAQlk6yLYXxAgvxhH3cy%2BRXsC%2B%2FljRaqzcfd%2FiPo6H3OEMWtpujL6d3iZjr%2B45z%2Frzj%2FZclGFaZIxxlSrcPZ9nCaXhDolcTq%2Bz3WrUn18vny58csS2vBloXfzQfEBCRfSAz%2Bahnj52aPfjJ14WUIWdB8F%2BaKVeCaClpapoDhFAxnQ0MSADPLJNYFB4r07anYS3ys1GgdnuQR8tZmP5GLS7O5m7ZVDoW1xrUtmSGLRdIuX5ktLJAw0%2BRAn%2F7AVOqt9VSazcvt%2FsqC%2B3FPSL%2F3kvV0OaLae3utDRpEGsLJPU0gmWTVONvO7WtAacryvaPCjccpt9yRoA8Q8TJ5aPVjxwV5EpDBjI0Bo4cRzrhjE6sPCIHPA%2B1tUe63qlrhU%2F%2Bg6esuoVn503bhVsyAHYxnKLRy%2BLnKALAgbAYt7FiRs3PKw%2FyrrZ7f6pihxGSKLxr9NuPEyb3i2mVX1NBx5iPGdaPlPB32%2FD1l8roITr4thHmMww5PMzAY6pgGHyEsUy%2Fd1lz3FzindaRXuw3BvHVvXOSdTjdf8GjKvYlEhCVwjmtE7meET8SmqvRZCQ9w6lHIiClK%2FROiVSzzXCgPWQ3821POQDYBiXUwXdVGbkjsphplaLFQMaFNN7qm55tR%2BZMz2RkOzKy645UzgyWHat9kCkGiZ03sUvfLQRPMT7fN5YALUDrBHlC9RYYMHortEt7%2ByNRdW9NF6t%2FGjFr0dyTg5&X-Amz-Signature=4fd74f846680d864583d2187efb39cfb220d2264eb7fdc26bdebc99df5568681&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3K4YFLS%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCb3jbIiwDoBh5PDnQ6Bkj8T26Dv10o0Ni%2BuR7PXGpUBwIhAMzri3%2FCdIqU3L1ue444C86brHa%2FmckHJocPuj079RU2Kv8DCDUQABoMNjM3NDIzMTgzODA1Igzcg%2B7Wbf8A6NHkMIMq3AOsP1hOI1RQw%2FmQnp%2FvqArY6%2FdIPaf07bClrTv%2F%2FbtvrRfhTkSLl%2FFyre7BEi7zFJ7VsDlBGkmazNCD369aCgzSMmJOwMy6e11APGZTpfroNq8AA8KSzuqmx8ljCZq0LFs3lbul4TgWUyy5Nn4H8V7DC0afVe2yxlguleUlad4TvK7Z4x93V3UjKXlpH9UwIViPy9UPHtgrWQrlgELiuTZs6G7eefNkMtDu4bYLcKNEQPweQKWulP%2Fcl3sW0agGiTFlFoVfvMKcppOace2ap3R0EvlAK%2B9DD9Tcor5ACeAJLaL96%2BN%2BAt6iZvsec6dP3BDBmG19swY8xwWg1hH6%2B9eCzyp1M7jUb%2FWKM5CM7UI7Z5EdPKG%2BkSbYp4An96h5y5csH3zTXJ99bSNFHDebItlqbOkuHcmCUgQ%2B4LK7%2BidwJl0jFqQzH8yQGXZpUXpWJZByczC7bKX1rQd23IQSmWSYu17siwDiyJLP5U5waGWgDcEN0l8FajswTdMAoGSsOad%2FRdAY%2FDffqjDedeeYv5T%2BEG012G1a%2FKAl45d7jGt2hzhwRcU%2BKSUXTEbcV6oRxgHmWEZwX7bzsDEKsf8pVERcdFVHi1UlGMmOuGn8skqS0WiJ4WXkL4Nc9Hx08jCIk8zMBjqkAajaJjBVAQoP%2FIZ9dlvWlunQH6klKIJQhbL8K0sXBwhomwYc%2BtmXYaDHxFoZfscZVzRfZcXiWsuTbdIFAn1%2B7JanX%2FrwzdwILOy%2F94z22TdUPZ7pd%2FzRHmHhdOkOCrK4S9tE%2Fu3iBCudPLaaizLHoY9Dv4aQnOQ60kMI%2Fef6fvPoxLAyo0kSvcDksv%2FDaCCXU64XQYlOOPcGz22dwsWM64rtyCw8&X-Amz-Signature=e4a5dcfa9ecd09c38bf93af4bb802902b1c31d7018751b0258f55226135276c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZYTC6VJ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCdKpxFuQ4%2BM9sLDI6g%2FZkzVOdYJZK3KKn7w3uYh8zlQAIgazXnLA8uHGHV2ZHzbKr%2FBSXnGxtBmnduN42FaNh4bUYq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDHDYHssJpD4oGcTpdyrcAzd%2F%2Bw80nGCgJ4SsAoyzEmy2ThLMZQfv9pH00ZPq02AAB%2FBiCQC3SmvfinSLtVIDxAb%2FitSmxOu89hJBM849IjQkOapAqfuzJVSrZ9N2zYLbKVd4cuvAF65pgN11kHFy9Fov5%2FrCnxuJORrtHeFOLojVn%2B1hDhF1vLiqZJmXvls8Pr8DNaXYTQrFG0Mh%2BvUBS2XcwW8Uj5pMM0mcNhCI80MndVWB59oAxFShHgwAZqQKSZ3rW8d66PR3XUWhMnosiWdviExrgO1NpZOvanZX%2F0uCuWEhoIRzywVheXUJ0rsFdEKwNlvI%2FSoHGEMHmG43eNZbv3BFLD08jTkB6JCM0LgaIOj1jLC9tGek1z8B%2B4NWkN2zsiNqZR0omD5vxDyB4Sg0PNbUraDQqHkHf%2B2mEJj1Wgt6ATe1brrlhp8dE%2Fqds5VrNt0lW7k8jxeXdx4W580StPIe4Qy6Dep4qhvRUd%2F%2FuIOOxDGtKUX%2FiL5aqnTo7jw9H9ezisCMqgqNRDZdr4Tj%2BWEZYSrBEpup%2F3lx8cb%2BeSvl2dH6aP5f7bgKordZvn32Rrd%2F%2BQeIJrOKFHODXoiZWwv%2B9ictR883dM9DlHdYZlsiZxR%2BfHj16%2F9B9SEK2QpU3iIGUN4%2FibMHMJGTzMwGOqUB1tQI0%2BynYYX693lge1CDmV%2BhyUdUe%2BACViuChgtlk3HoFhGbw1I76u4%2FO5WN7Z9vfiLo%2FOcBB85xIzKejBB%2B6F70XXL4%2FgC7C8AExiU0sVkiFlfwFlSHUNLECdFjjZn1S%2BuhyfoyPsADaaSuUVbcULFx9q7qfEVjMJbXG%2BBOlyUF6ngshevfhLP%2F%2FyrDVHzydBCfvO4zkUf9puJzmi64o5lGvQnI&X-Amz-Signature=b0f9e15ea6fbaadbdb5370bf2e84e579142a5dadaeb3b558bda10ae304d189f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIFOPBE6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIBH2IskQVosKkOsap6nQq9klnQW9S3SD7lnZD5psBiQNAiAwAb%2BSE796bPb0RzqmSaqweYpzNEmuljuaH9vXlu3yiyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMk53pBGoCHiqTG0ouKtwDupdLUd5YluRz2X7alJi0RJE6ArijrGJYBn3xwuWaFPqacA9LaSutMRtZjipGeAO93c0JWOSbwU70zr6Yf8iD2zNCURfJGTRZUf1n3xUMDf9DGeOStk05u%2FKQot4v%2Bnbut4KrOSWlcZ0vP8g9IKaGKo%2FFZmkpOtuq1hEETfaUaD0WN8ICO0phwa1cg%2F9myBcnqDjfRH4BBOhSCSn%2BdTTQJUYfj3mNBj1KnGcY1IrLUmN1dUDyvqIVZ%2Bt2WGwZOBktfnfzDRhBih9ctsLv7K8FSKwum8kUoDi9ygx%2BZNoXAWE7UbbHrtpftAzvMmN3RZu0HBTZ%2F%2FoqOHF0YuZzc%2FD9jUfgJ0WiL6lsuA2gFQFlMngwQ86E8htJw7Tg1QjhY22%2FA9N7DVc2UXwnh4kc9nGaA2Nqag9qYpmysuLep18slFvSkBJU%2B4Thqt9Hwng%2FBKIGY3nEkbt41lxolN%2BMbAVTYEFdVtr%2BbK3VXIa5OhWogP1d2LxRszC1p8ze8QZnD9oPmgFRS5Avz0MxthalHz7vzUN%2Bpn1ylDCerj7Bgky607xLE5mHXOz8HnqbL6cvuELKcktKQVOCPmh7EH%2B4RyX0ChyPhqW9ShIYy%2BKzrycOX00foPsD3eoUWPAUilYwz5PMzAY6pgHRQG%2Fi4VptBlqUwT5uA9rBzUKdKYjC8MPLMWe6cfD%2FnqsA2oIKUrHBzrDgGeszAemegIpd5eqgDEoFoW0HMnQTYTBFb2EuHNo9qI5t7HdIzfpP8bHWBeMnGG5C%2BasYKes8RFIjYTqnfNnaCACaGNVFn1ep18wDxOt1rPPztUig0p5%2BW6JCtxA8VG8URvFCYVopeD2GoGSsXXA3uv2qnWyXJj%2FivncB&X-Amz-Signature=a753b97427c0c5d74de37eabc653c0505a1432b463bb9de74c175959c524a110&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIFOPBE6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIBH2IskQVosKkOsap6nQq9klnQW9S3SD7lnZD5psBiQNAiAwAb%2BSE796bPb0RzqmSaqweYpzNEmuljuaH9vXlu3yiyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMk53pBGoCHiqTG0ouKtwDupdLUd5YluRz2X7alJi0RJE6ArijrGJYBn3xwuWaFPqacA9LaSutMRtZjipGeAO93c0JWOSbwU70zr6Yf8iD2zNCURfJGTRZUf1n3xUMDf9DGeOStk05u%2FKQot4v%2Bnbut4KrOSWlcZ0vP8g9IKaGKo%2FFZmkpOtuq1hEETfaUaD0WN8ICO0phwa1cg%2F9myBcnqDjfRH4BBOhSCSn%2BdTTQJUYfj3mNBj1KnGcY1IrLUmN1dUDyvqIVZ%2Bt2WGwZOBktfnfzDRhBih9ctsLv7K8FSKwum8kUoDi9ygx%2BZNoXAWE7UbbHrtpftAzvMmN3RZu0HBTZ%2F%2FoqOHF0YuZzc%2FD9jUfgJ0WiL6lsuA2gFQFlMngwQ86E8htJw7Tg1QjhY22%2FA9N7DVc2UXwnh4kc9nGaA2Nqag9qYpmysuLep18slFvSkBJU%2B4Thqt9Hwng%2FBKIGY3nEkbt41lxolN%2BMbAVTYEFdVtr%2BbK3VXIa5OhWogP1d2LxRszC1p8ze8QZnD9oPmgFRS5Avz0MxthalHz7vzUN%2Bpn1ylDCerj7Bgky607xLE5mHXOz8HnqbL6cvuELKcktKQVOCPmh7EH%2B4RyX0ChyPhqW9ShIYy%2BKzrycOX00foPsD3eoUWPAUilYwz5PMzAY6pgHRQG%2Fi4VptBlqUwT5uA9rBzUKdKYjC8MPLMWe6cfD%2FnqsA2oIKUrHBzrDgGeszAemegIpd5eqgDEoFoW0HMnQTYTBFb2EuHNo9qI5t7HdIzfpP8bHWBeMnGG5C%2BasYKes8RFIjYTqnfNnaCACaGNVFn1ep18wDxOt1rPPztUig0p5%2BW6JCtxA8VG8URvFCYVopeD2GoGSsXXA3uv2qnWyXJj%2FivncB&X-Amz-Signature=1928b9d1e660d3a7f2eb3e95f051e7aad91820277668137b152a08f466816e7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7ZVLCH7%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T122959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIBOjs3Cy5pBFvfy7I4Kr8C68PdILVpU%2F4oW32OzYvxptAiEAs%2FsxyGwp0VB8KvjIDv6dfyOdnh8wENYYib5A9HPPSOQq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDLSRyqIc03wx8%2FdqLCrcA5HI9c8CjOT0FZTM98eyukAov66cZ%2BCcmABXAuUk9hiel1olJxmMIeJVEMlNBz11zw2QTqW%2FTVWXLpNiTXfBZ4nRa%2FE0vLMYPC%2FCnKGBYXhm5HvMSwRlGzKkwWhAp1kDjhokGOxgWTli2dhn%2FGsX9ine3jK7SoSONtWXDDm%2BuxcWaeoMHYlDY%2B6ZpdLazK6CIeztnuK6NMPTqwj9KdWWUQr%2B2ssFJhkfzGFu8OqkR0zp8WhVoA%2BDI5qQwiJ4fMOX%2FL8AONB9cFS%2BQ3i0CVY8M4NQUtK2c3Em9kWYN%2FFRXrW156TGLBE8hj9veHtIAa5vNHheyCq%2FmFyX7m1bqE%2FHZUNxMQumPzZ%2Bno1miyHDYjEBTzKTgo%2BsXTzaRReYeR2HJjI26bRErAXI1CwiMXMS2zm1W%2BL57snwkHc8r86pm6jDIwWopnMIVjgiv4q5UmVUL%2FWOSMOOoX6hIAPbhCSS1RlTdGjrV8%2FOvW2iRnD6jjfp7lENYP5jLjerpv1T0HfL12YZFHfNk1zcHFsk58aES%2BLWseQU92b3NGk7jjnjo7%2BoqdEN6yN%2F9rYiknonKAu6FnQDPS%2BfCP%2Bd4vdiEK87wpsYtF2KMm5Trk7f3bl8uL5zwE64wM1OKLrDjrwAMKuUzMwGOqUBkFzUR1xppCWLtGavfMVUcwkBCDPBDHpIVQgA4FjDVrUq%2BlkEzl4RFUJssN0y7c6wjYXB3i%2FlIZhpEl09Ft6%2Be6QW8PsTCJ%2FKNfxUKkCCdab4ke6d0IuqSExfiPBCJXSxXudIY4iN5htQp1orMI52qFY4F9s436XpkkIJbJPL50U0xQpIqXhfm56Q7gk7JFsq48GxRvmHguKoTGZ5129vFMTV4T%2FY&X-Amz-Signature=46123e1618df3ce10dda49b1e252295ef71ea0406c81f0f73b8ef464881759e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YP6O45C%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDcq989Vp0L%2Fz%2B6Utajw0J0bw3y%2BsUCfkiUq3Y2FQxWjAiATRkkMeAuF7b3z8K4R4w6w1Jso8FPjPlumIduRTH3M7ir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMmx6JVxDRl0KwAzX7KtwDvOaUOoIo%2BGCpmi6wk3AxTIEHudq6n5Wz7vTntAggGyYD%2FwQojnb5VNNicRXdYfPHkU%2FGZ9N%2FV%2B20MS4%2F9107iBhfb2Wya%2Fi%2F%2B1qw7xYt9UCjeEPPTEGL%2B4kV0TKeV%2F9%2Fp0kYv%2FEjhXsiFAFt3LVBTqoYL2olnE6asdeNzGgh4gCAIooEcOtgHVNlTFNBIIaoOv%2BKm9tx3IDfhDuw8jWECHxFEykUJ167rP4WzBBuRfDt1%2FdFV7X6NnwofpLEW7jQf2JRr%2BonuJ9Q9rZzjNw%2BDNGV959e%2Boh7gldpSQzu9AAne2pbqU%2FT5jyOTkcNiP29SDihuOkiDuCupgbA9JHJd13umbuBU9dxmZTZlWTfVFSNrFxpmNNqWsMHCMrwiwwgU%2BPgRYVM%2FrN%2Fr%2F9ADdw7pEfXjEYqQxtbqTB1eIDZEmE9LvMd7T6gh5hwqUV3ybTrLT1zKe1P%2BuzlKY5oMqnENFKenb2jY%2BzmA4dojU4U3%2B52EsafesMXYIrCZZlJmCtoayx%2BfiLByXfPgTuu%2BaiKwJuStmF7r1e%2BE6RHFvzTTWaXSkCvXQAhIWWsY9gHKaKlo3lM7Yc86HFWz334jpvy7HQWdmZ1tWUJWUJvR50F1RzzKC4lxk3gW6bX0gEwu5PMzAY6pgEzZxi6CUDEJDsJmQpJX54UZVsH7AZ0LB1Wv4G4oCs27S4chSoz4OzLdAryvT4TLI3kwBPsGuK5fLl2HAqd4fMfHuFZmWP5XrLww3qctDKdPeZbemHItkaKWmZ2rJ1KwxUGPUlpGtgxE30%2F8b31nyDwXeKmSYwdX9E563Er1ZlpXcFgmYd5QiJbbB3lTlkCP%2Ft%2FZAFvWM7NYpt%2BZUkV7p7waQkuLXTa&X-Amz-Signature=b3c63123596124c310b438939348fb2b7f0f889542a9ce6944444621f15f3b85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YP6O45C%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDcq989Vp0L%2Fz%2B6Utajw0J0bw3y%2BsUCfkiUq3Y2FQxWjAiATRkkMeAuF7b3z8K4R4w6w1Jso8FPjPlumIduRTH3M7ir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMmx6JVxDRl0KwAzX7KtwDvOaUOoIo%2BGCpmi6wk3AxTIEHudq6n5Wz7vTntAggGyYD%2FwQojnb5VNNicRXdYfPHkU%2FGZ9N%2FV%2B20MS4%2F9107iBhfb2Wya%2Fi%2F%2B1qw7xYt9UCjeEPPTEGL%2B4kV0TKeV%2F9%2Fp0kYv%2FEjhXsiFAFt3LVBTqoYL2olnE6asdeNzGgh4gCAIooEcOtgHVNlTFNBIIaoOv%2BKm9tx3IDfhDuw8jWECHxFEykUJ167rP4WzBBuRfDt1%2FdFV7X6NnwofpLEW7jQf2JRr%2BonuJ9Q9rZzjNw%2BDNGV959e%2Boh7gldpSQzu9AAne2pbqU%2FT5jyOTkcNiP29SDihuOkiDuCupgbA9JHJd13umbuBU9dxmZTZlWTfVFSNrFxpmNNqWsMHCMrwiwwgU%2BPgRYVM%2FrN%2Fr%2F9ADdw7pEfXjEYqQxtbqTB1eIDZEmE9LvMd7T6gh5hwqUV3ybTrLT1zKe1P%2BuzlKY5oMqnENFKenb2jY%2BzmA4dojU4U3%2B52EsafesMXYIrCZZlJmCtoayx%2BfiLByXfPgTuu%2BaiKwJuStmF7r1e%2BE6RHFvzTTWaXSkCvXQAhIWWsY9gHKaKlo3lM7Yc86HFWz334jpvy7HQWdmZ1tWUJWUJvR50F1RzzKC4lxk3gW6bX0gEwu5PMzAY6pgEzZxi6CUDEJDsJmQpJX54UZVsH7AZ0LB1Wv4G4oCs27S4chSoz4OzLdAryvT4TLI3kwBPsGuK5fLl2HAqd4fMfHuFZmWP5XrLww3qctDKdPeZbemHItkaKWmZ2rJ1KwxUGPUlpGtgxE30%2F8b31nyDwXeKmSYwdX9E563Er1ZlpXcFgmYd5QiJbbB3lTlkCP%2Ft%2FZAFvWM7NYpt%2BZUkV7p7waQkuLXTa&X-Amz-Signature=b3c63123596124c310b438939348fb2b7f0f889542a9ce6944444621f15f3b85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FCKPFYX%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T123017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDWUq6bZY%2FqgS84mJbm2c59jdiWEifuz9ZV8dlSx7vPfgIhAM%2Bk1DZUHVyV22iQygHUPCcC%2FAkc%2FJyOj2svScbc5axwKv8DCDUQABoMNjM3NDIzMTgzODA1IgzBaC7j4BrmHRjAFTYq3AMPIhjlLxf5%2F3t8gsvKE9bJHmo%2FcCyAoecj0fqtLhQP6Zl32pYpyZZ0YbB2UvvSFWMKXRSe0xgacS%2BC8ETeQSh2MgyZ54Y5rJEgFxljAvy6SiuSIEThjnzBoq7oRQBoL6KXKGKndPZsIYqOlKgf62Gw1142OYSZspOA0Btvx3Nmzkj6CNuXyuZ54lHitBKnOXLbCGdFRs8WzLEgELiypPX1Qnnqxq8xyfWHyJqjVUJt24eCdFglTd%2Fo9k5SnjrbCjsWC246YJfDpIpB2r49YhsEqxGebiEA6spl9qxLuCB0fU%2Bhmif7NEYAZDRrK72xRMfhAEMJEps0dsv3g5wSP3GfaWm5xFwnvFzk2JPn3ef2zoV%2F1BXiyCKq2KxqBanT0kghf7GQRRcIJwhCc1x8yHH8wNlr8fuGoKbYamU3%2F1VpUCaqNbFcTMXb1WU9htQQF8QE62I6QEMcNfFSCXc2snIPzT60Hr2wFlonueYJgmB%2BrVMcdb038UYINBT9ECn%2FoLf%2BHBpvfAjI0i%2FMIZeox4V8WIxAZ1NyNiRsupkxbnCcW9bTifMId%2ByJZKBlygFBk4zfFHyYd6lUBQ%2BgDF10zSbAOj57LAmkUoCUKIbjTxQrwpwfsPFcGgnHn%2Fq%2F9zCKk8zMBjqkAZRPakAB3AseHyJaQii%2Bv5mAlKAGZbcM8f1BZtotuGI1NLdhlBj9m371bVuTg8wOXAQQnajyUGha4ViJBoXxDtxZiXAa%2B5BnCjPvkLy5CsPXzf88K1MO7GtJRanNgYw59lubQXwesCS%2Bw05BWi10XSdV8n3j9OqMGkD%2BPoIvjoLDFoEwvKkoAWp9ZHfyWKKmkrofQtZXd5YFWUGGWZDI3MPJbFWY&X-Amz-Signature=19733b07fb9e06be8ec655ff0959f30eceb3df59c7c059f46e13fe07ca9afe03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

