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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BCXGJG7%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCrxn1YH45Ypc9Lt06q67K%2BdMRcT06yqQgv0om4IvbWKwIgKQt%2BJjBxjwDcw8WNylSGXVV8zDwBvmECGqXyV8O2dF4q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDBEmewV%2Fa%2BYX1gIaIyrcA2P%2BntyCXRkzd5ASoVyDTJnefY4EmJ%2B9u7u11dqBHAlNXKZ86sI3ocSQMI536E3pYEEXHARRPdMgYr9JY5o2d7Oh6CxRbYpl%2F%2BKotvvu7jIHcsBW0rupWziIlY1w2KWq0jfbW5PRg2Xum9HHym9s6Wa8uIaN1M3QQ4ZX5DKmcoKTDh18eCzoBfXzOz2qJq6Bh1kMX3RSs5mmPTvznBH5jTfXVOdI4IlfXN64P1n7DevyS%2F9Se%2BTiEegAr%2FOOtkd996JVALJ%2BzV9nt8BqnwtkI6Hd5vLVlTE0J9kfHuSpjoe1yEG%2BaS8WvUF%2BxuzkF%2FF%2FU9au9wSYEt9i%2BfMcVm%2Fkkn0Vyo5SPZZ53LZ95flJ66T%2FBH2nCnze7rSBPO2a44jyIc2DSREXC1UxPgr8506IFQwG8Qv4LkzdcZu%2B5X1iwUngk%2BLfMDQ7AF4n8oaJR%2FVEQv%2BDR7GTj2jNE%2BcJ%2BDsVJufuxjLSiRsasKDCaV99TBMK97SxDGRj3WB9v%2FR%2F5qW1g2lrG8G5NHYZea5gvBF930HxQ3OMfSImL8BTUZuPyE3c6EpmyQduWYIC4fcVUiigMCXafSBVwWfmPCpPs2qi8wS8GAbnOhiATnP1Z2qrwlF4cEBvgQCCtp5v5GQ%2BMLOqz8wGOqUB6Uehc8lB0clhRANQi3sC0XmKpkL6jTT3P%2BlkyXil4Gd67lGPh9WrpLyGtqSJGETWWXrzL8SAe6W87YYDpTqe3Rn9%2Fo%2F7dtcrfe6%2FOsX7G4mB%2FICzlvKg27nlULK6nnXSGsMnLnR91U0QiSNoP9Q3aGIcMOHp1woVfujIcPr4iJR3f6nvWO7HtdmsTiFKSXjCfmULnR1YiEN4nq4SKDRMien8OAcF&X-Amz-Signature=cda46a33c8f26dfe2f11861f0a47aa7033f0dffd91935f632fb89b3d0cfe5d12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BCXGJG7%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCrxn1YH45Ypc9Lt06q67K%2BdMRcT06yqQgv0om4IvbWKwIgKQt%2BJjBxjwDcw8WNylSGXVV8zDwBvmECGqXyV8O2dF4q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDBEmewV%2Fa%2BYX1gIaIyrcA2P%2BntyCXRkzd5ASoVyDTJnefY4EmJ%2B9u7u11dqBHAlNXKZ86sI3ocSQMI536E3pYEEXHARRPdMgYr9JY5o2d7Oh6CxRbYpl%2F%2BKotvvu7jIHcsBW0rupWziIlY1w2KWq0jfbW5PRg2Xum9HHym9s6Wa8uIaN1M3QQ4ZX5DKmcoKTDh18eCzoBfXzOz2qJq6Bh1kMX3RSs5mmPTvznBH5jTfXVOdI4IlfXN64P1n7DevyS%2F9Se%2BTiEegAr%2FOOtkd996JVALJ%2BzV9nt8BqnwtkI6Hd5vLVlTE0J9kfHuSpjoe1yEG%2BaS8WvUF%2BxuzkF%2FF%2FU9au9wSYEt9i%2BfMcVm%2Fkkn0Vyo5SPZZ53LZ95flJ66T%2FBH2nCnze7rSBPO2a44jyIc2DSREXC1UxPgr8506IFQwG8Qv4LkzdcZu%2B5X1iwUngk%2BLfMDQ7AF4n8oaJR%2FVEQv%2BDR7GTj2jNE%2BcJ%2BDsVJufuxjLSiRsasKDCaV99TBMK97SxDGRj3WB9v%2FR%2F5qW1g2lrG8G5NHYZea5gvBF930HxQ3OMfSImL8BTUZuPyE3c6EpmyQduWYIC4fcVUiigMCXafSBVwWfmPCpPs2qi8wS8GAbnOhiATnP1Z2qrwlF4cEBvgQCCtp5v5GQ%2BMLOqz8wGOqUB6Uehc8lB0clhRANQi3sC0XmKpkL6jTT3P%2BlkyXil4Gd67lGPh9WrpLyGtqSJGETWWXrzL8SAe6W87YYDpTqe3Rn9%2Fo%2F7dtcrfe6%2FOsX7G4mB%2FICzlvKg27nlULK6nnXSGsMnLnR91U0QiSNoP9Q3aGIcMOHp1woVfujIcPr4iJR3f6nvWO7HtdmsTiFKSXjCfmULnR1YiEN4nq4SKDRMien8OAcF&X-Amz-Signature=cda46a33c8f26dfe2f11861f0a47aa7033f0dffd91935f632fb89b3d0cfe5d12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJLFWC7H%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDcvvrQVDATwR1F%2F2AaC1L%2FTHwDIl5zi0B1jES%2BI56LbQIhAIRjyUNDdyEDfUvUZw1J73m7wqUmO71oYvfd7aqj%2BJXmKv8DCEQQABoMNjM3NDIzMTgzODA1Igz46Cp9d4Zj9LlV9vAq3AMq0i6e0rsQqr8KzMjad4lnXntKmNxMUc0KkHHQgyCjAiov5zypawRdxFW1zUOIh%2FcfGJhy3EJUdDTg2aSmZ6spfhzD8r3Yu%2FPsrhU7y6yAp6joLkJ3oAx80930d7Yfc%2BiThvezRTR9nk%2Bk1SMevIy9n12UMwvqfT4yJ5XD3z2CL0rkgzWOexpX4II1L3g4R5G%2B55f8z5G232KTgZ3av2XTudrmpTMiR5TlMzr7WSu9E0%2B6OtjBedX3Zh2oGT8HEV61zZyuhhFmSIst1BAJrNXRcSpXPodNeOSKSIysEtofXi9BhGhAylAMpA%2B0ykJ3no3cv2Zhr6CBreBvKDTvoSgIdJcbvqOV3jDJzW0NOpX0pMtZW%2BwhBeh%2BucIEGOUp5kuk0tvsETnI7QgenwvFlGNdvoWisGwGdUFclVG8VnUzzFDc48MU9SK%2Fu9Jj9KkxRYD8VTWDz%2FZG6k1VwkX%2Fufer4wCwY1IeE5UjgnHfQK9sfUNUzY2nDQAkyiUDvS5OMpIZij5%2BkIlVDxYa7NlJGJz5oYv2FfkZV5wpTJhcxmGsa2TCwQHGDj45YNsBtsFx7ghaHj9QXaMgIjo2KSuAodD8MoTggAEQ4lgc3j0raCsH87Iglv1h7mYzVjwDkzC9qs%2FMBjqkATMj0n%2FKtyV%2BnI9Ucv%2BVSuQT2SJaKV6IGPscKI9elDXUR0%2BuE5yZ5WYbox7R7bcOtdVQxUGBgSs5ei%2FUfr%2F7Q7ONF%2BkfbynHBASTXrEOyfNTOPybqxvJQ23Lttomw%2BXMmCMQa2AtOSW%2FX9b8ULZq8hbSWoeSajzGGtQfYEVl%2FwdVtwdtHwD8z1ESDcPPdPvYGDStB%2Bb4EE09JmU844d%2B1QD7c1h7&X-Amz-Signature=b8bcbaa17982768269634e0c295a3b48b6e13abe912d9d1666c38cd73a2c4de9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657W2O6JX%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICCzm6Bf2NlXs3x5%2BLrC5%2B5WQxOYv4Cgsy20ABSJol7%2BAiEAsq6u7Qcv4ntplTjDkJ9%2B20Kbw11WAuRVIHOJiU22cFgq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDEdNiKV9qQ1R23zSyircAw%2BXiQo3PAFEcX6xFpDjyZvxWjKrZUO9NaoifZswgOjryZTiKxrzTUwWlqua8ZEHZBY86udKJFlplw3asVXL0AXF%2BM2jrZtwzl9aIh16tLQMc%2Bg4JTr9%2BO2yZQSRUbxgOiQRnuJH0hL%2BzJcHS8NbmYGDSq%2BP9iWzgURsWX66Q1FCR0G0OxGk%2BcEn7JNOscyDbPUnXHAlaYv94FTOH7tzjr88ygSgWaxfXpEs%2FN3Z2UNG92a7PBMB2aZWhJ6vfZkpKJcx5yyWNnXp17oMjyP9hIA1HsITNk%2FH1i5AsVYd1jQH5dunS6aJhONPfdbPqPKj3auu4q51414Y2L%2FELehiSrAZR%2B6CMNvHrqQFUYcXf%2FQrrj95rgywm%2BjBhvywgmWanMY%2FIkzBLja6Z3X32a1d6fjQapUy%2F3n350W%2BmpT9EYSVLSczf%2BMhusYJ%2Fi8Agkw74Ys7uWX%2BBnaTuvckIXbQudtAVr5MNYBTTnBgK7ojVHf3a4xGHFgfur1QnanweeW0a66QkX0A5UivYl3JdK0QIgENxxmLp3QYU%2FiurO6dZWHcbs5%2B53lr4NIVw8vfGzQn8c%2FGx5XBo4C7nNgndmAOcCiQDxg3%2Ftz9PNYGtOqfIsov2Vw9hhLbGDCfKNs%2FMOSrz8wGOqUBMhF3cY53hFNg9sHODRXNoVQDsQeR0kBn9HZH%2FmSimjMDtdopZUgWAOTr7PSFgZK7yNoqxoT4aNnIKZI4OUDgxd5wPr2tgksmaUGBD6xCEzonmvo8AG6%2FYZN%2BYWvi1AQw6aQmp3HrNagkMlf%2FX0pyQVcizMKlpkaLCZt43A4enTkBFU5R249dAGmtTssDZC6ddR1M5CrKES0WWqeU%2B5Sij%2Bmxbnyj&X-Amz-Signature=1c2eab6b3103acaef03cd558c312dc8d91ee598803c25f8bb57867374501514e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657W2O6JX%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICCzm6Bf2NlXs3x5%2BLrC5%2B5WQxOYv4Cgsy20ABSJol7%2BAiEAsq6u7Qcv4ntplTjDkJ9%2B20Kbw11WAuRVIHOJiU22cFgq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDEdNiKV9qQ1R23zSyircAw%2BXiQo3PAFEcX6xFpDjyZvxWjKrZUO9NaoifZswgOjryZTiKxrzTUwWlqua8ZEHZBY86udKJFlplw3asVXL0AXF%2BM2jrZtwzl9aIh16tLQMc%2Bg4JTr9%2BO2yZQSRUbxgOiQRnuJH0hL%2BzJcHS8NbmYGDSq%2BP9iWzgURsWX66Q1FCR0G0OxGk%2BcEn7JNOscyDbPUnXHAlaYv94FTOH7tzjr88ygSgWaxfXpEs%2FN3Z2UNG92a7PBMB2aZWhJ6vfZkpKJcx5yyWNnXp17oMjyP9hIA1HsITNk%2FH1i5AsVYd1jQH5dunS6aJhONPfdbPqPKj3auu4q51414Y2L%2FELehiSrAZR%2B6CMNvHrqQFUYcXf%2FQrrj95rgywm%2BjBhvywgmWanMY%2FIkzBLja6Z3X32a1d6fjQapUy%2F3n350W%2BmpT9EYSVLSczf%2BMhusYJ%2Fi8Agkw74Ys7uWX%2BBnaTuvckIXbQudtAVr5MNYBTTnBgK7ojVHf3a4xGHFgfur1QnanweeW0a66QkX0A5UivYl3JdK0QIgENxxmLp3QYU%2FiurO6dZWHcbs5%2B53lr4NIVw8vfGzQn8c%2FGx5XBo4C7nNgndmAOcCiQDxg3%2Ftz9PNYGtOqfIsov2Vw9hhLbGDCfKNs%2FMOSrz8wGOqUBMhF3cY53hFNg9sHODRXNoVQDsQeR0kBn9HZH%2FmSimjMDtdopZUgWAOTr7PSFgZK7yNoqxoT4aNnIKZI4OUDgxd5wPr2tgksmaUGBD6xCEzonmvo8AG6%2FYZN%2BYWvi1AQw6aQmp3HrNagkMlf%2FX0pyQVcizMKlpkaLCZt43A4enTkBFU5R249dAGmtTssDZC6ddR1M5CrKES0WWqeU%2B5Sij%2Bmxbnyj&X-Amz-Signature=052519e77d13848f88eee0614d6ee04636e59eea92f61f2b7f5b5d3599bc40ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJGV2HUJ%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIBHgInUk%2FPfHj69NPap1XN04sUCDgM005nijdD%2BmBbz5AiEAtplC%2BJxdX61lfOo3VjBS7MHVVxFCU3xfo%2F%2B77tO20Kcq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDMit5tRenktKfhrC2ircA9YeNM41Uxnp6hK1BM%2Bd8M8%2BLgBqxeMudOASL%2FkC%2FjlNztu2f39ZQPv1SuXr99E9pERfZnQoxGeffb01PJFtuU9GtqZ3SMMKkkd4IU9GzR7FCbHvPn6gwjSC1IoOx1K0pzXjrCO7ZfvktReLyb5Nhf5KwvmYBIMwX1QtDaVdbfxdQunqrnRuu5cKR49nFDoWVAwCjVtlcIQcuSsUhVdSvT2LD8psifukQNBd2jqagPlqoll6twMmAjG2ocksCbfLOLxOo%2ByMBuUX8xlg%2F6bOFr8CsEHTGdECmCI9QJT9jxmbk0n7v3IzL2ZsZ9BGsZyQxiR%2B%2FYmCpUXPmwdO6o2lvIF%2FXNF1TYtSBhvuSuiJjp%2Bfg07tAZ21K%2FzO0ziMlvtrM7w%2FC4sGCZhnywkRUJRcWcuGy1bV%2FmY4mHEcynjQPisUtIKH03BMCXOg%2B%2FXDCtz9ekF782NNp2eDWaZV369xpUMRmwBKIxorC8xfDnpiNvLsEEFRB4XYkb1V9jXdQMBeekN%2ByHE4E522VYPN%2Fy0kWxt88lqLL40Pq%2Bdszjykhp9xsj165t8xAmGkoZIyUp9ISiFtbO8IB8fXPHBz9BuOgwuV0p0x60u1m0%2BHP%2FbuKGIps1rTkHtAPo3yO5R3MLWqz8wGOqUBOb0IXTstpciMPpzAus2XSrAgUkq3b1btRmuU1ukdPHuu68IbVfdZfPGOiHbld7FFpoP58C4az3SdSJU46XS58I6j%2FDfNCGiLScFdCCUTvyu3e%2FJ9oEXC0zVOQQJC1m%2BzZoacr8lFngTQe6ExpWxjDBUZ586iGGe10wM2Fn6KoQJCqMmH0Gkv88yjfj08VT%2FG8gwamAhQ5TZxW89aiARYJIL1XqiX&X-Amz-Signature=d98e64921c58df65de3dfa331cdc005f17253762a1296bc653c648ce12c92e3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCL45DJN%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCIiqOahKUnGmmVpwjl7mXxvuqk2Fa2Og%2FpvNQkbXNFewIgAg3wRuDrBUGALYNLO%2FsasqT214TpVDqECJZntnMcA7gq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDEf%2B9MIn5Tcml9jaOSrcAxSWqp1ueI3r1twzTKIeju1r7N2A0utDUJhcLAw5mBI90j%2FAaTcUD7dMhDE1JGl%2F1B2NIb3BCnQ19Igp9baQt6TrGV8NRI0YKz5lwE7pebJ0UKt68XcP1Z%2FHWJD2QscKCaC742T5UQM8V96RZ%2FENsQQasmE7rtcEGasYwTuynadxzDyF7noura1LSzmzT0FgLxLC9p8LhbWmVOYny32t1eTmz%2FeQQoarZ26W5gEqbB6tDOMHTn%2B1i9wLoc%2Bw5Q3dMVFkAoyk8ezITFgp7PhMmbTubxmdJfwt91wlFcXhVyNNKREcX9L1%2BEmd9A%2FSrl4LKhMTHCU7KgzETHER7bS2mEXpjw9urAwNGsrpKb0%2F3IK20YiIAdrbIiEtnJlHqg21hkML1Q56QDZNFYBY7ZWWCYxBNe7CrBX%2BkQMg7D7AzIDYC%2BvABXciXMFQXjneL2IoSqSrac2j6jwlkaGC%2FOOKauQichuZHHXIAZCUQcNOzvg%2Fh0Q1UhCUhTyflo1SU4pjEMeB1iJPC1bnUfBSOdoqcA4K43ttKZKUcoC3deefwwpGnD6byHLPCGzh54EjwPWNrVRi91oI3SF9qKxYVExEGoO2sfwAiWPswl2nG9Kq%2FsvJ%2ByA9t759JJ92bgp8MOmqz8wGOqUBM636jW%2F5AnZ9zLaTlbLGNlEE6Bfx8qySakbfTT%2B%2Bo7%2BbiPG7Z97YNL0SkiTO70Cx8Qb%2F6mUwq2h7%2BSFZYxU0xzaqEqM4xIUGpZAPLXoJlIMngqPxlVwUBql9hZ7KeKm14KP65F1BEgeWmN%2ByR39h%2BCMptLCV%2FjyuXBWXxRb9BO6DK8MAXEGNUl%2BV2MwfN6%2BmpKmmNzvsLkdafh6FcP%2B0D19qZE0G&X-Amz-Signature=3e73ab968e775ef8bb8e68f46f2be165284b24b7d767715a5ee537a7754b6ab5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U236PNTO%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGF5XtF5N5bW5xFfdfWmvTC2AnQgqHBIY%2FUVMM4lGIDeAiEA84DGHg9jj9XMvwUrroHWIpIwSPmRiBHmjSdEiOyT%2FXQq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNp7vZaSa05t9Q59CCrcAx0vRdi1qogffVLksp7mHJt9qhcKzD9pNuSDqVKCRGGgvYruIxh%2BaqiVcHr7DNTuSB%2BY0PNZ2CQEm1n34eGkFsXrBusQDqUDvOKIAJ9IGKDrUBUPImc8R0fdk2LYGBWK3vICQ9zCgyQyoaOS4NcXsmjGHyB8EJsmmQowAs3dbHfKFM3hu1oapWv3d8eD12M56qwpB3fYoUKRYUv%2B8Zlo9WDFbFyPgAdlrak6WHNvqpnPzvJJGxFWP%2FBVOSkanIAzRZmgr887frabgizpGemNOTrAfDMjMWzwNMc1jaVc03fQg4D2LqOMX1IIa1BH9TQgmhtZigA3J0t0yVrnmqZwwrLwA%2BjBPHt6DPMrpSs9sdm21wm%2BKl5FHFvRYnBCbD%2BNBlg0O%2BYhHRoSBUZwPij7j7e2GmGbzlRf0xFBTm9UhokFlq74tkXfxazGgdDwYYBNw%2FrjgIXf7RJFwB6V9WKAr9C0chGxBnn1%2Bu5FAwbhVn7fk3W7FglPMmk6dEviGJx0uIoLq4MjfqzO7vAQhb7eiUfmhz%2FFcPmy%2FYUdk77ivNDk%2FMAwZ0nwI%2BWnfGOZlhH9W9%2BLs4EFnQjviR%2BlwPq795d4RH1PhLWRxmoQqd%2FJJ6N0zMjuUua%2BIEmhtJQ6MOOrz8wGOqUBLrAyQBaQFPNuhsT3rcadDOnKGv0BbOgSVpvqOqfJcdih%2BpqBATq32ZeUaDXeWju%2F2PjLnJL%2B5%2BWJMIUTwjjpuSWIjU6EgvIl5bElLvCQddy8urWbNgs8yuqKHcQI8mKjgN0%2BBYQEM2tCtE%2F1w8Z9b%2FqZvtjs7JOWQqIx0%2FKtnUq9Rb9iBxIwmZjnQA4kw%2F8k5mKQMv%2Foll8hABDtzCr0U2brQoNx&X-Amz-Signature=9800640bdee1102ac70a82397c30e072702f0c632924d1edc2dbe44c0d59d699&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NGZPNEV%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIHQs3oBMu7PwFtJ7yb7J361Nl1UWGeJ8quUuJbGQRbBXAiEAgZiBkTln5RipKe85RjAllK6u9YlqPqdPjd5QuIWFz18q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDHcKwsjtMTqm5MMz7SrcAw9JMmlaJQ3y0MFtuKLtH8hTljrB5tYMuZSLSKNc956Q12lDVRTdmoXpWgHOnlRp95Yr%2BuTOuDTUR6B3vKP%2F0L9bmLvFyMz6tF%2F5sv378fTKf%2BF5WnPYJz%2F%2BxUwl0VyjLlrBY4QUUiG44tJw%2B%2FqL0L0XdoCe6GC6Q6iuYBJfdPUWyXem1RQUhnl%2BeLKt9NQfIecy3OFy4idkWWPi5lsJnxtu9xW%2FB%2FM0lGKK1g66MfNHAU7gv8ZswLbjc1LlogsKN3R4ckRS62acVp00nNLTh5uSX7iAwyRGLcA9VzTzHmFxOsghn3WWhSJj7lnVq6L%2BaREbb3nEt1GZ5EvYfVhpbXOnIiMXYhUm1UyOkVYJMh%2BiXA2p2aRu6s9JI1xLZXBdgXSo128Swzf4aNQjHC8M7FC6hMr4kLe7YZuCzhlyPcWDjVKdpV9ONDNw5U3TwqIBJup4kxe%2FZ8w1YnOkfLdze8ODvAxxtBGzFDAgajbsnF3JvU%2FEPxqVPtKcjhuRbqsRnOd6og8dJ6HOLzKamSg80p1trD6H8r%2Ff5LI%2BdjTEErKW0JzafI0%2BtRHaSDu%2FmiF6RXn7JndctV1mg6hcm7KSyWq3ek3QWa9RREUENGwAm%2BNgRHCDnnIJxmXm8yLLMPeqz8wGOqUBcgWIK5%2Fdv8SzNl4bx0OL53T2DqhP%2Fd3zv%2FKrnf4M24fP%2F%2FQ5ztRlF8zClrlb09HKn3AXP4dMMvc9s1tVW6FjdHDagzZ1TsZzXDQwrv6inahDoubwBz7g8sBEdMEpqCTMrFseQ5sgS50uiEIQ4v%2FWlQatX3IOrGSQDnqs9nooXxaUNfCzWIVUWYUZuYkGzDEF7Bt427XdUogKYY994ATjot%2FSeCNX&X-Amz-Signature=b3e5c2badcabcf42685cdb28c8dac699c56bb82b04a3624c0e32dfc110a6f832&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NGZPNEV%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIHQs3oBMu7PwFtJ7yb7J361Nl1UWGeJ8quUuJbGQRbBXAiEAgZiBkTln5RipKe85RjAllK6u9YlqPqdPjd5QuIWFz18q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDHcKwsjtMTqm5MMz7SrcAw9JMmlaJQ3y0MFtuKLtH8hTljrB5tYMuZSLSKNc956Q12lDVRTdmoXpWgHOnlRp95Yr%2BuTOuDTUR6B3vKP%2F0L9bmLvFyMz6tF%2F5sv378fTKf%2BF5WnPYJz%2F%2BxUwl0VyjLlrBY4QUUiG44tJw%2B%2FqL0L0XdoCe6GC6Q6iuYBJfdPUWyXem1RQUhnl%2BeLKt9NQfIecy3OFy4idkWWPi5lsJnxtu9xW%2FB%2FM0lGKK1g66MfNHAU7gv8ZswLbjc1LlogsKN3R4ckRS62acVp00nNLTh5uSX7iAwyRGLcA9VzTzHmFxOsghn3WWhSJj7lnVq6L%2BaREbb3nEt1GZ5EvYfVhpbXOnIiMXYhUm1UyOkVYJMh%2BiXA2p2aRu6s9JI1xLZXBdgXSo128Swzf4aNQjHC8M7FC6hMr4kLe7YZuCzhlyPcWDjVKdpV9ONDNw5U3TwqIBJup4kxe%2FZ8w1YnOkfLdze8ODvAxxtBGzFDAgajbsnF3JvU%2FEPxqVPtKcjhuRbqsRnOd6og8dJ6HOLzKamSg80p1trD6H8r%2Ff5LI%2BdjTEErKW0JzafI0%2BtRHaSDu%2FmiF6RXn7JndctV1mg6hcm7KSyWq3ek3QWa9RREUENGwAm%2BNgRHCDnnIJxmXm8yLLMPeqz8wGOqUBcgWIK5%2Fdv8SzNl4bx0OL53T2DqhP%2Fd3zv%2FKrnf4M24fP%2F%2FQ5ztRlF8zClrlb09HKn3AXP4dMMvc9s1tVW6FjdHDagzZ1TsZzXDQwrv6inahDoubwBz7g8sBEdMEpqCTMrFseQ5sgS50uiEIQ4v%2FWlQatX3IOrGSQDnqs9nooXxaUNfCzWIVUWYUZuYkGzDEF7Bt427XdUogKYY994ATjot%2FSeCNX&X-Amz-Signature=4274579aaaa7babfc4157f24cfc35cee5e3812f5d97f97c804ba9c3537d05fbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CAMXKFC%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQC4qALhY6FMMLcBfmE4O4Q3PO7bI%2B8u3U46oLqQxhINngIhANf3zgVY0qGZtF8vQLZiubzYr85l1pBu0O%2BlHczxONnyKv8DCEQQABoMNjM3NDIzMTgzODA1IgzUMTq8I2Xif18fOAAq3ANKw1QOx%2B26%2FqfxgpgQcAsbQ7Z%2FR0WZX%2FWzgNPKDe3ZhdPJaWKBh%2Fha%2FBK9eCfDuZ9ciQcRZQDFHmBP8xlijG0w6ITMEPtLyJP%2FXgSSbPoE29JAMSpzjE9LSukCf2VeQTGF7K95XXY9hFPBbVd7SIFE2tqrJXnHh9AidrDtqRNLNQjJL5NecfdQmKN0efHUIv23hpEX7yh1vk95vZf1Q8leWlAbOw3N00vEmf7rNhHPLlc5aaW8vBh4uSNjjckedmOZrBHZBR0yNQbFXQEqdl0LRijqoyctc%2FxqzXSCdPs15Ue%2BqLgJlLZ6Wb2MBBRNbn%2FvN8epnwDRuBCVhVy0EiGdD0Zn3msRyAekbB6HG4ao5G3qJRjYVgSvH8jU7nr%2FQTTwWZbSoplVCe5TFr2cRpR8IIkaA3umC%2F47odwfE99lT66%2BLOdJVnBbipjBd%2BcKf5r8mTLeUTViOBMnXGgT0kEZwDNKgPUZW97q7Lg16UrsjgP%2Bfrj0scuFjMkN3ho3l10gopCn2abF5HYq9lr%2FDMOL%2BEGsIjfjHu%2Fp4yaypmJkyn73Np0i0NPqrWdHESUf%2FWtlsKqiRsNUk20JtLfZTFqXc6cPUnRJTonxX4dgfJFmE9%2BwY76iyBDRRe3mozCTq8%2FMBjqkAeHwrWJEMyROpgkBsT5YnSXQ%2BvTNdITn2CyIWHbOoWgJLHSfI6xvv1oHLNE8oAWOf%2Fc5u65u%2B9Xa0%2BZoW%2F4zb8LAq94soIjSpyTilLML0ln6fStKCnAiWkxubQVx3mtrh%2FBM2rkJa9m%2FSuXuSyz7S2xIBB4t94SMxMBORzqqKVcVfd326GkFU8rAdGbH4%2BZFWnpVKagdmIHsXjo2kpHMA2dmM20x&X-Amz-Signature=df12f281b2c2380070f7bdb57c31d076c61f412e23d8a44ed6b32e490eaeaae7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662POMVWGW%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCHl4DTtO1cLE0eGJrExQlzE3lhUaUR0%2BMtQ4Th8uWrmAIgCPQCyfKPt0TQ7A7KjTif9dhtCe8rH%2BhPVfENnJ2z5poq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNwHCW1nd2IN7b4B5CrcA84ZpaPLOL5LPw%2FOoqoxHAh%2B89UZVT3iu6EI63Ihhw9zMtfe%2BwNCbt5SH8rzn2aarTsGWbvoGk97z1duFOMLfmiQYAqjSmJYlc72GfcxggoWnhwtrX%2ByCgnxXAQn%2FHZ4yXWjc3umXxN3MxQSjmDNzL%2BJM%2FHZDIVurt9kdhBzapnlq72phWMgxxYcsmtgeUIqdTrSkNwquZ9qKPwK9BGGN7PL8KtcvFFPoQn2a6KInMhLl6Tg%2BO6GDefTrZIZpwvY4VvlrB0mvjIxqrk7CgY2JgmTeJ1Dgh8MDojLUuDWOZ58cVUI%2BogPq1ZO1sTN%2FTSw6w5K2KJ1LXGlVqGa45xwzQ23XI4w6Bskl7ulgqpyhYx%2BGh%2FSc8L4%2FoRLDNyEthmT%2F2xoFw3Fjs9LrZO60YjzYF%2FpX9CQ9Bvb4nw1ww2fDvTTmjcz4JNc1EyEJ%2BaqQbk1lUdMTxYRiPtV%2BQ1CV2SdI%2Bl6dP6FBL%2FsMxQV9uUMM%2F6u1GqA1TPTI8LldtZSGLCS4iza%2FU6VFXh%2Bbd7HxIGYJFO5D83WtSxUhVT8d7CcZnAfNqRcChdzCrw6Zrr4LO%2BABPNA1DvmTkf0IzIvomMcro1ZFZ2bylbzt31z08OEwnqlQvnIc8XelHk8UuUpMIarz8wGOqUBFLRJR8ZX%2BAL6yfl22lv3NJ7t%2FjrT9U2p%2FBU1DXv0rzoKvWgNz%2FzWlDflf0nKzUpaEI76apTJbQpNtKsaNLA6QYDAiJQouBzIiv2iWmMHOc5GeB3ACFbdpt%2Fv8EXShg6AIlupGcuR9vblycZkSQD2KtyZsNclq65Q6ShYm9q3Su4oRxCEVUcpeyJnbwKoy3b1GF7vQkWBPlZ2ihwhKLpNQZ%2Ff9hWu&X-Amz-Signature=01df4274fd8654c68d90567ab4f5561d57997af4147755cec152a6820c4c0c93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662POMVWGW%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCHl4DTtO1cLE0eGJrExQlzE3lhUaUR0%2BMtQ4Th8uWrmAIgCPQCyfKPt0TQ7A7KjTif9dhtCe8rH%2BhPVfENnJ2z5poq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNwHCW1nd2IN7b4B5CrcA84ZpaPLOL5LPw%2FOoqoxHAh%2B89UZVT3iu6EI63Ihhw9zMtfe%2BwNCbt5SH8rzn2aarTsGWbvoGk97z1duFOMLfmiQYAqjSmJYlc72GfcxggoWnhwtrX%2ByCgnxXAQn%2FHZ4yXWjc3umXxN3MxQSjmDNzL%2BJM%2FHZDIVurt9kdhBzapnlq72phWMgxxYcsmtgeUIqdTrSkNwquZ9qKPwK9BGGN7PL8KtcvFFPoQn2a6KInMhLl6Tg%2BO6GDefTrZIZpwvY4VvlrB0mvjIxqrk7CgY2JgmTeJ1Dgh8MDojLUuDWOZ58cVUI%2BogPq1ZO1sTN%2FTSw6w5K2KJ1LXGlVqGa45xwzQ23XI4w6Bskl7ulgqpyhYx%2BGh%2FSc8L4%2FoRLDNyEthmT%2F2xoFw3Fjs9LrZO60YjzYF%2FpX9CQ9Bvb4nw1ww2fDvTTmjcz4JNc1EyEJ%2BaqQbk1lUdMTxYRiPtV%2BQ1CV2SdI%2Bl6dP6FBL%2FsMxQV9uUMM%2F6u1GqA1TPTI8LldtZSGLCS4iza%2FU6VFXh%2Bbd7HxIGYJFO5D83WtSxUhVT8d7CcZnAfNqRcChdzCrw6Zrr4LO%2BABPNA1DvmTkf0IzIvomMcro1ZFZ2bylbzt31z08OEwnqlQvnIc8XelHk8UuUpMIarz8wGOqUBFLRJR8ZX%2BAL6yfl22lv3NJ7t%2FjrT9U2p%2FBU1DXv0rzoKvWgNz%2FzWlDflf0nKzUpaEI76apTJbQpNtKsaNLA6QYDAiJQouBzIiv2iWmMHOc5GeB3ACFbdpt%2Fv8EXShg6AIlupGcuR9vblycZkSQD2KtyZsNclq65Q6ShYm9q3Su4oRxCEVUcpeyJnbwKoy3b1GF7vQkWBPlZ2ihwhKLpNQZ%2Ff9hWu&X-Amz-Signature=01df4274fd8654c68d90567ab4f5561d57997af4147755cec152a6820c4c0c93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKNSOLRU%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T033120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDBnqhsRYooWy4FVdHmanbdQSwchYD74s2t0WRmoJ0vXQIgBIjRqtkKG5Z%2FlgNT2azztnK0bSEpUwYZWH2oMS113Qoq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDIW27JCuelG8kpmiZircAwjc6a1j4Jgit5NFYbGGNbZbyt4uLRTqvQ0lLzLAkFoJ5FIDGicriM4u4ENUTTPT5FHfdjFfezkarwIvTeWTHh1R7hJwt8j3iOpjweYNRj9%2FI3NgwtreIfhhiRa9I%2FDvMmlMkFrXYvncvyFsLXOXvHPDmra9BagHzgqeAwjAsXRLr5BSwvTUBlRme1syI3sJmftR%2BRKvRUs%2FDf2QPpKGIIBQN5rHRXb9Guq27YS7v%2FCGif%2FF5hW7vFDmZ7ejR7%2BBmNSMy4lGTA%2Fpm6q3bYb7cVFL0WI%2FvNUZmLeUqrYsg5MUf10IJX05GYUs0e2BI2teNlJ7HkBc2ve4ZlsFZwDmVlvZlaY2nO5yFyWLBZHzDnb%2BTAuFmlck6D9kPD20v2njZuJCx9M1bFmTHp0eCisCaSRlVTZhO3xuAnyEldfccYS0obMqn7EYORNX7y2Y5P2kLwGQn9Pc0Eb9qDSGgttbIUQZJS2rZsWGq0t6c4Eb5d%2BBBRIulVA8Ke2GasXQ69KedCxscM8h5VPS7DWCkwYvhdIsP7yJOVVJYJlNqJsHKDCGVnDFMBp1crFmY2tDsizN6g5DPKBUX6ZFSuogNYim3qWeqBtkGU8cz5IorAnk%2FyIotJwlZ2IvHJqxbsvjMLWqz8wGOqUBZAqdzoptu6CEHEsGP65lqdENlvtAw0ec41rCuHBjQxA%2BorLbk89okyl8uxl6yxEenCdzGakS%2F2wuZKnXZ9cJEKWbt8SZsTZfBWPu4zSKyMzwo1SaKZslrUbpKyac061v6L%2FmBEbXzbJpFULYy3T9tb3WCvy2e7t4XzAnxIcbRYg6HqAzovX4oxFB5HPzr7YPWGQEmefjNFMNDyhRU1MBSE%2FPmRuC&X-Amz-Signature=d22fbde1b52e4b47a9183e95471117aec88d2dc497a47859773ea367d747794e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

