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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7KHGMD4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIEp%2ByhdGmwfg4mbEt9Dj2j%2FtM60kQb95SBB%2FvOehU1GCAiEA5lpc2EWjd5euNq5gyT06%2Fr4b4yHlI9NxXs3wtMbpn1sq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDLxOSlnjM6RAwLShyircAxpCCPAfaq0kbdx6uyEJjqDwIO1CErgeBQSlwS8qVld6k0b4Hg3jP%2BUpz7jJRDQ3ZK2LiqbUPYE5a459apbRyeKQrwsQux4ul43A9Bk6TO82pxVl0l3SpmUnF%2FgD8L4WE4JDJP4XAMvJfVbxoErmMUoH%2BpB7c9IoYUqRLU42vKvQxc4631y3qXL4TbZoBMLb8oEjmLJDXL4e7h93h9sjX4ADUgy7Uxefk4jpdcFEyb2GeVERtk%2BVZvoEGrLON28MhqZyJ1miz%2Ff%2FjyjMlijOmIfj3X99KUXIgXQXwxpgTAMokpz7%2FE50yxRG4ge3nIJuXNkaTPGZJn7EdUKtrBnmH5byqJYY9h9%2FnGFdrCNifLUuVROWa%2BbVPiOlactMIWHGFFaejcU8%2Fma6c6VqNQF8HHwI50Xv%2FOkkbT2%2Fci%2FXmZphr5vWIsteF8wUWakgWw4H3t7b3gU8h%2FoNda4mzc8yo8tjuW7jMVDpjJc6JfWypkN%2F54JR42MA1kKEOcKizx0gjtKKIHdAX%2Fa7TP9AyAh8piZwbOVuSC8FJWN%2FynxrZcJnWFtSiw8YVLMHfWKD9z9hjk3NpGZyiRIzUt1UUSoQUfGGUrSw6n8qYWSf40LfUuMmhoO%2FTp5EAuhDIlXWMM%2FYgM0GOqUBWIO%2FIVAahVVcsuneWZPYrtO2xdm94PBaTSCYgGc2ysQ%2B%2BDjQWZ3Be42l0OPPpLjR6Wk2%2Fk5uadbypuA9DdwfokWO2BZtMUtN56hxvg52sZlgJPig2k%2FYmEdR5dRLXYm8w5%2FMpEArwMOY7zV3uAwF3U15hkns2wS8xRFInp5jlTDEy4y51qjAPTvNC1U%2BuojP%2FiJTPQypNProsELAYSEXSpVjbnAS&X-Amz-Signature=721f3a5b792aa2691a4bac37f51c4626bfd4cb4199e317af1acae780f85badbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7KHGMD4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIEp%2ByhdGmwfg4mbEt9Dj2j%2FtM60kQb95SBB%2FvOehU1GCAiEA5lpc2EWjd5euNq5gyT06%2Fr4b4yHlI9NxXs3wtMbpn1sq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDLxOSlnjM6RAwLShyircAxpCCPAfaq0kbdx6uyEJjqDwIO1CErgeBQSlwS8qVld6k0b4Hg3jP%2BUpz7jJRDQ3ZK2LiqbUPYE5a459apbRyeKQrwsQux4ul43A9Bk6TO82pxVl0l3SpmUnF%2FgD8L4WE4JDJP4XAMvJfVbxoErmMUoH%2BpB7c9IoYUqRLU42vKvQxc4631y3qXL4TbZoBMLb8oEjmLJDXL4e7h93h9sjX4ADUgy7Uxefk4jpdcFEyb2GeVERtk%2BVZvoEGrLON28MhqZyJ1miz%2Ff%2FjyjMlijOmIfj3X99KUXIgXQXwxpgTAMokpz7%2FE50yxRG4ge3nIJuXNkaTPGZJn7EdUKtrBnmH5byqJYY9h9%2FnGFdrCNifLUuVROWa%2BbVPiOlactMIWHGFFaejcU8%2Fma6c6VqNQF8HHwI50Xv%2FOkkbT2%2Fci%2FXmZphr5vWIsteF8wUWakgWw4H3t7b3gU8h%2FoNda4mzc8yo8tjuW7jMVDpjJc6JfWypkN%2F54JR42MA1kKEOcKizx0gjtKKIHdAX%2Fa7TP9AyAh8piZwbOVuSC8FJWN%2FynxrZcJnWFtSiw8YVLMHfWKD9z9hjk3NpGZyiRIzUt1UUSoQUfGGUrSw6n8qYWSf40LfUuMmhoO%2FTp5EAuhDIlXWMM%2FYgM0GOqUBWIO%2FIVAahVVcsuneWZPYrtO2xdm94PBaTSCYgGc2ysQ%2B%2BDjQWZ3Be42l0OPPpLjR6Wk2%2Fk5uadbypuA9DdwfokWO2BZtMUtN56hxvg52sZlgJPig2k%2FYmEdR5dRLXYm8w5%2FMpEArwMOY7zV3uAwF3U15hkns2wS8xRFInp5jlTDEy4y51qjAPTvNC1U%2BuojP%2FiJTPQypNProsELAYSEXSpVjbnAS&X-Amz-Signature=721f3a5b792aa2691a4bac37f51c4626bfd4cb4199e317af1acae780f85badbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKVKCHJ3%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDzlCEifN6g%2BBBWKWZkDlb%2Bo5nSHedn4MAbx9SuP9R9cgIgMElFMvvd3S8D1bMc5OTvf0h042C41%2Fpi3NNf3aX7Afsq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDLU0oNHblx90wMucgircAxZF4jsaGq7cP3wgDaUcpaMSkY%2BGyUhVOUMZsSitG18N%2Bcj71EFr09nM7E%2FxukKLZai80yL1vaDI5MHcyqxeT4Yz4JVU8VGzqTPkXtSA3%2FPV7%2FL3rYW2YEYRQaQXCGrUz%2FM9LYvM%2BeegGTJdGAjSuQ2o5hlN2iLFdoknUJQmPasHom%2FAWXVmFl9oOlA3RbZip3FzABvJO2bT12NYZsnMX9Xeapyc6M9eI4FIY5ypTz5BcA6m3Vh1LoTMQnX4vQ5rEilxZC01O2YoF%2BDSnWgXaP1lB%2Bm%2BihFJkunXPdVfCh4rCw2YWG%2BkXKyxeclCy6%2FmT8Y9ftLetV5eHGiGgdspQx5JXIOEmNLhVEd5XE5l%2FYj5AEjE0FJMbrlvnO7Ltmuh8BqfUq%2ByYHOupFVyaAbWILmhyxK%2BnZFG5TnJpC3aEqaptdSSBt%2BFJYpVFGSFM6nx%2Fuzz5j5BncIZal%2B0uZkI45sXl1kvDKR0DSd6aieCcZriMLwJcJGxAIf9grak9xIVwHhDwGbsnRbQjni0D7uzBiuntuyzPrJurVvK%2Fwfbx5YgNJE5hZHR%2BUKhLLeXhBwBMTldxAPNGQfJjvlEY%2Ff4I8Np%2BF2dQU2OmPvNTfSX%2FY4AOKxpxfFgF0yyb8jhMK%2FYgM0GOqUBeeuE%2Ft1%2Bal2M3HjZEncxrK3BWpNyFc1WDkNeXTGLx9IrlsY%2B88EqNWWrUQCh9ANkl0ivyOPHjPeRiqucANFZG24ClnFKMmdtLS9Ire0cT2A1ubwrhMZPOeRQUXDb55jG8zIEdTIY7CygmJ%2F5hD05cU75dVhOeIgxuzmdYmCYPAiGyzx129v1mCiCqMkurG8I8tLzbe8OXROl5Nl5yWqq6EDUKa4c&X-Amz-Signature=24b6c8d95f58f3cb1f1c15e0b526b1320110c5510762ff8f45db935607905ef1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4WXV4N5%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBRUyJpd2x5os0VB8mNVodLSpRdBIsRz%2FIssqpaTCLZkAiBvFBImUz0CPVlncnW5MIN%2FQp8K4tHSAWVu8jj4%2FD1Nrir%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMvkBTnWRJ0YyRFNYfKtwDuZjDr3IWdFelw7hDg%2BUNb3oJZcvhUlYc2mgxkFnxDolX97CtFYbPfznY3xUrQ0p1rt750MsQ0uqY69yQQCzC3oVPE9tlXCCsL0RNNCzrdyk3bDPXcCocSuLQmnaYICQc2DlWP1jbRUGbeymL1RK4hMenCetx5u8DJQBKzq0yLJkreLy%2FwtN8MarsYF5KpdgqMvoo8jDB99RFhylvhCHNLh8VJ6gsWnn1mP3URXJyF0YSMqjwhvvX2sYBHceVh9qC7yqh%2BFhLhs%2Fbhqa8HuUqOrEsZm0W54t8YOzlUF7%2BuOcaW%2BaHE4bW3%2FXgjwMoW4KqCSgezIYW9RUleaNt5QpLxeahR22grPXwGQ2hCDQZFp2fPsGTqKWkSLmnD2RwO6vNvtNQEph4JIljo6%2BfC8dt6dM%2Fty%2BTN0rbKEdLtyhm012TAzYoc6ndZ9rD9Hc1RSey49aE4K5WBLti6PJnDxOiioVr%2FB%2BAdocuGohAaZd6vcO22%2B0s0PAOi0Y0jZ3EcHoHdFJM5ktG%2FIWVWVajHObk%2FyIAwbILLxPeidP70MdCI9R6RnSil%2FOZn22EhxqcT8WwH%2B8Z17nrT0zXKRuO4P%2FyFI30Qj89P9z1PFIAbEKaPANWXKjn7YbiZMengM0w7dmAzQY6pgHkDuADOGHGJ0igE1jre0fdWy%2Fv%2BurNJXOWe0ViC4NbWqg0goxkgr%2FTvGA%2Fwbzv570vftxMs1TKBwclx5R9sbSWH6T2HnqPP9SPwy%2FnIYag3rBs4u0W4PPDGEXlJZ78yG752aV3l6sJrO%2FRuYqVmHsKdVohcmJoNNt2ZzRlWWdMB%2FH0z7d2nYtxn0nyIyMc%2F%2FyjxMt03rYaBraLj%2BMr6gEq1trOwNeR&X-Amz-Signature=d3689cc386d7b9f37a0ff913432313daa9ba103f42a1cfea5c22c867e97c1e74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4WXV4N5%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBRUyJpd2x5os0VB8mNVodLSpRdBIsRz%2FIssqpaTCLZkAiBvFBImUz0CPVlncnW5MIN%2FQp8K4tHSAWVu8jj4%2FD1Nrir%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMvkBTnWRJ0YyRFNYfKtwDuZjDr3IWdFelw7hDg%2BUNb3oJZcvhUlYc2mgxkFnxDolX97CtFYbPfznY3xUrQ0p1rt750MsQ0uqY69yQQCzC3oVPE9tlXCCsL0RNNCzrdyk3bDPXcCocSuLQmnaYICQc2DlWP1jbRUGbeymL1RK4hMenCetx5u8DJQBKzq0yLJkreLy%2FwtN8MarsYF5KpdgqMvoo8jDB99RFhylvhCHNLh8VJ6gsWnn1mP3URXJyF0YSMqjwhvvX2sYBHceVh9qC7yqh%2BFhLhs%2Fbhqa8HuUqOrEsZm0W54t8YOzlUF7%2BuOcaW%2BaHE4bW3%2FXgjwMoW4KqCSgezIYW9RUleaNt5QpLxeahR22grPXwGQ2hCDQZFp2fPsGTqKWkSLmnD2RwO6vNvtNQEph4JIljo6%2BfC8dt6dM%2Fty%2BTN0rbKEdLtyhm012TAzYoc6ndZ9rD9Hc1RSey49aE4K5WBLti6PJnDxOiioVr%2FB%2BAdocuGohAaZd6vcO22%2B0s0PAOi0Y0jZ3EcHoHdFJM5ktG%2FIWVWVajHObk%2FyIAwbILLxPeidP70MdCI9R6RnSil%2FOZn22EhxqcT8WwH%2B8Z17nrT0zXKRuO4P%2FyFI30Qj89P9z1PFIAbEKaPANWXKjn7YbiZMengM0w7dmAzQY6pgHkDuADOGHGJ0igE1jre0fdWy%2Fv%2BurNJXOWe0ViC4NbWqg0goxkgr%2FTvGA%2Fwbzv570vftxMs1TKBwclx5R9sbSWH6T2HnqPP9SPwy%2FnIYag3rBs4u0W4PPDGEXlJZ78yG752aV3l6sJrO%2FRuYqVmHsKdVohcmJoNNt2ZzRlWWdMB%2FH0z7d2nYtxn0nyIyMc%2F%2FyjxMt03rYaBraLj%2BMr6gEq1trOwNeR&X-Amz-Signature=cdc7e30fdc10ea58f462ebe44d895d4eddb6586a43723a4d52c977243586af33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NWHZWJB%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIFCXivi%2FSSdEnIpdgSqDpKfhAsBK0Oqpfv1faS%2BscOOwAiAqT7FIkAISBVH%2FQvVKsdB5KJfI6nJDM4FHHwPBgRo9dCr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIM3Q8ZOmep9wrKndpWKtwD%2F85l3cZVnxknJeyQdjMyz1E8skwWDtumultrtx0pNkPar6LH9Dlr5AQuoem4PLMIyk6PPkkex2xqVNpHm%2B6REl0xhGUqtFCJwA6mQW9g9NmQNj182hEeV2IduhPezGPTPb%2F5KJWrH1Wz7D%2F%2BKhRXmjoB7NkJ3GClxtAwkgVAYZ81Yk%2FgB6H5moTJZS%2BRxSQoxgY8wHTcxZAMsvWbIUMhsEo2AFvMkZgSC8DZT89YKSyODAREzeWtoiyMjV%2BDgZMEIkIyWvusuENM840NEmbm0aUSaiddAwLYW9j%2BrB2v3anJ%2F10jdTT6e3YWvTEgIFvPXtMqFT6KfyQwbNi9z4kvplCYcgwkGRoX47aopOpxi2tejhg6OMeX0I5tPY%2FHPKOO9OiNLz1SMXXyuRtCcgXmcT6dKMti9PCvpnFqiB58SQo1ytMxio4IlHRxNpvWq3tFYsoq64nIssrjqTzNELFjvQnLoTeLN3npTZb4rMYyOxd20hYP5JCwi4nEfdd2De8%2BPVLPsaQ1wXl3qFXDKOjpG3r%2Bp7MVgd9dlyiTlN1K9CmdsF9bRr%2BQCrAhnRYhX%2B9BJro6E5wfy7J2GaAtBgErYXt4WG%2BBR4N%2BnQadjqiTeGCAXkQdnU4IeHI3L6QwsNmAzQY6pgF%2B%2BQ%2BS9mA4MDK%2F54fOV3u0gvAxccV4DbzapDmemktfWRKOHglxxtB%2FHMY%2BCTDAFIxLggD%2B8fKV50mMd2LSHejyR8QMGTMKAWx7XbGZKJV6JaIEsQg2diRuKUjizpDIbf0Hxd8tGza%2BuZpYHfCyHZesBk0MWou84MoeNXUq6lkzmXj18xrmC0dBUMjNwmK7SJPrmd5aFTcduRZKoRTe6hJJbpbE4hiu&X-Amz-Signature=a23faf59b78c371e320fae1813aafeff6ee01b5693c8227cd3486e92a3f7db92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRI42EUL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDRuo4Ys7zRV%2BGz0ysqkmL5%2F%2Bh5dNO%2BRQpWYS82U%2FyccQIgcwy9gXOakbIac05fNlFPiL0n3Fvb6%2BWN0K5CY3RnEg0q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDNsdp4FwFeksgvwXxCrcA7hso1VkC7WLP5Ulqvl3hstYq8hinYHkY%2Bl1HV%2BzjQOoAM6e4C7EMeUO%2FN6OiXyMwLWTXhgknh6bFQK8otqsvaHOJbgNI7H0NnBgVXPjbC5urjtatVpTr0SH5KqyylfEHC%2BD%2BiiaMNIgmtBa%2FvNNC9xJAQXj%2FaQESnxixEV5uMP7rJ6Zc9DLUEev1ewiyUNbcyfmfciPNHWYVJhjUUV7ls5rOANcT%2Boj9LguyqDUc%2FgW%2FhGukNmcNUjFCCyReXX8HDSMCIMFtovew0pC%2Fp%2BdequOBfiwXD6FlvRzQoRhuea%2FkVcAZf1k3dQFH4zhCysbHTWRkE93cZe2h%2Ba5Pto57nvOILmwU0queGeSmYHRU4z6oD4lTvQaE5REA%2BB1hsVfszc5QsjnE9xiDMnVdndbmBHcHIa08pU7Pz%2BW51xIC%2BQfC2er1q0Wz%2F%2FQbhE3OlchkEVBMoQGZHaQPm1HKi980%2BQIvX4wu7eyifyNvcrftP7zTBkOjj3S9qxKyWrZFRvBKCTaYsNrAi7eFx7LCrKOI05RtFXYdoQu9Tnjv%2FzTMnqPbdGDjb%2B7D3VvawOlZJ%2FMYFKa1JwJ3Sp5YzMSTM502VJiRAFP6z0NA8FSk1cbM8kbK6KQQB%2F3urIAWG%2BpMIDZgM0GOqUBXj6rtD2DTPuv%2FxmvAeKuVCbE3%2B8TjGWuu28JdrlZIcBlJX0TbRNfba10RHhHw4CbFLRvJBqW8s9Qv9CH1gJbPXwFVZ6T2zDpIaJivtD4J61cQbNXRmlYWeueyRBS0QRONTtfFz3pvFvvrV6j1tQqocG1bCY89fYnC3UoxAmRYSgD1k1k0ZoI7%2FMkfjEiFn4bgMsb56Rnu4BHM2PF7V%2FFBH2l7ju9&X-Amz-Signature=35b10937da80125188128ad12f9ade45f51679f2c40cc5daca607dbb1359252d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637XXD672%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDMEe9MYK9TwBjsyQiK48bUS6%2F4ugVX0tCDIFPxHfRsqQIgVeBxO7UsBudaMh0xjSQo1nAuglvfy9KY37x7KMmSCA4q%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDOSLTvczc07jcY9V2CrcA7B6LhOiNdsvwRlKuIwm0vV4zVwdG5Y348yFelZhES60aX20YK5XZPz9XSzIzecZM6Kq3B7Gfz%2BM2av%2BcO16p2RCiqo5%2FPgvZqC%2BTfeWEku9w4tFJaACJoB2%2B7ncJnPumdGaihgcQWrdcGdMz1kWq1zIEEqxLlzH69xS76wjqLisCkNHLV1nYK1KaS40%2B183uMh8ovfK%2BBc5gIoKL4BNQ3MbRU%2BcK7pmP24uTwfh7lsLdM2N%2FZ0CpEaEKq3JhR2O6nTj3Xltxk2qBXnlNqzOyiM9rb7q8XBiPOjWFJFpjTpgAVf92PRifWNJo%2FFWweiOflZVnNXs0kPHFX9E%2BL8joASB32U%2FetQt5rmqdrZ1Atz6%2FvbTubmJf5fFXkXXnxYoGRcmoJ8bOKoJbFJewiDgcVEiJSkmaXhhBuifchyBqDoelKTheYkm4vxVVF64hIDp5wwgcoatHQgZq810y0h7OfsgHgUIzbmxg9Yk39B0epM51Kn%2BSFSwn4kGqM4J8FsohNGAcfHdiNiGthF74xY6oHNm%2FxKswb%2FWiBvZqfNf2QWfRJelWUmnBslvzB1wv%2FIcLh9PbK7GHd1sb%2FEuEy1cU147UPTQNIP2M6oN2Vxwig6Hv0cwMM8viEVq%2FuKYMN7ZgM0GOqUBFFCfHYwrSHjT%2BxsnzTqQEktWJ%2BXEMD2XBxVu65EqsxF7I4nAYI9Z083c4N77nRt9EFDG4qntNapuawa2qSGgV0dN637C22LQu524u8fIefeKOELiERpa63vqh0jLZY%2FTaDwxPTTZt9JZU5UsDG20P7u14F%2BzZbzAKKPQa2P3niUO%2F1tgqrI8HXNazML%2F%2B7ICvrJSsPEQ4Gq8wC%2FW9X%2BPCjR63gA0&X-Amz-Signature=9134b964f9ef0b11a8168cb1a60a430aee4835e5e2f8bfe0a774cfc1c831c321&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEB7PF7N%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBwx8afLPU3eFmRS0rRPd0TkFl7m9OaisHa7Rq8ZvHzhAiB49bJ%2BK33e129habGq9wDR2mtZQ6xCQUoWNPbw9E6I7Cr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMuxQM%2BHzwrmc6o2RlKtwDeRDWGV35D6x0C2QhfvY8SZ7gjlnB3w88sZt5ClTVv7llgXp6rJol20%2BNzEWtspTk5yhwUbExEjg%2B79qLTuG0xD%2F4wBiNVW32AINeTXCw2plhws3cglUFjT7JhNRxly9Nf0iczKg69kPyFPxb9WdvYWCymhNBRoRzARK%2FVe41vz95ivmpbRQsm2FIcFiFdPHV0bY8OVPxhiRNq4lRTNCMOKDiO90FeCLO3xAKzNERU8XJXFX6Xnlqr5FKFXPNEh5yeLnArWjxC4tQ%2FSlegOXY2RVqGV5e3FfvCdKNIoBsz3rC7C8ixuzcutZBcwGo4MtyqAczSsyDRKnOQrMeAybj1XFiewKP6jLbHq%2FHupzLv7vUGVCQKkVk35eGloR6cXvDmYC8kqcX40scYBjdG2U04Y3ZNNdJwP1%2BCJOjTszmBcZypT7YK1btSvr7AKMaP8ITj3QtXT5ZnBWRoYgrjvGNqas2m5F%2Bi7LM6gxgCre23GoB9aw2%2F%2Flf9391RASwzPhBy6CXrPU8fOIP4ve4iWlxmwgWsvQv29lDq9FgFn%2B1OcUaWfgS3CvEXt2jOrwbNO%2BL0LvB1atWVJqX4ikP2B2AYVCWQ%2BM%2FmhjaZo9kyc3A9ya1OmxENtxS9JmyAAMwjtqAzQY6pgE4MtzDs6DJ1HsG8Z5dtt1dzl1R5uQzwlM2sbzBqrSaWg3YS%2BsoDuPlC2E6U8wyDJ7zayn%2FSpKpMBwxJaG3m8mv3qV%2BzOyO2hgO30kceAHrjROsjiUXYYkacqZy8IkXT%2FZEZQlHptoiKyv1AGN5Y8mliqvKUBmYJBlFkKKfsGMqDtUOyykAJLrGMWsqN6mvAUQxcaDEdY7mTl5%2BV%2BSw5eo3j1UdV2De&X-Amz-Signature=db2b08d16db46f996ab449ee3aa267793047c7c99a16b59d885ac1697562bc8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEB7PF7N%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBwx8afLPU3eFmRS0rRPd0TkFl7m9OaisHa7Rq8ZvHzhAiB49bJ%2BK33e129habGq9wDR2mtZQ6xCQUoWNPbw9E6I7Cr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMuxQM%2BHzwrmc6o2RlKtwDeRDWGV35D6x0C2QhfvY8SZ7gjlnB3w88sZt5ClTVv7llgXp6rJol20%2BNzEWtspTk5yhwUbExEjg%2B79qLTuG0xD%2F4wBiNVW32AINeTXCw2plhws3cglUFjT7JhNRxly9Nf0iczKg69kPyFPxb9WdvYWCymhNBRoRzARK%2FVe41vz95ivmpbRQsm2FIcFiFdPHV0bY8OVPxhiRNq4lRTNCMOKDiO90FeCLO3xAKzNERU8XJXFX6Xnlqr5FKFXPNEh5yeLnArWjxC4tQ%2FSlegOXY2RVqGV5e3FfvCdKNIoBsz3rC7C8ixuzcutZBcwGo4MtyqAczSsyDRKnOQrMeAybj1XFiewKP6jLbHq%2FHupzLv7vUGVCQKkVk35eGloR6cXvDmYC8kqcX40scYBjdG2U04Y3ZNNdJwP1%2BCJOjTszmBcZypT7YK1btSvr7AKMaP8ITj3QtXT5ZnBWRoYgrjvGNqas2m5F%2Bi7LM6gxgCre23GoB9aw2%2F%2Flf9391RASwzPhBy6CXrPU8fOIP4ve4iWlxmwgWsvQv29lDq9FgFn%2B1OcUaWfgS3CvEXt2jOrwbNO%2BL0LvB1atWVJqX4ikP2B2AYVCWQ%2BM%2FmhjaZo9kyc3A9ya1OmxENtxS9JmyAAMwjtqAzQY6pgE4MtzDs6DJ1HsG8Z5dtt1dzl1R5uQzwlM2sbzBqrSaWg3YS%2BsoDuPlC2E6U8wyDJ7zayn%2FSpKpMBwxJaG3m8mv3qV%2BzOyO2hgO30kceAHrjROsjiUXYYkacqZy8IkXT%2FZEZQlHptoiKyv1AGN5Y8mliqvKUBmYJBlFkKKfsGMqDtUOyykAJLrGMWsqN6mvAUQxcaDEdY7mTl5%2BV%2BSw5eo3j1UdV2De&X-Amz-Signature=a511f74ff58c2f47e3223b22b46e54559e0e3467f3904cce87b5094d89303b8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJJR2ASW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCRHcQWQEqGEpvUSJDt3pkOHC2eNzCJ4hG8qB4PAlfiQgIhAMmK0HJCskMphuRf%2BlliKEll1hl7BNTozenHh%2FoVMHFEKv8DCCQQABoMNjM3NDIzMTgzODA1IgxtpI%2FZnVx6TFU2Pbkq3AOcF9JEFuGk4%2FgOsttGR03N0W4FGV5nM29BMW6QVg2zpeZYflOhyg6%2F1V3g677CpeFdWZBR8AnUTJt8bIXTuGOzXqI6GCchcoGKN5vtEl1abqjJkGC1glBdvHqsq9TuCspLCDwxS786tffX58WfL%2FoWjCSjTL9E86oVBU2X04BQeBFJo1SHY9F3njtRe%2B8LShHtNUL4dLySnlOzXF79ziGmWxdZ%2BLbEjLuGDIngWiLDcoyH94AM3N011htYKvbPsI%2FI%2FFlgJD9Ef%2Fs%2BTddY6MexTkiK1eMZ%2FO9QXvC90udZ1WGXsYdTzSYzyzdpVb%2F%2FjkTT5dxzaKx2ac5fE%2FQFuMaMPTea9U1MW7Rlt7ypHtKQ4w%2FuEYQVT0sBk1pkBh4WXZg4xTSgFL347%2BMCfOl4Q9B1%2Fn5AegWfbMCbcui4IDAKNyeI61PEePbppClY86sHytsKOgl6ouX2ay3dqk%2BkIE1J7arBwuZhmTQmfi6MuBOnEyr7M8EHgOmNYzl7mzPmM0J1jc0ZJplKtQ9HE5ET05b%2BtHogP99Vw8tdROksWPqHDVWXQNACb94rS1XJhkJTIFO%2FNu7VcL%2BXuX2pRnOZpMewYXNbPSwQJPUfym6gLl2ySWBxXQpGOo1bs3%2BpWjC82IDNBjqkAYHr9tfU7ptDZ4VlKSpY9ZFlvbdA%2BopfpMou%2F9dDrFiAD%2Fg5pv33VtAxm8NyweQjlbsEbcBqAEAeRpG5w%2BWJUnz0nnQV1tJjr0UGpjrwrKTJJ%2B%2B6T%2Fben9cG0HfHity%2FcGYRNZNZfW6IZUgerlW3Zoa33HVIvE%2BPgBQ9ahZzHTQIFneEuq2wjDVjF5gwq1tI6f0rPxcLZfcxZDB9G5fjKW7jquh5&X-Amz-Signature=4bf090cc6f9ddf6e861bf643456088b023f8991360c8c296fadb7acac8f80377&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVL343LY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCtRIM949q%2FKG2DBiRMt3jBRiPnm6o1EdYQkfvqTL2yDAIhAPg4cvfIlWmE4VHrCrEdFriawQi%2FIla0V14Ya7rqIMRvKv8DCCQQABoMNjM3NDIzMTgzODA1IgxnWva6zltoUKh3UEMq3APPnzC%2BODBKWiw%2BEpGC2Y9Z4EBzijcUq7W0MOdlVF%2BRzQ3lCsGEFLc5NXHOEKpWuVNn0IEV2K8KhWMmvGe5DTBubtpI40OeaOBW18xmncA4e7UYMOTgS7H6ak%2FTKLKG%2FnpHWz7b5%2FSykrCml2ezkJ%2FYM%2FNtidrZq%2Buc0%2FqQFulnYn7DtsbC1FgVleVhp%2FrQKr1fYkY6OOn0W4PPJeL0IwzEONFppTcjHFw9jkDhhYTtIqu1vY2oymP2BlnvqGuBsuiQS6gWjf8d5vOWtIvNnlrmUGwUcpQCjMG95Io4YeJ9hhTY1QMjxiM176J3UCgIF1U5kPilQb4E2X3guOaBw5acP4iIH4b6oRbYeuiizh4SqpDGbNbf3yHERvyHb%2B%2F5Ffhr5RHNCfn3W%2Bva5Ru8FAyKItnYNdhWItG5%2B0tz3RMhghc5jb3PcNy2fgkedc8fq6MwlSKwCiWtVLdzbGOfczeQ9uOVCvaCuKPGNLskM08UMcAoE2ynIhXB27Z8CL%2FN0vgtAIBT3HFa9FehS7K%2BFaBa7X3zvv3moeurxY%2FPQXHThZSC8QZ0p%2BhMkjhFa%2BV%2Fj6i59DzmAPvR%2F4kAoeaAo%2B%2F%2FknO6xfKIdJGYtfMwyutPGNm%2FKXzsI55gyAdesjC72IDNBjqkAZoJFiBrTx71rAo7V2n45q%2B40b3jlPmVqtuJALeZmRvoAuDoB11uSgBKgNyJAWQfuWvppIXD%2BneuDFjb%2B4nt%2FW3d0zoHqjVd6kpSGLiG2Hr5zmMznM%2FJN%2FXYHEAC2aUURKcSyScf0761b%2FuP9Mpreg%2BtHAiMcOxIxECVBBx%2FO8kkB39Kk%2FrYkaKV8CwLRX1zWiFGoeLvpl0mOTztqq22ua665Eye&X-Amz-Signature=de6c8ba0896dd881064cf1009e0dcabc3a2326957627aa2f5754442b22778114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVL343LY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCtRIM949q%2FKG2DBiRMt3jBRiPnm6o1EdYQkfvqTL2yDAIhAPg4cvfIlWmE4VHrCrEdFriawQi%2FIla0V14Ya7rqIMRvKv8DCCQQABoMNjM3NDIzMTgzODA1IgxnWva6zltoUKh3UEMq3APPnzC%2BODBKWiw%2BEpGC2Y9Z4EBzijcUq7W0MOdlVF%2BRzQ3lCsGEFLc5NXHOEKpWuVNn0IEV2K8KhWMmvGe5DTBubtpI40OeaOBW18xmncA4e7UYMOTgS7H6ak%2FTKLKG%2FnpHWz7b5%2FSykrCml2ezkJ%2FYM%2FNtidrZq%2Buc0%2FqQFulnYn7DtsbC1FgVleVhp%2FrQKr1fYkY6OOn0W4PPJeL0IwzEONFppTcjHFw9jkDhhYTtIqu1vY2oymP2BlnvqGuBsuiQS6gWjf8d5vOWtIvNnlrmUGwUcpQCjMG95Io4YeJ9hhTY1QMjxiM176J3UCgIF1U5kPilQb4E2X3guOaBw5acP4iIH4b6oRbYeuiizh4SqpDGbNbf3yHERvyHb%2B%2F5Ffhr5RHNCfn3W%2Bva5Ru8FAyKItnYNdhWItG5%2B0tz3RMhghc5jb3PcNy2fgkedc8fq6MwlSKwCiWtVLdzbGOfczeQ9uOVCvaCuKPGNLskM08UMcAoE2ynIhXB27Z8CL%2FN0vgtAIBT3HFa9FehS7K%2BFaBa7X3zvv3moeurxY%2FPQXHThZSC8QZ0p%2BhMkjhFa%2BV%2Fj6i59DzmAPvR%2F4kAoeaAo%2B%2F%2FknO6xfKIdJGYtfMwyutPGNm%2FKXzsI55gyAdesjC72IDNBjqkAZoJFiBrTx71rAo7V2n45q%2B40b3jlPmVqtuJALeZmRvoAuDoB11uSgBKgNyJAWQfuWvppIXD%2BneuDFjb%2B4nt%2FW3d0zoHqjVd6kpSGLiG2Hr5zmMznM%2FJN%2FXYHEAC2aUURKcSyScf0761b%2FuP9Mpreg%2BtHAiMcOxIxECVBBx%2FO8kkB39Kk%2FrYkaKV8CwLRX1zWiFGoeLvpl0mOTztqq22ua665Eye&X-Amz-Signature=de6c8ba0896dd881064cf1009e0dcabc3a2326957627aa2f5754442b22778114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXNTFF77%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T123231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQD29%2F%2FCc8Zib8HnX7bod6NXI4oDi8fsSyo5%2BS%2B8v7tvbQIhALxVd74xA%2FFrhQ7n1L6%2FZZdsOI2dptbXhEmpPUIpKg2SKv8DCCQQABoMNjM3NDIzMTgzODA1IgyX4n388oaob0yOk4Eq3AMsk6vauPU7Ssc0%2B1Gez%2B0hu2T0unKtne7LUO%2FQxvPb%2F%2FoJzEjBhAMiCL3SCT5OyzHB4P9D1JxbJGoWLIw9wcyvRmW%2BdCOsC%2BR9nZcQNLxuVd37MRkbg5uIAc08rKhoWrFt3EwGoWtc9ZG8aFUGnVwZj%2FG3FecEger8hQAZ%2Fof5yflb2oZDfvrUfbdNXs6d7cz7jD8eG0e6E%2FMSXJmJ9vcAkh6SrGRgSFqz%2FzLVcmT%2BGklewhWVPI2JEMjQwI6RoHI3vs0oGITWLJjXgLtdH3a6Bgb531hZcUVU9mNbuAEq9qma6Mc07owUj9tcc7RJYXg9UGlOVtCQDk7hxATxmw53t0rfWlPD5bJNy0zmKx%2FQ2t2TRKnojH17ZZnSqKU2eHSwPcJ%2BRtju58CxkUoL3pw0mT%2FucuZN4pue%2Bc0gaVYwCSIWq0vKXw0PzMLFg7YDq22f5y%2Fmp6qwyGWeUY8tkhKnUliICJqDimI1IED1Xe6R%2FaXVxV8iHLJFzpCPx%2BBlBQ7AlqGIB22lRv5UpGJkuE%2FIfkV7s51a2JO2ulgrdmRbo1sh55%2FEvKAv8Fmi3Gj%2BsKBI%2Bp2xuNuk40VDqy7rFFMdlZDu78xpyPohOiHI%2BTa0qMNMzzFdOXonSUpW7jD%2B2IDNBjqkAUMyx9RRRypAUfpsEZamiO76uJEfHjt7ON28YPzl%2FOYG68pp3%2BKcySqyr4NqWTb4CFJNS1CPS7TlfNAKVXlQhAtiF4qAmngT6IOg%2B6w3C6%2F3ByxCm4cJuAfuKiWVk0ubIn1pSW6b1nGmPFvYOQxqKJLyAi0IiFHx%2F6zP0Q2v2JTufk1jxUal0VYxUu3l48Fd1nzqXuakicBDIp%2Bw4sz43gmoioba&X-Amz-Signature=79851fd5d82cb595cc9e98c728fe9cc30cb17d2e6012b0d0edee0a78ce744c3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

