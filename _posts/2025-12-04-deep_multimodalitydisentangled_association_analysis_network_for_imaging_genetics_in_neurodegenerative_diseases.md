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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LP2OJID%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQD96wW%2BNCqG5%2BiNgdSIJyHuxQuNDrhyy1sjRO1N5wUeDAIgAxfx38l33IFXpd2CxzQxdjqXzTp%2FWelkmAOxG%2FkP6r0q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCjbDI9oRm6%2FAcjHtircA%2BVokLbdbNHoJBbAgdV7bnkqKzoERj6VBSPt9lxVh1%2BsK728%2BMg546ALOvuFokkqzigZwwcZFyOouezXp8%2FearbzWmTCwAGkztkwqraA2m1ZRNtLSrI14htBEv4W7UwNjzOS1g97Ew3vaGkVGstRlP1unsSVK90DhKLVq6fcWFsASKN%2BBjaw8jCaF0PIL4034GVsGtW19pXpcI63VGwmRlVWmAYrZ1kzzrCc77dCjz2JvYhmC6nXHiPJD6BNt7J1NksD00TleDCdk0c2WUFTA6e5LJ15Z7Q3NtzLbY0DCE32azf0XnOOaLmCqptc0OyjgI%2BwlhD%2BCQ9ON7XxhzGhIcXcSgVl6206%2FM16ReD91%2Fz7p49Zjcrs3Q3RzjWUP8y2qFwscbvrsnh9bDtOcCr6YQ3LOpJa9sZZyFhkGx3pEo3%2B3%2BileHz3WJ0ZincXqJ%2FNrXrlvZmRI9upR6o%2BAoGv%2FSq3PLfLOSiYgUvjKh5ywelUndDmUp1EGxxSDN5m%2FBKnSdQ8PGNrSHRsRyqGMFsFDArWXR5seYBqWMwEwOmKi27mOxqCYz0JUpw5tpM6wN0gU7zjdxTBM5aL4dFdSFTU%2By9ka9na30P7gp9n8vZs8vJSn8QwTAlCWGFKmA9rMJny8s0GOqUBCkL%2BsxjwkJ5dGaGgjwP%2FojE7VxVukBIWO6jVi23QKposocqU0EBgIonlnbTEj1IKO1KuFrFMnL%2B1yD5IyylBpFTkv6dVcHnJ6pF9Gz%2FKatUnflaYVTjHqT7TH4QxcIwo6VlgYxo2m04U74pQofuz3XX6wI3m%2B8LGlhQP%2B0CRu7GTAgCimO17CndKO1kMT4SFAHOddJe1gYOnOr8Pg5QFV0XCCffX&X-Amz-Signature=cba489973761e9c9b89af6d42e951493c302af89172cdb86c9c88fa326dd4d64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LP2OJID%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQD96wW%2BNCqG5%2BiNgdSIJyHuxQuNDrhyy1sjRO1N5wUeDAIgAxfx38l33IFXpd2CxzQxdjqXzTp%2FWelkmAOxG%2FkP6r0q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCjbDI9oRm6%2FAcjHtircA%2BVokLbdbNHoJBbAgdV7bnkqKzoERj6VBSPt9lxVh1%2BsK728%2BMg546ALOvuFokkqzigZwwcZFyOouezXp8%2FearbzWmTCwAGkztkwqraA2m1ZRNtLSrI14htBEv4W7UwNjzOS1g97Ew3vaGkVGstRlP1unsSVK90DhKLVq6fcWFsASKN%2BBjaw8jCaF0PIL4034GVsGtW19pXpcI63VGwmRlVWmAYrZ1kzzrCc77dCjz2JvYhmC6nXHiPJD6BNt7J1NksD00TleDCdk0c2WUFTA6e5LJ15Z7Q3NtzLbY0DCE32azf0XnOOaLmCqptc0OyjgI%2BwlhD%2BCQ9ON7XxhzGhIcXcSgVl6206%2FM16ReD91%2Fz7p49Zjcrs3Q3RzjWUP8y2qFwscbvrsnh9bDtOcCr6YQ3LOpJa9sZZyFhkGx3pEo3%2B3%2BileHz3WJ0ZincXqJ%2FNrXrlvZmRI9upR6o%2BAoGv%2FSq3PLfLOSiYgUvjKh5ywelUndDmUp1EGxxSDN5m%2FBKnSdQ8PGNrSHRsRyqGMFsFDArWXR5seYBqWMwEwOmKi27mOxqCYz0JUpw5tpM6wN0gU7zjdxTBM5aL4dFdSFTU%2By9ka9na30P7gp9n8vZs8vJSn8QwTAlCWGFKmA9rMJny8s0GOqUBCkL%2BsxjwkJ5dGaGgjwP%2FojE7VxVukBIWO6jVi23QKposocqU0EBgIonlnbTEj1IKO1KuFrFMnL%2B1yD5IyylBpFTkv6dVcHnJ6pF9Gz%2FKatUnflaYVTjHqT7TH4QxcIwo6VlgYxo2m04U74pQofuz3XX6wI3m%2B8LGlhQP%2B0CRu7GTAgCimO17CndKO1kMT4SFAHOddJe1gYOnOr8Pg5QFV0XCCffX&X-Amz-Signature=cba489973761e9c9b89af6d42e951493c302af89172cdb86c9c88fa326dd4d64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWWQ7XTU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIE1i6N7TRcM9ugKSrycqKbRX9%2BY4YXHaKYgskxOJqKv2AiARbHR3I7fJHXDlvrq%2FNG%2FxN6OhRB0O9ZWarGWeZeORxyr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMD5YaaoGhSBbXXjucKtwDSYx0Q118aKc%2BGl8eM03RVNnD%2B7eKLzYoiiDYVjEu46KfRlm8dFo8423VBy6pFdC7r8%2FPc5QKnibBtSszlwcZTvC9%2BANqmiGlsz4Rk77mzkIWwaQd7MI0ON%2FM4SjR5E1%2BSFVcGuIDDq4088UJHrT4WPIYCn1IHAPTERMLxvaXgu4SueDOUIYrm8tDgFTPVLJF4A0ATzs1eULm64cfGHylmxzVA3bhlcXQpOJ%2BE1HZR%2B%2B6ZDx%2BzxGisGoEJMQIc5NjGOgIALxnGQ%2F%2F0rswdRKH7jiBkq%2BZHjN3%2FQfmTVzVinP7JNMzO3jfTzarKZXqxSwY6gUNU%2FR8WSnrcFmTEx4iC%2F2sw0mBWwBuNFGw%2F6%2B0nIMiFjOQiFycIyK9LbTx%2BSRlNvDanZoBD%2BuMcCC8%2BgBG7fbrIR%2F3Rt8O9yN9hbkJWFM2zSUthH6WitOMjTgAYtvuhVUzeQkHyNrV9uhFkD0RFSFhPFcsMejVi12KtnMe6GnxnpASyguUXfRhv1jem4yRW%2FhG1gQEgyeBbm8LMtEmXHO4dgP5%2B1Bvv%2BjrJ3WRZ%2BtK%2BcbSSgJm2rKCn9z9bfj3UEJk9TOuJ8Aa5OkoCrVNOlq5%2BKc%2Bz7CQfRh7uW2hkF%2FZ8sm%2Fk3j8%2FX%2BShNIwyfTyzQY6pgEOeg2J%2FGioZn0OOkIr9Yo5W%2FO1HuftUCD%2FNaySWxtfLY4rdyExzcoFWCGmztoJ8aYrjL9bFN91FsgbdSwytr4B5WPCO9Wtx8X6Mlfq%2BWq1TWpDiWuCC5L%2Byvnuu1i5a%2FTrSIm4yCMhOD%2FTXxhBbZcgmCnXGOe0ybPIaDyMDfS0XhBgAKcMPaUMZrCzLf1g0zRZz48om7iubBFRAnQvVJFn8nSr%2FLIP&X-Amz-Signature=6dd15118b080fecb945d2c8c65adfc98e0aefd9da7997bea50891bea67b36492&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X73JQXII%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIBNuJG6rqdfZ6YX6eHonA3uyeAe93ZamBCvOGQ%2FhoM4HAiEAyZ3NzoOeEHjsPXNOLo37oPSVQJcIR%2BP2yEXxrgm2844q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDMgOYoqtQOcN%2FgpS2SrcA%2B5PPZGQ6RHhu9mKvwcPW7ltX2r2Tqo0uUOB3npmLPjTYVOFpcurUug3phmTfRW8B5RTAcbG4OIoGXgLlgxzuA1qYDT8hF80FZso8bXWhVcvOYN5%2FTJfqWN4gmzGjt4XQaZe1%2F67i02Z2B8q%2BTx9QrDBXQQeMfOog9Jr4gIU5CuB3dHXHc5AB8xnLjEUKnTz9mN2%2F6gKeZ6JtEVKWcHR0krgGu69Ouumejad2wQ1jF8zxOgycMce4mREUPB0gcqr7fUHaq%2B6%2Ba%2FJh96LfQ93aES54qhhbqHxxArlRwgChG75RkreHHBy8gGvhkk6%2FBej8cGaWI6WgQNdAygPptZeQZ0rFQkx%2BSaGD21DdIJIbPDJgNhd08MRvw7bVD3FdeyHDFtmjkrGbwQkMCAXab3GNppdmWG5h62u9ZJBHScE6ljZVThA5uYtdEDxmX7FK2CLIouui%2BeTzw8vuIqA%2BtRRoY%2Fmx3lJLeukl%2FsaX1uA4RnWD%2Fqb%2FLTbU59DWUihjD6U2jAxtk0ykx8RHH5BgUOm84wiUftIXevsLLbl1vQhDTNEyxrfq44yt5FFBlpIG3bMxq%2FRFXA8%2B%2FWsZypfefP02lQ8CMiyxrHgzLHeQ3rS2ABmYTGO%2BD7rOJxYBYhVMNXx8s0GOqUBjA3%2F04XJkr353qq18zvXlul3cPiS4BCHbXVN9ULVfWGJ3pFpGozAYH2dPuQre8BLlBp1URc9NIP1OYThdLtqRQlBzIezijV5C7LrfPCWp74zRapU5xIXIHRDQIRip%2FeS5avHug37qmgsjWPPNhcqPTQVyYpJJlAW5zK4MiEdFp0icsIWg8k8gNgHsocQ6XsYRB9jz79DmgPZuQqVgsVuSjWEcFCV&X-Amz-Signature=383d4cdd0e5b67f11a8504bd2b6536d19e6227e312b8f3a28407d170b6540555&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X73JQXII%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIBNuJG6rqdfZ6YX6eHonA3uyeAe93ZamBCvOGQ%2FhoM4HAiEAyZ3NzoOeEHjsPXNOLo37oPSVQJcIR%2BP2yEXxrgm2844q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDMgOYoqtQOcN%2FgpS2SrcA%2B5PPZGQ6RHhu9mKvwcPW7ltX2r2Tqo0uUOB3npmLPjTYVOFpcurUug3phmTfRW8B5RTAcbG4OIoGXgLlgxzuA1qYDT8hF80FZso8bXWhVcvOYN5%2FTJfqWN4gmzGjt4XQaZe1%2F67i02Z2B8q%2BTx9QrDBXQQeMfOog9Jr4gIU5CuB3dHXHc5AB8xnLjEUKnTz9mN2%2F6gKeZ6JtEVKWcHR0krgGu69Ouumejad2wQ1jF8zxOgycMce4mREUPB0gcqr7fUHaq%2B6%2Ba%2FJh96LfQ93aES54qhhbqHxxArlRwgChG75RkreHHBy8gGvhkk6%2FBej8cGaWI6WgQNdAygPptZeQZ0rFQkx%2BSaGD21DdIJIbPDJgNhd08MRvw7bVD3FdeyHDFtmjkrGbwQkMCAXab3GNppdmWG5h62u9ZJBHScE6ljZVThA5uYtdEDxmX7FK2CLIouui%2BeTzw8vuIqA%2BtRRoY%2Fmx3lJLeukl%2FsaX1uA4RnWD%2Fqb%2FLTbU59DWUihjD6U2jAxtk0ykx8RHH5BgUOm84wiUftIXevsLLbl1vQhDTNEyxrfq44yt5FFBlpIG3bMxq%2FRFXA8%2B%2FWsZypfefP02lQ8CMiyxrHgzLHeQ3rS2ABmYTGO%2BD7rOJxYBYhVMNXx8s0GOqUBjA3%2F04XJkr353qq18zvXlul3cPiS4BCHbXVN9ULVfWGJ3pFpGozAYH2dPuQre8BLlBp1URc9NIP1OYThdLtqRQlBzIezijV5C7LrfPCWp74zRapU5xIXIHRDQIRip%2FeS5avHug37qmgsjWPPNhcqPTQVyYpJJlAW5zK4MiEdFp0icsIWg8k8gNgHsocQ6XsYRB9jz79DmgPZuQqVgsVuSjWEcFCV&X-Amz-Signature=5a16327dc98ac29af2a6f1487fa63d103d3ef7f8bb5e2be7388275d4f6580851&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWFRIEZ4%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDp30YI8kJbBfMRDD3ve%2BN1t7hG8iXImNDzKbe5WQApPgIgAqTyNgWzRipfY5Ki%2FHLtYIlcvueowiqKE%2BLeVAROCswq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDLqeDbvvA4DVjTvm0yrcAy29ld4j3EGNp1%2F%2B%2Belb2i5vMbEArnq7b1O421Ij4xQ9M0eCQuxOZh9hyyjHNyVQrFyvnTeVUsr9xA0eVWtYoScP9DU51HV7WG94nXLuDRgjwMppB%2B6D7JcBBEz8oto3N71yODskdTAqDuDETvT1cyoXIwexiFPh%2FRfq0Ng9HBer7OknewVpfNAXnYBPAXLEsP9fmCEZKdo4T4I5JTfNCo0f7zz%2B%2FEE0NE8WdIfFo1hS8xw0SbP0rQKYw2KEfq5wEx5hSHcOo4zRnmKl%2BlhZzvQL6xVb1yPZVx35KRmGZK5P5Jr3%2Bzr%2BCxIUDnd%2BAqxOKMzG23EjyZ13UOBTZ0dUq2s%2BQL0icSubNt%2BmFNmcb%2BjswsXGrA5LEuUpgV%2BEdK3RFCT%2BCC%2FzdGLXwzXxj%2FOLdAiYkO%2B7awPqgrnvY7ULxxWxBigykDSk47OCy%2FEJ0QoiK0vWZBa3MlkMzP3bkvhmAf7ola27aPSIRZPB%2Bn23Mpoo%2BskCXGAFlelQfTnDjqIUAYo%2F3nwWc7yMztBBinamMng3v%2BJ%2F6HIkVUQsoUORTZjCY7cFSO5pp%2FXbP5es%2FYfiMjw%2BIv8NhK3gnNS4QhcKLBgfpFtHQj1jKe9dEfxso8c8xftjBX7OJMVHKBSuMMvz8s0GOqUBxy1Uoj3X8vU%2Bs%2BrehVAHKXEB%2F%2B28SmAIaATedEQ6wtu9eTiXBf4XaE3kUoSr%2FWo9s3pdElvgsWE3ZIK41MnJt0Ofl5t2LscMLuttZ6D3f%2Blk7aQZdVLGJcrHNgp4hjbXvQzISn%2FCLlXz15qCdmIKltR5EkKWcZ7KoQ2ECWgQlffeq%2BBaLshxDWJCGU3aVfiqGRtwqw0OnUyHk3tjy0BDhjVYz%2BLD&X-Amz-Signature=c21466d38e97792ba056440499397049685b3505a2309235c8cd6ce20c1fa88d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T57M32EU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCqIoIMNhTL5o9sRMDwahv57bpqXJjvE6PADKj97oDyMAIhAMqCKONf%2FXTnL2HHBs1RwuZvZ6btPhK00OFF7UOX7LJtKv8DCCwQABoMNjM3NDIzMTgzODA1Igw%2FI%2F327fk%2Fo94X1YMq3AOWTjRXOME3LNQinwechcioodLswCIYCCl6qtd1uz5SfDhcTWpdsOlnsS471a%2Fx4WzcXv3TGvsSQ9J02kYp4K5JI87o1zdOKS%2Bnm8wr6P4OoLhhZSlblWegyEMjNkrwHYwfCiIwA%2BdNs7yvRtlLj9taIZMujL84PZgh0DQN3Y0vpVnVGBmKdIeaEBKQsEi%2Fu0RwkRk0uMsBI7FqO2PWPwE0yN6nCUJfj3mLaaiSrohWFvCSr2SciV0WvWxM%2BQfdPak0xoCE5U%2BrhPXPHsyoylD%2F%2Fi9imrHy%2B6qNVGW4jymuWyf%2BEybMneMjueFnnkcBb%2BF%2FErUsOWb8sTaet6EASbAQ6G5kOJiIVtja2VklkQodVk5Y1z1SW3oQsRqpP9oO1ANUVhXhWH%2FBcYTzPdbnZqCjhBmAFFGTIsuLufdoENfgGLApha2XAV9dFWoRnBn47PPT45ArLVExwul6ZkoNvvGn7FhsWtshHtiG86L5FJXBZayp%2BTk%2FlBUuAIObCauV4DvO78QeNG1NKn3UaO0iNf1Bw3vJb78vWQtFo1YqSsBdTYDqOVQ9YZFeQVc1hAEn%2FQRXxzQDnNU4kThmIBBnAwZrGZjzpMEuycWkWkJ5FHvcemQ1gvxTbc%2Fiz3Ys0zC19PLNBjqkATe9y9FLbdMHEk%2FlSmL6x7JQu39%2BBPftAR8WNMCGUEERzbGsnhupWH5QMg3gk6DdKRC1q61EJmPwcRvbGZ5JwvU85ah57v8CGbGl6AGbFZWiK7%2B3%2BDXjy8U5oGvaMI54Bn3mQPbrC%2F%2FnUJ7OVkdRRpwlPXiq3LeCDGZ0qSr023k9CrYVBb%2FoGjK3EgoxtZhd%2Ff%2FeGTwpjDO36UTEihzPyZ8aeny%2F&X-Amz-Signature=ad14362d5b79c59a4a5b4c2e06f4666037e434491915533f3f8e81642ede602c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLUYESWT%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIEyOApt5IndwwH4jW%2BmhdTj3%2F6G8l2T7GMgprtrPy4lxAiEAxT3%2FBbFvnXtxD6WamvE6x7aVqzez0KSxPqsRgQ80lQsq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCZdV%2Fi2JEQGFxyo4yrcA2FveMTh4JcE2Xsj2k3rq7J2C0nEElykzhhauY6rD4ifrRutAzhuwgfFKrcqx%2F6%2FCzi%2FpflY7LUnZGgyFxpsgbYNkHfg1IQbDpUcYGQX8uWvM2OrholH5u9VS%2BiJx5OflD0car5JkfiriRhCTMj0nS0yJ3Y%2FEhoDDYukGgSF9F0rsc9SZVIO1ccGfa8uhgDFjtBfxbPVeaYTyD%2Fm4VqgM2e8GWpk2HrYwTilGrB7zUE4SzOAWOUnw%2Fy8xVItNbQw3JXKdDvhlYwQynSP3y1YTkfEw%2FgVKwM2A%2FzlqoIMljoMX1T%2FEK2O%2FHjRcWACqvniE%2BulWAaTqdtosjMnQjVilRacGHBh3qF6V0soBioAwhYIcb58JzibMxKoRA2IVKGK3A3rSkiN1E7xBcOLfF2KfkmJ90SGiXgWiCuraBT7QsD2s0OcQ0nmO%2F7R8Z15rde1vuku8pB%2FfrZ8Kj4XR5P0S1C6g5u4Npe9Y7OVS0rx4%2FA2sVxEBl1FF2K%2Fd51iptyszMLIU8ibM%2FdxMV8362Qk3dyEkZ3oU5gEbcAL%2F7OQfNmc7Nq97SK7FUj42vkNOAndoNwrj7QiBAtAdRv1RJxnBy8aBRrOAYQYwT2gLuM3epVjgv70ahsim8GXPvuJMIX08s0GOqUBf4PZk5Au1Y2s97HYMXp1ryXuBWKiPWzeFz5e0GpAJKDfFhcsfMdNRaXlK2uqtRjbPT7foRl81kTb7XOpqDGUCWtYFO1562WMt0IWmLaXDbTdIm8FkSJIUUEn5eOdFn7Oc%2FSHHvznovA4PjbnPAXhi8wedFzsm3D3msvxUSQ9b35az6p9aMpNavgjbydBXtTtmAPa3HztEmlqIRxBZBRZ7g6MfhGe&X-Amz-Signature=071baa77386d1e0ea11ea3d15f0b218e9eda6c595b4cb385fb2988dc2ca3ac63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJJ7SABI%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIEF8etK1okIFgPvqjhi%2Fg%2FJ%2B7lDzb%2BPj14NR17x8YekvAiEAsc%2FuPPIukotQBtgPyuNc14j%2Fo%2F0oI%2F%2FDN%2FSQLVC7WvYq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDJIhG2g0ZTrtzjz%2BXSrcA0%2FhslYaSHhRvHqbMrQqfYMB9hFmL7c%2FM9ij66GQ415I1wf0%2BU1pNQk%2Frg8zTivwxSuHRaN8I9Q0d8obfAH8XSmEGYi%2FtSzUZkosCEs996rp3tggvUoVETIDwZtBOYp78qY5yp17I4Al%2FJEITZOWKT5wIEZqXUH8XLqgdrJf3ZJCFaz9Ps1b09hUmFDTVAJkPLxdr%2Bu4T9YQUopygdvu0VuBQB3sIbPEaJW9Wx%2BYDZkgc%2Blf8W9Jf52dd9GA7qnKPbx7xbnJV5%2Fhjc98V%2BFs4w3hjl77dONaewq1Vpgnye2wVhLsL19mU%2BbroE%2BYKG0LON3InB%2FxwfZwfuWrMq2LplVKrTCjpjYJ89YBxdqmcdG4Wug4H8VuFBRWhtMypw7attVeqH9bbbZ9Q1E%2FlKcJZboCsxcvHqvivrygNqLjy%2FzLfOm5YZlqcdPPHQssZ2BMeo%2BJknrOeWRivkAdwYqaqGo16G4y71dWwYbOKJQyN0Gf6D95T%2F%2FDKsw5%2FH3yTZYcNDmGQMw5pJJtErjf4d70a5eIG1eSuIsL2LnLduXvqdsp9uVaAvNzTYEJkkEtbZVrc2auHcLqKzVKFAl6eOJlyOjxUuq3bbt56hazGJE23u1Vy6aiK5EMiB%2FHp9FQMJD08s0GOqUB9ImNABm2WtY49LXN4fmu3G%2B6TV6wtrLCYn0pzeNyXz7nyvXcMMrd%2FXrE39iDnR5YcCSjFkmabEJgB9FPIZ2QQ5MarmTovs71xei1TaQccgbvSC4JxmEOI6cMdK6YkGjFAP%2BHcQBa9nTy83UpvAi62cL0HLgqwUeszAeqn1ivOnmLxnfUIB9R37jpQ46R6g0wCkrOSr1sZjyT9os4AL6gyCexaAoC&X-Amz-Signature=ee6343a12dbf0ca8301e6b77e75fa44252cdc433f1cb3c085dae27fdaf5f1580&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJJ7SABI%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIEF8etK1okIFgPvqjhi%2Fg%2FJ%2B7lDzb%2BPj14NR17x8YekvAiEAsc%2FuPPIukotQBtgPyuNc14j%2Fo%2F0oI%2F%2FDN%2FSQLVC7WvYq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDJIhG2g0ZTrtzjz%2BXSrcA0%2FhslYaSHhRvHqbMrQqfYMB9hFmL7c%2FM9ij66GQ415I1wf0%2BU1pNQk%2Frg8zTivwxSuHRaN8I9Q0d8obfAH8XSmEGYi%2FtSzUZkosCEs996rp3tggvUoVETIDwZtBOYp78qY5yp17I4Al%2FJEITZOWKT5wIEZqXUH8XLqgdrJf3ZJCFaz9Ps1b09hUmFDTVAJkPLxdr%2Bu4T9YQUopygdvu0VuBQB3sIbPEaJW9Wx%2BYDZkgc%2Blf8W9Jf52dd9GA7qnKPbx7xbnJV5%2Fhjc98V%2BFs4w3hjl77dONaewq1Vpgnye2wVhLsL19mU%2BbroE%2BYKG0LON3InB%2FxwfZwfuWrMq2LplVKrTCjpjYJ89YBxdqmcdG4Wug4H8VuFBRWhtMypw7attVeqH9bbbZ9Q1E%2FlKcJZboCsxcvHqvivrygNqLjy%2FzLfOm5YZlqcdPPHQssZ2BMeo%2BJknrOeWRivkAdwYqaqGo16G4y71dWwYbOKJQyN0Gf6D95T%2F%2FDKsw5%2FH3yTZYcNDmGQMw5pJJtErjf4d70a5eIG1eSuIsL2LnLduXvqdsp9uVaAvNzTYEJkkEtbZVrc2auHcLqKzVKFAl6eOJlyOjxUuq3bbt56hazGJE23u1Vy6aiK5EMiB%2FHp9FQMJD08s0GOqUB9ImNABm2WtY49LXN4fmu3G%2B6TV6wtrLCYn0pzeNyXz7nyvXcMMrd%2FXrE39iDnR5YcCSjFkmabEJgB9FPIZ2QQ5MarmTovs71xei1TaQccgbvSC4JxmEOI6cMdK6YkGjFAP%2BHcQBa9nTy83UpvAi62cL0HLgqwUeszAeqn1ivOnmLxnfUIB9R37jpQ46R6g0wCkrOSr1sZjyT9os4AL6gyCexaAoC&X-Amz-Signature=105822129a326ccfcd5ad1af0efe2b0a6dfb3cd6859d04d673f903f8b658c9bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645NKJJJ5%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032605Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDPMusJtZwTelwvRARNQ2rl6SmZCsPoYPLliA9P5QkQRQIgImDHxRf%2FF3AOYxLnCVWi6VC9w4NmNPnb8LcFNLavQ2wq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDIXeE4cjEqIk5O7MCircAy%2FCNy%2FihCW9tLZzk5l71HQYCF0br%2F%2BqMbOQ5WNNAmKVe8Q%2BkXYiMn4gnmTuWm6%2Bg2GCspwEpRGF1CVXPVRD05bWyb2596aRNPFvUYyOYd4E%2BikVBhGi3JqwcB2XCio2yE%2BBBQhNUlLWVQtsm1vGaERdRk1HW4koVkdWhCYwE2Tb5gdxf5ZZ4yGs0vuQTsaQOTet6i3A9lNy%2B%2Boq4miQwYSRAEP3BRAlBZBlabOxgLpn26nTln3mU3SK%2B4K3y4owM%2FJWHNoPFN52rzFsG8Ar22sZH6Jyel1%2FihB60ryMVAvkXwFRypy6si0yv7nHXaMlYWHPFtYqApXwIaxF%2BHChI8WImxruAkxVX1hIbz8g11sZOp866qqc7m%2FGPOiX2HnsXvhsAcZT%2F55UmRXy0L6CzVxtN%2B69fShPO7Rid90cXnmTeknOTcftpdTKS0%2FUYZv%2ByJKnvPV1BSTAMCrF6zZKLll4%2Bb9a1aEQjkNNeOXWkCXOjtx41sqem7btq1haxJHYh%2F4W871tGm7Pd485r%2FvjaCTJjI%2B2IkWbTXynfaOH3%2BujN6o8g2MK4r1fcOvkBE82PwrxYZjb%2BVk4FGUquvMhCziv4xJU3H%2B7NnBjqXltGwHXOkJpL06B%2FeM12VH4MNPx8s0GOqUBOg2kGYDteBGNUljtikxkJt7WQU%2FbXk03dAccS3TynhqeZ8XHBw%2Fm47N6mL%2BJvo5Q9b24adjDale1Dq7UVvaDdV2ss2WmjasTLQJY5dGMNiuYqeJx9vVFdJLbE8crWN5coYw2JOjtU%2FUK%2BWQGjJAVScq0ThASpgZV6QPMPeHthETJANoEZCn3jSN9ZK1gVQ9vO%2BiqE4TuKl4U6njWqHjF281EDC%2BD&X-Amz-Signature=cf8eee91f6e205dc4e7d0c0f02de64d5059cbf41e5675f753c93dfaca6fa92ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667E7KQY4V%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQD7si1C6jFhy7KJN%2FkQSZQzhR5uSvMqCdLRlbokp7%2FHCgIgH4IAFCOi%2Fs7Obs3Uoo%2FO8gC3EBwQNsic77HXrfRkSegq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDI92Ge23MIlkuN20FyrcA0xX88uE9gBu3X3a5A9EHaYIIq%2BlKb6s0B6tgsIBcIfKMxHNJqZVwBstQ6AR2jQlJI8BR5aE5%2BzSs5B5XP7Ua28C2fWxxOBLAdlni59DgZvjwnOPmH8lCJgQ9vYwffE%2BqdJ%2Bg0yy7PoH4SHzAjcsfXk66Z6eiuRLzCSfn4M6r6TjXilLl0mDeDZ7FTWFenHJdZQPgDQ%2FMvzQFYLUVZbsh1rT9cZ8g7nKPDWqKOQXDqvhIBOtU4gRx8FnJQfVR8BgholpPFRHRx%2BtxTfkUT3YKJAp%2BnPIheuaV4%2F1G3%2FBloMK1DxJ7Q9fUmsmYiEN8uHYlh0dAyE%2BuTVX6uF2ZQt%2B%2Fz1EOYvm1s5tcPPYTLm4O7YFu%2FBKBtNMYTOnPHkZNC85zNYRMyGaee8yCYGPYHvEETRHKigFVLbTQRWsAHH2Uib%2BgFCXuIHIzbjuQtY%2BZWuZ7dy8ZrKNVb4wgFI1qleBmBSSuzh23bNZy8vdwDRWaFmE%2FihwvsCja%2BTphrBsWLZom3fem4lc74UhO1OhjfNiDM6TIY2GCQdAbqlHrJxTJHAnOc1XFzA2EmRe6irihOu8Z4mQefnlbdnc6G9iZI5ZIVtq0jwvI%2BPgoPEiyVslNmPPAeiSAHMBYgNXeRgPMOXy8s0GOqUBBuXHiQmr6zb7H4UGa%2FgWaVhBYKk%2FGXiz8qHmyP5Ygr5LikNyi8F3RLhEaJGjCO4Z91LRSWwlIQD%2B3ULoRdpxtBP1HRCoNHeO%2BZ%2F%2BmSa2BXKJQFHPCJBNpZjgttLIqKqYfWcBDX%2BfurK2TEA%2BeRbF9MzNzp1T9U%2FDkK2U60au6lt7SPZ9ahn5VNA7dog6zaG%2Fqc%2BWysMQxPIAxbYxNUAOyYZ%2BKxAz&X-Amz-Signature=c3ce112925e2b4a3944db74aa7172042410b0bc4baa37db3b3084155e3e732ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667E7KQY4V%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQD7si1C6jFhy7KJN%2FkQSZQzhR5uSvMqCdLRlbokp7%2FHCgIgH4IAFCOi%2Fs7Obs3Uoo%2FO8gC3EBwQNsic77HXrfRkSegq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDI92Ge23MIlkuN20FyrcA0xX88uE9gBu3X3a5A9EHaYIIq%2BlKb6s0B6tgsIBcIfKMxHNJqZVwBstQ6AR2jQlJI8BR5aE5%2BzSs5B5XP7Ua28C2fWxxOBLAdlni59DgZvjwnOPmH8lCJgQ9vYwffE%2BqdJ%2Bg0yy7PoH4SHzAjcsfXk66Z6eiuRLzCSfn4M6r6TjXilLl0mDeDZ7FTWFenHJdZQPgDQ%2FMvzQFYLUVZbsh1rT9cZ8g7nKPDWqKOQXDqvhIBOtU4gRx8FnJQfVR8BgholpPFRHRx%2BtxTfkUT3YKJAp%2BnPIheuaV4%2F1G3%2FBloMK1DxJ7Q9fUmsmYiEN8uHYlh0dAyE%2BuTVX6uF2ZQt%2B%2Fz1EOYvm1s5tcPPYTLm4O7YFu%2FBKBtNMYTOnPHkZNC85zNYRMyGaee8yCYGPYHvEETRHKigFVLbTQRWsAHH2Uib%2BgFCXuIHIzbjuQtY%2BZWuZ7dy8ZrKNVb4wgFI1qleBmBSSuzh23bNZy8vdwDRWaFmE%2FihwvsCja%2BTphrBsWLZom3fem4lc74UhO1OhjfNiDM6TIY2GCQdAbqlHrJxTJHAnOc1XFzA2EmRe6irihOu8Z4mQefnlbdnc6G9iZI5ZIVtq0jwvI%2BPgoPEiyVslNmPPAeiSAHMBYgNXeRgPMOXy8s0GOqUBBuXHiQmr6zb7H4UGa%2FgWaVhBYKk%2FGXiz8qHmyP5Ygr5LikNyi8F3RLhEaJGjCO4Z91LRSWwlIQD%2B3ULoRdpxtBP1HRCoNHeO%2BZ%2F%2BmSa2BXKJQFHPCJBNpZjgttLIqKqYfWcBDX%2BfurK2TEA%2BeRbF9MzNzp1T9U%2FDkK2U60au6lt7SPZ9ahn5VNA7dog6zaG%2Fqc%2BWysMQxPIAxbYxNUAOyYZ%2BKxAz&X-Amz-Signature=c3ce112925e2b4a3944db74aa7172042410b0bc4baa37db3b3084155e3e732ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647YUWEUX%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T032617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCICWX5ToEIHwa22DdfceGQ16mGITte4IKbsVkk2Lzgf4AAiEAjvMUpmRFe%2B%2ByQmoLAZXZnN68zeVEjb2oEuQJ2HB8wDAq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDHGwYoHqCuastjdpySrcA4%2FDWSbx9rOVWi7N2hLZkS6rcuP8FYu869uZ2ri7ok2jEB90V913mNVjQwrkpHMLxrBl3%2FjgcIK%2FFOM2Wp3u%2B0aOi7pWZntheFp5QFWG%2BGUzmnwnuf7npiQ6J8I%2Flm8FDTW%2B%2F%2B7zj7fba3jqaXUrpUeAv5qR2DoRHx85WFQ5IV4Q4stUJJlrHEWjSVkjWkLOFJeZU7ID8u%2FNqbgQdu%2FLPUTDTmbX%2FKMrYdYM4h%2BFSV2XxVlqGaHxcrVy9bf%2BY2zRlqKIG0I56hADqLhRQD2t34rldv04j4ZUZr8JmIEwmP1WN0H3RCktRUzG2MHP3Yb6a1J1BkKFILS2UMNju7tDlNFuFA6Deg4wYlyzSnxps5al5dXM9BY1%2FiHE%2FezEYZm3sXaOExAPzYxyXvVjbGiWXLwYZhGl9VhpKOYyyI5z%2BF3w%2FZyvmDgH65UB9%2Bx59S2IXoLCMlqOojfvqxrCq8nflpwUZP2oQ80SfMS3uM9OeE5qyiUDlaUEOxV9Hh0ZOaiPoCcevLS2JC8MO4fi29J8aFI4v4HEYeLfOHoYY1jNCgscyiytCQP%2FI1Vi%2BEK87khXY3AA3gNevodcLXiq7tLqLNINi%2BjF9r2kz1V7O9Y4RklauA%2BfEA8cJe5n1HBiMIH88s0GOqUBm4GeBzlJSmtHVWicy1%2FmvDdd%2FAXb2hffnUZbfYrYhWZQRxxJEa%2BRmPv0wSNCnxgGzmzpIkgqJBrcf9OLjiDmLyHRTfBoTN1VdO5ILmaHOiuFnrXj0H4HtHAhLw8oGwyUkl09qQ%2FgxyC%2B4Q2XwnSugLvBtvlR%2FRGp9KkheixRPHns%2BB9eKHPs7obCZtqlAOOmBiiwWG6zuECFGG4fLdXjAAM4%2FcKp&X-Amz-Signature=fa7314af9a2554e6caeb0724af549326d81673411bd3e8f53e6712d8cace3ef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

