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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TMGIROU%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCICantO%2FG1m9QbwoU64zLjWmDzoLG52lo%2BORKjt6rbA%2BnAiAq9n7cFf9DNyPDNnZRyjiTy0t%2FrdM2Wh19BxxXogss%2BSr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMng0skWuxUuLUTigvKtwDVhDCJ0uNStH6Z4CYvs26Pzy%2FES5MrIBnQ2KpQRckv4HspG4JEqxytsWIXjZmA%2BF25rbi%2FkWBNGm9enMNmb00h57pDdaDaWxRQk3GZIHhQz9689jRbrinB5XwTViOC813eRhslZZVagN2OCONFB4XrAJTfeViQphrXSyzAz2X8vjjL7qEFehno5r7vskrdoMk3EO7Jd3kjlfvrYrhHcYrvLEF6YLRfcvU8IRlICfn3Dv5h5MHeS%2FakhEP03jZZFAu2E2MDjtZHUf4dFQZHmaRjcFM4Kkui%2FhI5FYBeebEMlDFuCJAfpSnsx%2Fs6X0Q%2FuOdSwnERpPO6svwnFMVFGOxr1wFsd3ZT%2FUWaq3SLzmT3%2BjsSJRBkIhj0ORhufULi1fcxba1vn261qAIEE1XSYEDH%2BvaLYkPjL4fXAgfMwbpcEQtxhMuUNWT0pqeSwvKZ%2F2KXOmDuIPIHaT3ekBVz5QMHTlH6VgpuqJU2Kd3scsX1Y%2Fiy7sA4SfOG8trpaU%2BdBjlKlLtqz7pEmvKXhf63ksj1Cl7Yy%2FRoeNG8kbpbAiuLYGEjtiVIPS52G1VDlD4VKWVdGTDd2SY%2FbtCzLaXKN%2F%2BnMnO83a1lfgoDY38TZpGQEgaZUBmsK0EE9fTQg0wweiCzQY6pgHEcBPm9vl1CaYNtuq1vwndnlSfOUwMPc6jhCQ520VbkyfeJnMUxjVMnwH1tEoU5TTdSiKHjqj%2BshvSUKa5rhXsThgVcjK86nLuRy0EAbN6amYKsvH8N%2B43VSOHKm%2BXlqjcuyuXM5%2F%2B3AtetoDyrREXB6npxttXXSzqdtp36sB2jfkkwxdaatPdlJY%2F73pADBGQ7wmfH8j%2FdqNGai0j7DEj4pdSee3r&X-Amz-Signature=4a26f1051430102b04a8f8f00ba951661832c288dfe7495c3ea7ec6f4dc2b00f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TMGIROU%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCICantO%2FG1m9QbwoU64zLjWmDzoLG52lo%2BORKjt6rbA%2BnAiAq9n7cFf9DNyPDNnZRyjiTy0t%2FrdM2Wh19BxxXogss%2BSr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMng0skWuxUuLUTigvKtwDVhDCJ0uNStH6Z4CYvs26Pzy%2FES5MrIBnQ2KpQRckv4HspG4JEqxytsWIXjZmA%2BF25rbi%2FkWBNGm9enMNmb00h57pDdaDaWxRQk3GZIHhQz9689jRbrinB5XwTViOC813eRhslZZVagN2OCONFB4XrAJTfeViQphrXSyzAz2X8vjjL7qEFehno5r7vskrdoMk3EO7Jd3kjlfvrYrhHcYrvLEF6YLRfcvU8IRlICfn3Dv5h5MHeS%2FakhEP03jZZFAu2E2MDjtZHUf4dFQZHmaRjcFM4Kkui%2FhI5FYBeebEMlDFuCJAfpSnsx%2Fs6X0Q%2FuOdSwnERpPO6svwnFMVFGOxr1wFsd3ZT%2FUWaq3SLzmT3%2BjsSJRBkIhj0ORhufULi1fcxba1vn261qAIEE1XSYEDH%2BvaLYkPjL4fXAgfMwbpcEQtxhMuUNWT0pqeSwvKZ%2F2KXOmDuIPIHaT3ekBVz5QMHTlH6VgpuqJU2Kd3scsX1Y%2Fiy7sA4SfOG8trpaU%2BdBjlKlLtqz7pEmvKXhf63ksj1Cl7Yy%2FRoeNG8kbpbAiuLYGEjtiVIPS52G1VDlD4VKWVdGTDd2SY%2FbtCzLaXKN%2F%2BnMnO83a1lfgoDY38TZpGQEgaZUBmsK0EE9fTQg0wweiCzQY6pgHEcBPm9vl1CaYNtuq1vwndnlSfOUwMPc6jhCQ520VbkyfeJnMUxjVMnwH1tEoU5TTdSiKHjqj%2BshvSUKa5rhXsThgVcjK86nLuRy0EAbN6amYKsvH8N%2B43VSOHKm%2BXlqjcuyuXM5%2F%2B3AtetoDyrREXB6npxttXXSzqdtp36sB2jfkkwxdaatPdlJY%2F73pADBGQ7wmfH8j%2FdqNGai0j7DEj4pdSee3r&X-Amz-Signature=4a26f1051430102b04a8f8f00ba951661832c288dfe7495c3ea7ec6f4dc2b00f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TJ2G2XN%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQDkUbvgxOuKAuDIZN8TL9dZM5P4c6FpOzH%2FWtP1Lgw6hwIhAOYTNMCgSiAW1j6Pn8utbVxOcCbleE4wUQRUQkusLnNpKv8DCC4QABoMNjM3NDIzMTgzODA1Igw1%2F92cSnBvi%2FJthHgq3AOZnTeTiuVd2NI67JtvOoxSSj0ZKmwxCY4YPd%2B%2FPTG1%2Bf2so1B8nUcx249edcFKuGzo4AUe7xHyHT6PeDHTD23%2BRmVvElM31%2BxyvQwDxM7Dk9mUEnm5H71kcOytyIVJZLrl7LTaHU%2FcC0lHBuEMZEwn8hDyHDzq%2Bpf3lN2FG63c2QtnUlubrPj593v5EloT0GXLRxnCQCvUaEqKBCiDCLZ%2BlCIsLrmxFXKOkZCiljQ7hh%2B9IN2CRC2CX8jZCYjGYmFO5a1vsLBO8I9jNQwDs0%2FafeYgBts3onZUU%2B6gtbJ580ov7nv9W8%2BRyD0jyKiDGdyl1QKew6Y%2Fn5V5OHzGc9wgXiR6eltUfNesbPXWbFpTZUZT6o5C3%2Fn6U3G2WW89yaQG2s79vUyYf0xOvxJ1dqSFwwffwPfTAuv6jv34wyVIc3WSrPJ0Q3nzo30ub9mOWETbAGSq8flWWyhNUiQ1R29axJ8TiPSJl%2FD7P2Lg75cz4XJM01dkz%2B3n4prMHL6dAe0N5zx7zr%2B0xMJMnMAaxJpXGWezaG2%2FossyR132w9BbJ1vEIbbXXiEmz6R00K3l291MTzsg7S%2BDzILd6Rf6K3G60lafXcJr%2BBVUF%2BF6iwng40UVkWT4C1v6SqEMOjDz6ILNBjqkAfH41BSDkaNbjjgHb2f9z9FYxo2gsiU0tktgkOCTXJMJC9a%2FPM%2B4x%2BtafHGQfC82zYvfdHpMhUZRTQuP4K47ER%2B7ExSfKeS2I0XjzH9QbiIpDnfMkIemXEMca70yLpPpvuswdSPX4%2FcaP%2FEZXXTq1wAYczUiJTvkE5yA78R3Bs84elEbKrkszDZehC4KK5%2BIMRlXSCqXlBXb8uMkI2q5UDO%2B0vDE&X-Amz-Signature=5f29fd06cc14d358c160e7cbb09007a037d32c512a7d06c535583ac252c7349a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXUS3DSN%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIBtbG77u%2F28eCEUY9Rux5Ns4f293nsgdDtemKqcaks5GAiA2SzAeQwgxkWETykQhWrvF3YnLZU%2BsO2VmZ2zdgkJHkyr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMlmsHv4TWP6hcFnAgKtwDJjW26ybB1Lu2qRS5ctXi9EjkTaOLrkeciRxfZ8SNhNln21vkyyEgt68W5T2c%2BWiD%2FYeYjreqSU%2B%2BdeMe72z0miwgV%2FhXHp%2FU4rLrJ9PivgBqyhJT9iuqvrI2lgxVMfta9qL0KsMkLZwpla5H47p8v3dbzx8Tv%2FSE21Z0sKk0LzB4%2FzVYasPh6NggGNH3ruiJ%2BEYNlw6pJMhcK1tY5LaGCilMUOu3HD2wZ2Qslw5JZCYsR1l2Bxy5PGC3KXPtfASl2Xrte7JqPZ26NY8s7KGwTTKU3nv0yYmj4Sg51tu9VEtY9WZULI%2BW4Kp%2BdTNG1fVhIJzzv1iHb4SH%2FEFryJtVjvQ%2BCn259778pzDuxMGFzhEq%2BQZ9QR%2BY%2FOiN8y7BH%2F%2BoswfKd25TjATPJHr%2FYhxdaI1ayTgsdbssDOkW85Z164kC0IR8Bz%2Bs4STNj18RcmAyr%2FCKKmBbZriG5b7kvJ2XIWOb0K6yhIa%2FvSZsSiOygfAK5tboCFr3gpeHx7aZXhyEWR4g0aqVRh51zlNypKdzuDoKUixSx64Y4sy%2FU9uRh8tEUyCaBAE33y4Cj49I%2B0KuG7BpmwH2ZGQa4e4K%2BQ%2FTBqmT4%2FOVS88ku8psJImrRQN4PvHet7%2FLMgl7NxYw2%2BiCzQY6pgGmKYr6yQ6hJcCjBQ0H4ufdzHl57sSITmsLSyj%2BfO3hiFndUCaj2GsJNTP2QKh2cQriScYme3YnFOf57ykdDQoWBsLJW%2FYfbHhgjSFrS2QblsOlGnihJnxFanNdpY6DxdKX%2F%2BzIuGw3AEAUtv5m%2FArrGw7tiivHVJVzd5%2BrSVG9oHnZraN8aPcnTNvOGA0XwFACPLbVEIKpKUlkYZK0hV7gt8WPh9ue&X-Amz-Signature=cca6cdde4a90ac99cc8c36c4bc0432f0068dfba3d784f0731586370bca9fa520&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXUS3DSN%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIBtbG77u%2F28eCEUY9Rux5Ns4f293nsgdDtemKqcaks5GAiA2SzAeQwgxkWETykQhWrvF3YnLZU%2BsO2VmZ2zdgkJHkyr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMlmsHv4TWP6hcFnAgKtwDJjW26ybB1Lu2qRS5ctXi9EjkTaOLrkeciRxfZ8SNhNln21vkyyEgt68W5T2c%2BWiD%2FYeYjreqSU%2B%2BdeMe72z0miwgV%2FhXHp%2FU4rLrJ9PivgBqyhJT9iuqvrI2lgxVMfta9qL0KsMkLZwpla5H47p8v3dbzx8Tv%2FSE21Z0sKk0LzB4%2FzVYasPh6NggGNH3ruiJ%2BEYNlw6pJMhcK1tY5LaGCilMUOu3HD2wZ2Qslw5JZCYsR1l2Bxy5PGC3KXPtfASl2Xrte7JqPZ26NY8s7KGwTTKU3nv0yYmj4Sg51tu9VEtY9WZULI%2BW4Kp%2BdTNG1fVhIJzzv1iHb4SH%2FEFryJtVjvQ%2BCn259778pzDuxMGFzhEq%2BQZ9QR%2BY%2FOiN8y7BH%2F%2BoswfKd25TjATPJHr%2FYhxdaI1ayTgsdbssDOkW85Z164kC0IR8Bz%2Bs4STNj18RcmAyr%2FCKKmBbZriG5b7kvJ2XIWOb0K6yhIa%2FvSZsSiOygfAK5tboCFr3gpeHx7aZXhyEWR4g0aqVRh51zlNypKdzuDoKUixSx64Y4sy%2FU9uRh8tEUyCaBAE33y4Cj49I%2B0KuG7BpmwH2ZGQa4e4K%2BQ%2FTBqmT4%2FOVS88ku8psJImrRQN4PvHet7%2FLMgl7NxYw2%2BiCzQY6pgGmKYr6yQ6hJcCjBQ0H4ufdzHl57sSITmsLSyj%2BfO3hiFndUCaj2GsJNTP2QKh2cQriScYme3YnFOf57ykdDQoWBsLJW%2FYfbHhgjSFrS2QblsOlGnihJnxFanNdpY6DxdKX%2F%2BzIuGw3AEAUtv5m%2FArrGw7tiivHVJVzd5%2BrSVG9oHnZraN8aPcnTNvOGA0XwFACPLbVEIKpKUlkYZK0hV7gt8WPh9ue&X-Amz-Signature=c5ed97cabc52fd8d4d9c359a9a5d7fe3c177ddb669305b44140015258b0bc3ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSVDPPKE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIBjT3bNsCSdgDMrrrdRMZnzz7WVScgss6ORQ8A1jFs%2FxAiAdTodmBz%2Frc6fPmgyjOI7nS8vLahoj8FGiEyQUowYXfSr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMT3WtIQaxrQxyCZ2uKtwD7sAl8rvgLy%2F61iPS3AfP9BuHpGtNsFtasYp4G922zIip83r2JKSd6SPyTnMPE4MWQsaXPMOIAxCpVJVengUf9FehlChJIP3MMjloV5R8MLqDEa5Ln3%2BJERDr%2FwrvjrfkxrBpOVFELUIYHfdtnvoo0O7YGvH5%2BzxZUDUyMJTh%2BPfN1RzwBjfiwlLTsKIRjLKfA4wnzX8sqFeK5Jk%2BUEnv2Ew2UecyQ7tIEu%2FGdUbmQMleccCVpibwJ%2FnvfjIE9V2IgyE2bRmJNs5e7qxES1Oafpuz%2FFsQtkI71wYJ7xPeI2XUN0sDBqf4tN8MetW6wygc6bnClUiFxwv0hHLWYAH%2FZf8c%2FWKtWCdcgBLHXfbZzXb5SaXrzSgKa5DS8TJfMESMiqJI52Xm%2FTwbKNEiUtH1YI6ojdlrLoHrsxq1wdpMUnLSfHkXpsP6WywLZMsrxreds68yTwH1oA9pK7zAjyIJKSfDBwvwZUgb88pqN%2Bs0dbt3exfcnCe9B6gY7PljFO0enJTo36DGqlDyuUVHoVUUxkbvcAtjezcL0TTJYSA1EBKd%2FI%2BWWv7g7EYhFrrI7nh5d7LifdyYWwF3szbJp%2B1VcJIKXR6r6Fem0woaSKlX5Rft9lHuYDi3mTktEB8w9eiCzQY6pgFbAjuE4g7pQnBLtt5WVv0vqhK2qjYY1kQ6ER8Ge3sCQNFie4tblKzS%2FNS97HQXlwR0NRyvro5yGmslUXi98eG%2Fj45lHGedCe54DApbP9Wu2rP88CjApeQIdHZjltXp3mmApVrwvgM2J5qZtdJPUcRlOTv%2BUZ6mU3ji6H%2Bbzc0rdLCbdjIDXoru4s8UopB30d2td1%2Bko1UU3SeL99cfA81s1Aof98ZU&X-Amz-Signature=05d223d335da47f0a87d587262d3b9f8f1e42d2894526a63dda2e8768c9e9800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4S64LYE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCICm4wEhVOaanlS6nC3L86E2r15VqHW5KVXibxiAHngP6AiEAxU%2FhbzDJuJ6uRHbTcDzD2SduM33hPWcg1vV23HWKYo8q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDCIjdAzIKMMPUjBpyircA%2FxMY2SOpaeKibqY8xG43c5suweF3w9qXkw6Jl7%2FC6ppK%2F81gAipRum4MKGcogpl%2FdwLYDjwAjRwUnWJh9sCoCiMWUn1w2%2BSviGnlwtuxxLZqIwH%2BuhRuWLgzrqAkDiVH9cdS%2B8JR0qOx3sx6lVZRMGsRfsq4XK1sxywXPiLNWGlgVfVa%2F%2B7ga8BAkQfqR9vtXYyEGmMvY%2F9djVKChX%2BLhPVH1yxONIW0b3xvm8Dw8iHda49ELsx%2FlrCvHNs2bhlynP3N%2Fi0WEP90xXY3ooMxRJs3SWgUIXJMGT06pQtJCpWf0c%2BtXUNdtctRWNO81W5dgbKIPQyiDWLshGTi5gRriWWJmDYBAE0d%2F6SV0eiq4T0VoQFTv1GgDXP7mOVDzNWyiHNUDfuT1CUp2I7o%2FkaD%2FFifcKwqhIbtzTt0IEyxbBxE%2BSZpaSnk4bKUARIlaae0YouUwWLEsazZhetVre%2Bf9yr2joA9Xpbk8Pdx2N5X%2BTRHSCJSy50TnxU%2BcS4gAfqxfHdKuFjgv%2F3nBoD7sD%2FsbwiuL0S5JCRyJMhzu%2BnaubYlXB560kkDkeTY4%2FjRqvg0eR%2BKQsjDmbwbXsjiDkFRy5XDss7G4%2B4q5REjCQ0gS1Ig8EkoGZmf4o4b2kDMI%2Fpgs0GOqUBpxtOTCs%2FSvJLTejOeZRcJ1E7K34FWWM07qR7vZuwmISu10hQAOJpQalqJhyWVJcd8UnFMXoIzUAQQUNa4YbA5nyNUoLftHxIQwp5x1ebFSqm75D57E75L8uQ4jTbElwk8QIbYOeX7SndxrLRq4r%2BTBpEixB1RIaZucRwYPmxaLiPPiDfHSt%2FcVRWMfpSHCAyMM6S9Eya0mpPD9IqPT83S7XSWGgg&X-Amz-Signature=37413867dc31478bb979806a06d0f01e9bf71a3d7db0a9a64b6bb01927b4448a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIXL7HHV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQC%2FIAapTmbi3qkMmHimnWCL3Ufnra2o%2BBGnRMXzGrVnvAIhAOpkluxicfbLFhlMgSn6%2Bwv398vO3Wpx9gGdB2SWJAWdKv8DCC4QABoMNjM3NDIzMTgzODA1IgwEryTIFIdRWQBSZPIq3APEp3otUlcC%2BVn0ZGuklkeTSxzUD0W3q8risyLuzo2k6n3OQxVTahY5Ip4%2BnDQMV807qCwexOeD6aCn%2BCVuoUaH4J0A820PPc1JJg9eUw3iRt%2FAmmmAsGaFsfCkvFVRF1lx5wtqteeViOHPXAB33nNe457oxsUqoZpBUmWdcZjswUx73gtIbkUb0sTDx8B7LsHoi8hAE4BfP%2FzcAwCzD9H5hRFpwAYKrq5yY8r1pASNPPXOUzP825it2%2Fx4qnVmkg73BY3mvrOV4P5xTmqwpfHaAs2BHZagbfxkJhcgM%2FHQYHuAZuKBdkHMAn6Zc5WBndWHko61c32bhPkm4NH2lV4dSssVBjvTEJ7cyvLpq3UPuv8Gn%2Ffj4dVqi892vEzKy93iU8atAh8fIB8jOOJDGtOf123z9XZms75%2BCGApDJ91C8qWRnuuxVzJmdiYEHqXYe9abZvRe%2FpF0AdMhzjdcZRoFcoZJjaHjAhHjyhgz1U3XL0gQARylqzgZ%2FJOCJEQR1FyiAR9GqLEURRvKdFJPGjsx6hVgJE7mifsbHZKdBjQtj4mLXY8ncQoqo5gHAXQmc4VfTfCv2Hp6fS%2FRu991XsRhDnU%2B8IVm9DlOAG7GDcP1%2F6uCrizqxP5few6rjCN6YLNBjqkAYWz72hNqJiEUaA0rdVNyS1zeHJm7weJ1sHPuKyjDpMlqsB%2FtaKaXaWtZdv7C2CctIn85jU%2FJF3dDE9j5C1MxGmyJJ9QqGKRlkQ5NqKB3A8pfDTmgt%2F3XtAPoZx9LEsry6qwqgCogINm7kLdQkCEvg6frQS1hHJVIQViDIEAuAD%2FDteqpmQufvRIbeWbr8THRBxUfboIoqMBifhpZi8qGiWCJqA9&X-Amz-Signature=79c9de1032bcbbff3198f33f2980cedf383ce37060406bcdb474fc305aa862fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDYBBCFW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIGvqVi9Kyd6JB4s%2FB5zztZUCYkZdHxeILjzcdQ6%2BU4zrAiBv1lCAcTRIwCHyVywl%2F3GkpbzEaC2Bsq%2B1bHrCVlc%2F8ir%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMTXPAygr6A9sKDMtUKtwDPl7f6Luoqtqg38mYZn3AR2h2t0cXH05%2B7x3SxHIBvqDWD7SHdTD%2FP4WVU%2FKFd79wB5DPMeC4csM%2Bp4UDyaC4Unc4dk7RPonCLwACspT%2BxxDpqdawRtjnEY70LjMVVRuy%2BJ3ZHJjOSut1%2Fie5skSyM0CynJHmdIwTUb2U%2Fkix40B8aNyypZqkETb%2FMrAU%2Bq3MH1E6YsgwF%2BA%2FTnT0JMWCmqaNJyLwuq84ONNiFGGmrw6nBZI%2FbzvmCVDGQMmRdgODKqkPMliEMagSds1I%2FCmPKSlimB3d1leMhqj6vxjSqE%2FAG2v2Vjf35fChOJGmHOUsZhD4FrABp1U8qFoii%2BibUTnGy3H%2FreRzEg1qwnr%2BeGvHl4XqsPJ9JxB28vRxUhtoLsXOLPBZLJsrKUvwzY4V07QMBmvAx0du5RSmYwuibMOGu%2FtaPchP9IPXI0T7bED7L%2FPcGSHllV2AJmRw%2Bz%2FNHW0fjyP1tvX2BZ5HhSRPG7eIL%2FuZAc2T6NoMy8FVUdVWc2WeaWnkU2M%2F4pztRbgRaCb13XpL3nFhyYvW9K8kbvCy697oAalGDLpwfcv4ORvamHDcejl8OTfPyC4TVkQ79m3%2BxD14i6tORqESxxIVRYZfnTRoulA3Yw6ObD0wseiCzQY6pgFy7B5W9Lt5uAvHiQUi2aC%2FcX3jJCjHKhSeUIqLNZvxgzbNe20icRbSU5I0tb3ClPnKDs%2FIeyre9rbbTN%2FFTmXnYhM5yPsKCGH43o%2BAuQRrV2qCOBeo3gfJr3uwDkcZAbY4BDYh3QBuijbdEKAwGJcDMA0ahyvEe7wbviVUnKPgrvSr6wahiuckysExsLHKBdnFk2pgI3GxdREcWEvcumdS1pM3moEm&X-Amz-Signature=0919a5ba79793c080938ad414432f6addd7abde653156a0f2462ec19fc901c6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDYBBCFW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIGvqVi9Kyd6JB4s%2FB5zztZUCYkZdHxeILjzcdQ6%2BU4zrAiBv1lCAcTRIwCHyVywl%2F3GkpbzEaC2Bsq%2B1bHrCVlc%2F8ir%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMTXPAygr6A9sKDMtUKtwDPl7f6Luoqtqg38mYZn3AR2h2t0cXH05%2B7x3SxHIBvqDWD7SHdTD%2FP4WVU%2FKFd79wB5DPMeC4csM%2Bp4UDyaC4Unc4dk7RPonCLwACspT%2BxxDpqdawRtjnEY70LjMVVRuy%2BJ3ZHJjOSut1%2Fie5skSyM0CynJHmdIwTUb2U%2Fkix40B8aNyypZqkETb%2FMrAU%2Bq3MH1E6YsgwF%2BA%2FTnT0JMWCmqaNJyLwuq84ONNiFGGmrw6nBZI%2FbzvmCVDGQMmRdgODKqkPMliEMagSds1I%2FCmPKSlimB3d1leMhqj6vxjSqE%2FAG2v2Vjf35fChOJGmHOUsZhD4FrABp1U8qFoii%2BibUTnGy3H%2FreRzEg1qwnr%2BeGvHl4XqsPJ9JxB28vRxUhtoLsXOLPBZLJsrKUvwzY4V07QMBmvAx0du5RSmYwuibMOGu%2FtaPchP9IPXI0T7bED7L%2FPcGSHllV2AJmRw%2Bz%2FNHW0fjyP1tvX2BZ5HhSRPG7eIL%2FuZAc2T6NoMy8FVUdVWc2WeaWnkU2M%2F4pztRbgRaCb13XpL3nFhyYvW9K8kbvCy697oAalGDLpwfcv4ORvamHDcejl8OTfPyC4TVkQ79m3%2BxD14i6tORqESxxIVRYZfnTRoulA3Yw6ObD0wseiCzQY6pgFy7B5W9Lt5uAvHiQUi2aC%2FcX3jJCjHKhSeUIqLNZvxgzbNe20icRbSU5I0tb3ClPnKDs%2FIeyre9rbbTN%2FFTmXnYhM5yPsKCGH43o%2BAuQRrV2qCOBeo3gfJr3uwDkcZAbY4BDYh3QBuijbdEKAwGJcDMA0ahyvEe7wbviVUnKPgrvSr6wahiuckysExsLHKBdnFk2pgI3GxdREcWEvcumdS1pM3moEm&X-Amz-Signature=d4422c32d2d2c5219d2977f7b94f58514878b2bbfff4aafd132c9dbac51e02d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSJGV3NQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIEPL0sEaLhn0DwjmztjJXfpt%2FIuPo%2FB2Ov1wSILVAzDiAiEAxF8EMOew4mJb8m8S%2BISUHJ1MPyOXTmgsJaZWWFzYF%2FAq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDKIheOIpKTcxkKlgmircAwEOpM6%2FxU2F3WgEnawzeaB66NBcM5ZoULJvRIGCq1pGhmxAVBSn9%2BvfEb2aD%2B%2B466u6GqQH1%2BWkqislUDA6%2F1rQgxlIwxvB5xtyn%2B8OpNgjbuR84WGPY3FRHl%2F78GEn%2BtcP57ciVtk%2FUE5cw9JzeJGztsWZxF29J3n%2Fg346OVyrceurMRCFGvSKYmWXiD2vjFK0mthswbjPoNCgYeD7T4X4ElV3A20gg9U%2BCSMRLRqVH0i0%2BM7gSi364s2kRxT3ue7qQrjgNNkfep6Y%2FjGAFmr%2BsKl6VG11jUc4SpGOJV4OZx66uTKXi23x2%2BnkZGytPhnFpyInNQf8GoKx01D2wcd8TpZZ6UVzfnGZuURvLQGiLoi1DFZuU9ImzQ%2BhhKTpftsjz8HMo04LJEGvYeq6kcoz5L%2FzjSmxhFCFO8BWAQOxnFQZ7rrDIfQ5%2F2Lw4Lg9fwehkx1DYJO8pGp3OOvtkWK8YceNElmuyQAttlxyUhnseKprgN%2FW0DlmIul0A8T663PCX4pNuhqd5kO5QxM2QA3cFilbg%2BrZU1nSdqr1U80Lp2v%2BRKCg6fVCgkwynAG0%2BkFoSsl7Nh%2BdAFuBKaPujHESauaYHm7z8pgz7bh2pIuMVwlg4gs3K5vXD6vtMOHpgs0GOqUBrP%2FbO8hFz0czTkRun2PXijR5sl5GK1Hf8%2B3Jx1ltr0zUM1skCCK2O2tYU7SHVU1AEXSVGo15Bsn2ENlphkv6fRfEorXPQoIOLNFKW0KUZ1XE6lYG6MRZGC4em0hk0VPhOGGeFTkAxAdZKUWWj%2BSSKLeac1HTuQwFht0VKyClMPndzh4lLmT3Zik%2FjTawUy6gg5Xs4MkNqBRPkBhGkyKdCX%2FfvZGy&X-Amz-Signature=08e9e4b05a0918a240595c3610a5da699312b04f8effd6e1e9302181443d0534&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662C5QBHVD%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCv7jQNn8xmiE9iEhJlO6U08EDzMTFxSUrZHvL72%2BWg%2BgIganQlWA3qyxGFlYmMHtZV0efORGKPuKgcv4WDWILOcf8q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDD45c0ykuwRuB5xkgircA75MHEpynGlZ2S45pY0zOa%2FJBFdd%2BfRBEacyHgzjTw%2F4bwoTmM9w88I%2FMGrNTS8XLorOFMWWfAOba81iWcQicqpO4tRxw%2B9%2BGFEQBHdcgGnhJXIrmWGdMWk6DFdNxQujiMAD7uPbxeb8mohtyqWgCZzInUtu%2FQu38zi9ZweeiU1Bn4ABd9Fb13SmtdNcIoPDG8CA8BahY9HnIII5wZebI4AKgjYpojxFNAQa4pVbZ%2BMUSOi7GQ%2FI%2BHIQT8z%2FU39jOtCRtcEAcNeaRVSYqI5h2BY83lZKe4nnJiowgeEHifWMxB8WaNnVI4T96ESuelziqQXzDmqjUTQ2ypOIx%2BHWzOIOhJDuTefjutrJXWx8gGiAa2P5Kgg%2FRY8OfKu7woBjkRGGRPDIfMqb%2F0bB31VUG90EkfRGY5nAyaU1fPYV%2BCIC5e2cnC%2B0aZBjKOkpFc3Vk1IQnTYkpidjgdZWJlHIEv3TCiDDhFJCtxS1P5zUqXPy2DApJUOwtTI9%2BNGh4%2BlujH7CeSnr7txOZgljc9VjmkZYOIXTliv6CbseB4nSgTwz8T8X%2F3bskBDLrt1m6V3E3cM7On7dDcCWzGFq5Sky5Yff3R2c0BVTNU56VI3M34RZtZ6k9MuTZewxBQRvMK7ogs0GOqUBV8G5Lb2KEMmGn7nKOjeJkmJDmc8Stx27nWlJxTbGkYce4Jpjv1okWJEML1krdFN926yyStNe02eNfle4ChRyDqc1uJWnAK8YV7ZSe2uJZOF6cB4qY2Hy4ZWDjHW7MfZCxn05NPMIQTci3%2FSVx29Qn2fo5Xou5%2Ff7I06iHPIWXnJ%2BSQ0QYBT4kJRMiCEOZX%2FeYoAH1qgC2Uv3StgTa5QuXT9IyY4k&X-Amz-Signature=f439de19695d61362e185700c9b700c8c3b8acf0e6c047ea11eab18ffcb5f146&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662C5QBHVD%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCv7jQNn8xmiE9iEhJlO6U08EDzMTFxSUrZHvL72%2BWg%2BgIganQlWA3qyxGFlYmMHtZV0efORGKPuKgcv4WDWILOcf8q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDD45c0ykuwRuB5xkgircA75MHEpynGlZ2S45pY0zOa%2FJBFdd%2BfRBEacyHgzjTw%2F4bwoTmM9w88I%2FMGrNTS8XLorOFMWWfAOba81iWcQicqpO4tRxw%2B9%2BGFEQBHdcgGnhJXIrmWGdMWk6DFdNxQujiMAD7uPbxeb8mohtyqWgCZzInUtu%2FQu38zi9ZweeiU1Bn4ABd9Fb13SmtdNcIoPDG8CA8BahY9HnIII5wZebI4AKgjYpojxFNAQa4pVbZ%2BMUSOi7GQ%2FI%2BHIQT8z%2FU39jOtCRtcEAcNeaRVSYqI5h2BY83lZKe4nnJiowgeEHifWMxB8WaNnVI4T96ESuelziqQXzDmqjUTQ2ypOIx%2BHWzOIOhJDuTefjutrJXWx8gGiAa2P5Kgg%2FRY8OfKu7woBjkRGGRPDIfMqb%2F0bB31VUG90EkfRGY5nAyaU1fPYV%2BCIC5e2cnC%2B0aZBjKOkpFc3Vk1IQnTYkpidjgdZWJlHIEv3TCiDDhFJCtxS1P5zUqXPy2DApJUOwtTI9%2BNGh4%2BlujH7CeSnr7txOZgljc9VjmkZYOIXTliv6CbseB4nSgTwz8T8X%2F3bskBDLrt1m6V3E3cM7On7dDcCWzGFq5Sky5Yff3R2c0BVTNU56VI3M34RZtZ6k9MuTZewxBQRvMK7ogs0GOqUBV8G5Lb2KEMmGn7nKOjeJkmJDmc8Stx27nWlJxTbGkYce4Jpjv1okWJEML1krdFN926yyStNe02eNfle4ChRyDqc1uJWnAK8YV7ZSe2uJZOF6cB4qY2Hy4ZWDjHW7MfZCxn05NPMIQTci3%2FSVx29Qn2fo5Xou5%2Ff7I06iHPIWXnJ%2BSQ0QYBT4kJRMiCEOZX%2FeYoAH1qgC2Uv3StgTa5QuXT9IyY4k&X-Amz-Signature=f439de19695d61362e185700c9b700c8c3b8acf0e6c047ea11eab18ffcb5f146&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEKYWFEG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T212213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQCW%2B9dI4fYEmBwTVUQL9ujaF%2BAjJqU7NZL6H%2BwGKf0NqgIhAIRcx%2FxK2IGdVjtCLFqhbVai0ymeHvT6hp%2FXJ9xrVe%2FDKv8DCC4QABoMNjM3NDIzMTgzODA1IgyBzvscOmb1joxEkJIq3AOKJH8t3o1XZVby%2BkJQoSVNOQaaeLLNusIWPPDsworIA4SHeBgsy0JiNCraeQj03C6%2F0tEqvZXBjpVDpZkmRyssecA1O4dtVtSifC60YsA6PUGg4iJpgSTRJSHPAeymLoTz8FkoXArTklsQedB%2BbP7Q6MvFZzEwVcdoZU%2Fzat55KzJVyNVY0gyfG4w6gSkFK9iN9SZ6ApH188E%2BUIR7BSPkgSBusnvOjalcz5pPj7J7yYN6tm8J1c0QEPA315DMuMzb19dv3Y28xCXNFtnNCbNGVEzh1y0ezV%2F3dz2T8G9TSiE7kjOv6SUyyLdkJfg0DZocPPimKTopvHBR3cajQFvXyfrEoaaroCMFD98SlcVYjyRnuxbrNTneMUHXWHfpeR8xXa5UXxujNJ9MLmI%2BmMTEXtCMm8hndn8gQIewEoMUBkVC3k%2FSdMSWQVffK27cT9G%2BzGn7NuX4F7wU0GaNhef%2F%2FP0xzaqJNcOkgm3t81WghvJlg2ov8S4xEAyOvtWeoY%2B%2Bjbkq3PTnY8iivdmaUHiGki1I43MFX5GdlDKiS3mGFnqG0D57yUBprGXMdSvt8Py2Bj7GTyEpRVEK0dLisBiX4C0kiltCSqdkSTKY0DDfJjLG4CLisbeHqCEKxDDa6ILNBjqkAUi08K%2BzUgGjnWFjDkqW5LyVT13Pvpu1NsVsmbq%2Br9rzLol18lGbE78VdDOqRGL7tNiKTah8ZUECFJhd1r%2BNjFbBeaIYw4e3B0G9ZoRUJUPur4iuvbs7YozpD%2FrqPKmaD1xxIApE%2B29E1DJ6y5ualVZ%2F8IQuogAXRUHUFemiWKrTJkTyNMubu75bmBEgNzF%2B8Z400oRx8xPO%2FrGNCnIj0%2BJL9ah6&X-Amz-Signature=dc3815759b2a2076cba2df19d49008f3c02455ed04ce5e3f550fffc51edace9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

