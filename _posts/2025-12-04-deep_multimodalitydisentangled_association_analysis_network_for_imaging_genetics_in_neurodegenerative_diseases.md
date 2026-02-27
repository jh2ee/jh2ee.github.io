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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y54ZIZMJ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDSk0GZpE7srRtIqAm0znbhMCB%2Bs60c7JpJrcv3FBhmKwIgJzeFqGKM136jhSVCFm5UlukeBiJWXZ34%2BXNc5r9wcD4q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDM39hxKG9b8WBSFLgCrcA4ckzt6Q0xj8KdhN0gmPLpo9tKLSCP9GoAp5OiJLaWNHKWVLtScmr3F%2F8p6uDojQBgi4%2BfEPd2QCEH2OaeA2ByM%2B3uyVcYSNF8dqKk6AE1GJty5VQwfswY%2BROWEFD2Qp9XdCQE3W98WjiBIPGRdBzZIB1kK%2FXyE88x11wm1xzw7AsOgqGWTmx%2BBJzHjq3YM2Ouy9KJb2MmJTYecE3Y%2BAF40IWhlu%2BorIPCqlzEz8WgxHQm5m7eQsYm6k%2F4gzKfgcz%2B2y10QWoFEev%2FdC8MpPUAb8H43mbm4MM64hRozG4DILNk%2B%2B3RTrYEq3088I7qpkl2nj1VYg8Gku0U4MbN88zzCQ5DpR%2FYp4HBjtHopJTfLozQ7n55R6YbuhYER2vVYB5k9shYcznW2m%2BxcWV6XWzJb9U7KWBCYy0FPMNOnascWn9jkGzLKbHWZwUIycnrXs1sVF75EgBYrkSiDBbeIMNjpOQawjeVVgr%2BQs4vIWKF2ZBQQsxXYL%2BA7l5cubmt5nkHKvwLHNOyi7i36Wk6O7yLwVt5ZCD5H2PSTPL2jNt41zFQ94Q3yAtV4xfE%2FaeNuguIYSSZ3%2FgLLniIb4lHaJ9VOpDArMsffiGKEe62j%2BdOR%2Fb5nOK7mpJvNcnZUIMIjDg80GOqUB8%2BwOqTFisuiJX9Z0WuZr3EIEnYz%2B%2BtKXNJjuwqgbpBq3EVTjSfGOME65hyu2BP64t95R34i2OzJtNkoe0GOgvtOFP8HUZKoPVKuQLVQd7U4GBd6jOH9SMH2zMSVImbaUc80RvPBZFELvQeLxhsGRESzptsmpy1S0Riy4acwhCPcHy83l0bpY60kRbhUyNQ4N72SvWVzEqVhTNmlsq381N9wGVqDU&X-Amz-Signature=1250233ba5a6bb2e4662d52007038d2caf53a25302a9502055c48aa7a5a563cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y54ZIZMJ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDSk0GZpE7srRtIqAm0znbhMCB%2Bs60c7JpJrcv3FBhmKwIgJzeFqGKM136jhSVCFm5UlukeBiJWXZ34%2BXNc5r9wcD4q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDM39hxKG9b8WBSFLgCrcA4ckzt6Q0xj8KdhN0gmPLpo9tKLSCP9GoAp5OiJLaWNHKWVLtScmr3F%2F8p6uDojQBgi4%2BfEPd2QCEH2OaeA2ByM%2B3uyVcYSNF8dqKk6AE1GJty5VQwfswY%2BROWEFD2Qp9XdCQE3W98WjiBIPGRdBzZIB1kK%2FXyE88x11wm1xzw7AsOgqGWTmx%2BBJzHjq3YM2Ouy9KJb2MmJTYecE3Y%2BAF40IWhlu%2BorIPCqlzEz8WgxHQm5m7eQsYm6k%2F4gzKfgcz%2B2y10QWoFEev%2FdC8MpPUAb8H43mbm4MM64hRozG4DILNk%2B%2B3RTrYEq3088I7qpkl2nj1VYg8Gku0U4MbN88zzCQ5DpR%2FYp4HBjtHopJTfLozQ7n55R6YbuhYER2vVYB5k9shYcznW2m%2BxcWV6XWzJb9U7KWBCYy0FPMNOnascWn9jkGzLKbHWZwUIycnrXs1sVF75EgBYrkSiDBbeIMNjpOQawjeVVgr%2BQs4vIWKF2ZBQQsxXYL%2BA7l5cubmt5nkHKvwLHNOyi7i36Wk6O7yLwVt5ZCD5H2PSTPL2jNt41zFQ94Q3yAtV4xfE%2FaeNuguIYSSZ3%2FgLLniIb4lHaJ9VOpDArMsffiGKEe62j%2BdOR%2Fb5nOK7mpJvNcnZUIMIjDg80GOqUB8%2BwOqTFisuiJX9Z0WuZr3EIEnYz%2B%2BtKXNJjuwqgbpBq3EVTjSfGOME65hyu2BP64t95R34i2OzJtNkoe0GOgvtOFP8HUZKoPVKuQLVQd7U4GBd6jOH9SMH2zMSVImbaUc80RvPBZFELvQeLxhsGRESzptsmpy1S0Riy4acwhCPcHy83l0bpY60kRbhUyNQ4N72SvWVzEqVhTNmlsq381N9wGVqDU&X-Amz-Signature=1250233ba5a6bb2e4662d52007038d2caf53a25302a9502055c48aa7a5a563cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CN4KFQV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCICjav5Vk8c%2B5tXmG9rtc%2F8OXFpDHsJmTje4lV38IwtbKAiBRPEKedTVgIOTkkenafrOxxN5M9sYOyY%2FrmMpHGbgsrir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMtWS1bw%2ByG3Jf6EKTKtwDWp1RM0qcc12qmufu2xRDuDCt7hMte93aDGsnffPLczAfmvbkJqSBvXOr2VEcRAqt8VLy4RCJDJS5ZeaR%2F1%2BneHjjKPA%2BKwT2lOvm5VUNs%2BRl6SdqXGSey3IX9oNzEQFbwHCEdCFfDufhnqFapOY1wddelJIvydN2pHcNJRKPfSHDvSkR%2F3ih8b670H0423MilsKqxigYHLY1N607mHvZC0LOOzn1PIiK8jrY5TRxpEqR0rPfxKZbpaD45JVdHC44JR8q%2BtI8QG2%2F1ZmlcbLHem90CaAG8lC%2BruoyRpcxsvPTvoYPQrnvt5GE%2BUbHIlOaWVCls47vn%2FsSmQz52EjyhFSQAWP5UKA%2BqxemeAbU35CyXt0BbpNJy7dG4tNX5XVt9wxqWbJpSB32Ay6e8XSiOrJAuMcFsWiaPCUbSxLWsZsR8frTwOXk5lUhLaW4CLehb1hCzmnyry109dz3xJhU%2BNtFBbHgcNQviuujy%2BbqJw0cXbQ9YmeGGZOgZ93qk0M9yTwAbZDboKhC2oTDgO%2FKl2VSKrZC9bLE9dRMob7m6BjEjTzcJ%2BodDYYhgggM%2FnXEuDKtzAMy82LqvZUyKqGDUnGQZyjv36T%2FbhDiGZw7a35qzBhkOltvbEIIdegw48KDzQY6pgFDjmZ94ENicEo9SdrPp3Vzvh55waSJa%2BJypL4qm%2FHrn6llZR2eOT3zLA9miCwEI%2B8XpksYrkMaufKZtGNYHynBKFRSG6PIuebuWae0DQo%2BJ8P2Mt%2BLO5T1KNHo5Sc35PMwmJRhh28kglIvZ%2BC1ElFw3USuXgI985vUAJ1y%2Fuh9Th2YQf3gWEGCWn7VvUCsd5SxtNFeijpNESphTcKYDwaPCsBBrvvR&X-Amz-Signature=bcb67d567ed42cf005a135e7828e983957798b2564e8b2800debd53d62045897&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IJTNSBI%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCICbp%2Bh%2B%2FIdeRNLFyy9mDG79AByRk6uOy9DuN4tleWC%2F7AiEAtal8mwjVIyjTumjMPRRtoKj1y9dWIyLCKbKomFLzwiYq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDBwPn84OqeqPbg2zEyrcA0Ik13dfn2Dr3UMI0iAdWGM3hFPdnQIZExGoQrLcred1I%2BqGiAHwScjT%2BwOrNb0nM1TjxF%2BPqZk8BU0WUYdhSXzp%2BGIE3ZPzp1bCLDPxY6xyw1PHjNHYrkyyju3ubOS8VxTGhKZui5j5y%2BEcDDA4roJJVDsPN%2BlJy5O4lR2vgU5Fl9ng%2F%2FFnR8Ir%2Fqd9NYSqID4WIrxlZCFKlx4LsWrpd8SGrwTGUKIdrXq9uw1oh%2BispB9ai1HlqfRauP7fpwwq5iy5WN49tob3ov4vDuX5UNU31GkEP5vKs%2B3QvXUDJqKp3nIfYbitL49KOTFexk9ZipnzRFgylO8G7jTeFvUkpO8a3GaPPFt5ju34aDE5GzgkUcD%2B5wg6%2BnLsHLPp2fLINacgjyLb%2B5ECJQvQnbc177Vk7pP9sfjGVMDqqY6qEBoqSsag2PW3BBwDGebWtulou7nBXO20maaNhXD%2FmuOrhbCzmDfAZ4phtFR4C9Yx%2FeHlCrgKDx6dXbMiq5npvR6TWEvm3GuEC669%2BoIEvyWyffGRqwmVdDSEbX4%2BLpCqx5bUPrgxoSLAyxRQa%2FTNyV11ilU%2BkwR0JZ031oAVw3YKgfGx%2B7GCGCvYfipEwX7VNe72afV%2Fmeu4BrJYYA3gMIfDg80GOqUBieT1rjW4eL0fw%2FzvMZU76CAGlrXpGUKf%2F3u%2B3q7VGmbiNXQ5TSVs1%2FiMNxEgI0Rh4P%2FUhHofgv4MTkDy%2BATb7awZDU8WWwGH9S9GhF0pnWE%2Fa1yTFnR02TPN34w75TPFg%2F9IgnoSyvK%2B7lgVx5wAbDkbQcjOmzClGjK7zGR30SjxIzCAB9MfkYsy28E8DfPajjbcl9X1OqaV%2B%2BiLogeOsgFmb4WV&X-Amz-Signature=094fd2c26ff47f346a337555ff6ad583208674268133b6e16df4d179e514d480&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IJTNSBI%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCICbp%2Bh%2B%2FIdeRNLFyy9mDG79AByRk6uOy9DuN4tleWC%2F7AiEAtal8mwjVIyjTumjMPRRtoKj1y9dWIyLCKbKomFLzwiYq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDBwPn84OqeqPbg2zEyrcA0Ik13dfn2Dr3UMI0iAdWGM3hFPdnQIZExGoQrLcred1I%2BqGiAHwScjT%2BwOrNb0nM1TjxF%2BPqZk8BU0WUYdhSXzp%2BGIE3ZPzp1bCLDPxY6xyw1PHjNHYrkyyju3ubOS8VxTGhKZui5j5y%2BEcDDA4roJJVDsPN%2BlJy5O4lR2vgU5Fl9ng%2F%2FFnR8Ir%2Fqd9NYSqID4WIrxlZCFKlx4LsWrpd8SGrwTGUKIdrXq9uw1oh%2BispB9ai1HlqfRauP7fpwwq5iy5WN49tob3ov4vDuX5UNU31GkEP5vKs%2B3QvXUDJqKp3nIfYbitL49KOTFexk9ZipnzRFgylO8G7jTeFvUkpO8a3GaPPFt5ju34aDE5GzgkUcD%2B5wg6%2BnLsHLPp2fLINacgjyLb%2B5ECJQvQnbc177Vk7pP9sfjGVMDqqY6qEBoqSsag2PW3BBwDGebWtulou7nBXO20maaNhXD%2FmuOrhbCzmDfAZ4phtFR4C9Yx%2FeHlCrgKDx6dXbMiq5npvR6TWEvm3GuEC669%2BoIEvyWyffGRqwmVdDSEbX4%2BLpCqx5bUPrgxoSLAyxRQa%2FTNyV11ilU%2BkwR0JZ031oAVw3YKgfGx%2B7GCGCvYfipEwX7VNe72afV%2Fmeu4BrJYYA3gMIfDg80GOqUBieT1rjW4eL0fw%2FzvMZU76CAGlrXpGUKf%2F3u%2B3q7VGmbiNXQ5TSVs1%2FiMNxEgI0Rh4P%2FUhHofgv4MTkDy%2BATb7awZDU8WWwGH9S9GhF0pnWE%2Fa1yTFnR02TPN34w75TPFg%2F9IgnoSyvK%2B7lgVx5wAbDkbQcjOmzClGjK7zGR30SjxIzCAB9MfkYsy28E8DfPajjbcl9X1OqaV%2B%2BiLogeOsgFmb4WV&X-Amz-Signature=c7561e6af40b6299b304fecff4806403ed88b857aa224a9892309dab2940d01b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OQTW7NM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDnueU1sE%2BEZXkVwuk3JIwgE3U%2B%2F7K1Aojlzu%2Bkg6ElfgIgeq1YztCGl2BFS09DquDI%2FK3YEJIscPbMvTfFX12ggK4q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDI95XUzq9XWy8vH2%2BircA0b9BU9kn1w0dmaYvP9znqS7yJHL%2FhYwFVGs8jku3Jb1eaZ7RxAEaBWeGyuRIY8Uc7IBbGVwTZeay33Y3S57rFpnPnpS2Oy%2Fqg%2FDo0ZNPrQo19rQh7eSbI7ev6ozS63QlOYup86wSaCu2ZP4fNgWiCEldji7N%2F%2B1pcP2jekV87U8nXaDBrCJD6fPReTgj5blvwk4L9isEDksJX%2BcQp8wpBUc%2F6Lmf1FV1d9DMFND2VyknoM9RCwg9OkCeVYyQ%2BsEZ6KP70V%2BEcB%2BjdChFsEm610ulSQ5TEeQWQ0O4tRRJTsyVRBm0O9MlqE7S38ahwDeAyRw8cplB8KvXWdEVVPZ9zpSNJ0igIyktE0LOMmg4z3HSD%2Fr9EwixZOe7PkXGKIn77QKAjEidtgftrA%2F3TI8S7mORp0mQnEBNwV%2BhmUe9HuHbrcdEKm5SxjDJfdZB9vik7IRYByDRUiOu1oGXhXlxhibhMnwBFO8DOy%2Fu2ZXdMrp5T%2B%2BXgr7xpq1pyuqGAZAqD53RLidF2MnraGNXyZLBR8XRxIwVJodYB%2B8CeV57rgi019yZInVItOh3g%2F%2BYIToMa4G6Sxr%2FfUDqMRfadY%2FL2Uq1CS9OpyStdMxhT8qHGob6y8QmxjYqiA%2FMzPSMPrCg80GOqUB7KbV1IqiAf%2BeM3Jtwlcs0B8QSUvVfjAyyGcdZMx0ETv3mbAxDuFQJOuuD%2F8fXuFBVU1bG3SqWphe7ZVBROZNi5b1MWxwz%2FcWy2rwu4c5kpXAJy%2B8peXTi%2Bc4xrIH3UFzeoo%2BhkUko1ru6aZ7K0kobugCczZnaJ9WbpQLSosltHizY9tKWaIPxmSrvKTNw8RYO00n7su4Wr7g42mv4ncOaLYJ1VWa&X-Amz-Signature=8f90f38ad068d87f9fcf855bb3602a236b2134e62f6134f1efd00a2c4c100aa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMFH52Q6%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIBbggAPeiCfyDocInCP4FWI9OnsK%2BbK3Bdch%2BXpYQKQtAiEAi5k8Oe9hd5tHWgfFPaGxUqA0Imakg8%2FMmnYvClV05bMq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDGW2yppbLY8e9vYpvircAzyI3ofGsY7B4jH0VoqvZdeN1Nue%2BU4s1KKUbXKnCnX3qgaq2BS9%2FYdv7Rxv25Qu2Yubk7DzUN88dFrJGtU7AcYN7KObF9zjXRbzykVyd2t0dZSfNeVs1rdqRJNcezU8mx%2BxeF0wW9Yq3bUluPujT3PSCMh9IQ%2FE%2BXl5imPRKTcfDrfBZJ0ns6pBDhO6U1tm1Cu9F0vRlwmxxsSIGo9Lqj%2BpXJdhWzwK%2BMdROtYe6ig8%2F8AaumfVpdiiPzbatyNRICGedzZ86D4z0DsL7M67pv4FtNSoRlnupgEsrvAZsaW8N67tz57qSl7rnzY6n9%2FOLW2z%2BS3GpZlxWdo3OTNVEbFaFlVWe1p9wEPKK0IUwKQeGrNAoaA%2FGFQr%2F2KdVGgKEo21oCaPM7br%2FL0p48JOO3FuVp1f8BockzF0L35PvTOCqDtOBKJctrzt9zBpqoiO35wYEqDsYuWxDhkkmXYyD7dtmrKWnWZQW1%2BoPGfXla8VGphp34QzRysZxTOk6UvQAR2dOgOXTocx1t%2B%2BsYrz1Z%2FqiJSDp4piTxYcczovHchlYUelbYzLVrNUntDZN1QVbpFoX2vQnZdU9Y0rSCKMoRm9Sj07OZ%2F1d2e47XQzCbMyiyjw1VJtHIe%2FdwN9MLrDg80GOqUBXH%2FS2%2FY0%2BBOBbJMXHR8kfY3QJgqv8m7%2BapuNOLsAAK2SIMIu46tuk8sjOXOii%2BHUBuua9dVVD1xtyg49Udz1Y638s%2FLbnEOVMhnrdJNWv4Zu9rXZWKsNSt9Y8%2BNS5qLRZjT8hVKLl8Zh1uJKO8TjEKHGKzwInX4Sutr9FDUfE3sn%2B%2Fn262AkL37UmQENaynQS9wmNLMkg7E4nDUdpAE%2FPsvAYBSa&X-Amz-Signature=8bd4f4740b428f94cef7e0b21c1f6239ab2cdda4daf3593baf8c86e307381aa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YARIMQUF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQD5M7dO%2FLmGbN864VSIOh3BXzbHjQbf6Hl2fhNJsolfOgIgZLTF%2Bd35O0xEFDP0ZMKN3HmRdskYdkT%2F1vGt%2FiyWfP0q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDPoHSgf%2B7UJyN2BtPyrcA5M0jRzjCLgAR%2FTBNtFT00vz9foOwe8OOjUh%2FilQLcSgc%2BWX9vIcjWkaKOZTqBrh7dVx8e6E8oW3hosrv1%2B2pPzPbyggteoCCsDsi0w9e%2BJrbYxNhAer6Yvs8yYmQK7TJdiKo5ydFKb%2BSwOzpYh8u19ppvO%2FeWdZi5Iko8rvInNy42T2Au2p7byyc9wKxJpuWIz7P5qgK%2FIVe3454NMFOMC103x1rDxyWAGWoCSCW%2FOMDZkiU37K24%2Bq1U2z0EYvh2sgwzXs9XTOm0gae5sqK4XagO43PfxirpkuS7fuFW0RfmL4AGyek%2FFDSijQgS57NQPJ%2BlTEAmhozKNap2Mo%2FoQTf3haLN%2Fi0E4iUdhkiuuNqYt47WSYThhmIwYPW3Zy8Q3EDm3N4SpQVlAYqrFIgJlFTZpHRIv0lqFDAfmIlMDIdbkdcJe26O%2BsEhQdfm%2FUqqTY1DzlAAwRvbFgEolg5Me2ehBRZfrRcA05nePlE0zgd9s0MD0AB%2B88bAtyVcK4yQs14XmiFvQdtCuSn4ICHiugK%2FTwJnB6uvuNzpg%2B%2BiJjQ7JV7lNfRh9QD3yxhqMsP9Ee6GuLEIATG6t4%2B%2BnI7gU4lP0HG4FY1bNHmrwcn4nnXk%2BF1Rbqc1F9H6OeMILEg80GOqUBGZi5Bc7z9a4md3JIRGJXzNHGecTJnicmepeesLvF5SDRS%2Fix544T8wFdWVz%2FSGwzpnMCsxO9O7%2FEvT8YP%2F6hZhJkffc6xay7y9JigMaOx4kgZld1w2bpRmkMH%2BmwJySUnvDffTLqVA8k797M5votSup3UJr0dEJcfV91O6uWLNb4nCEBODksUI4GT778zE%2FQUFhJkisth5u110wYQRPu9XQD9LER&X-Amz-Signature=a46b353e2de9e87159dde876167c99f6912b38a71bbe2837e4b61e071352026e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCKG764M%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIGO%2FnfJnHYf8FYGnbIYTwMopGqrB98sNRZ2d2WZ5PddxAiEAibwsSnj8t1hBb8BldAWt2lx%2FgdAPz3ysD5KbDDPbdBoq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDF93y5613j4B5AuxeSrcAyGct%2FhATQP6LkUEBPS50IIW1oio3Qi9mmk6QAuLO7Kn%2FHGx3GzOK4PZdoBEBaxmIhbrxCYoHK7ge0TjA77%2FI6UmBRRfpX%2B3TQ3NbC3GuB31TuhIGQ1dAp%2F3T5XZ3V3d8hDhONnZPI3XgDCjkNxr11jPorISXdhiZE2EzreQUC6hqUAsCx5KGEsiQYP%2B1%2Bd7aiH1R3GAdTDNgUQ6U2fG%2BSDgU7XOwCoUhqOjSRAmMbuHyAPBovxdJ3xA5I%2BZZmLHOVVU1Wkuwz2S43xxxrudEkD7kU%2BYrEewkSN8YtbXJipknZjcmi2sSYHnI3q9KTERutD8sSeu6gvdDkmfuFRV6aNeZGEIqPmbA19tO57AOmmCKpDdORXH4%2BC0YVE%2FhsrCdYQ7TiuTjwAR1VjWUr0ZKCj43mt8rNpmtPgy5bmlYuk2Cdm0tD5ngzna7MKlgCqKQGdeY4h5JtYNxMlrxh2U%2BqO0xIAjUr7V2ittvxqceF8g%2B%2BKUCGWM0o3cXigmzE8Pdo%2FYhqpwch7hdV6h66tFR%2Fz9QrfSWtZKIX1QkH1qkSQpBGW7gQrQOi5h0wmxCXYjuf5M%2FIYnU5g6yalgR23Str3%2FWKzJxCaumKRuvQfUexCwA6Rbd6MqzGdf9x83MO7Cg80GOqUBfn81GWXYYqUUwTIIVdZkKtG600V1cK0uIXyfBhbm0Rvkf5uteIre2U9M%2FEE7ZrB3PPb14ZeVwVnfqibXcZDsWpB8b%2BcbohKnDY8gaTFoLundNQcXCd2G%2B0ZrSeVTxKjfCZgum5e4PYTL00J0CvI%2FNcCc4OJ50G1WK9HM0bSV7emFbylmZkluDc48QH6BItmG2hVPmX3ySuHtSXbNplwekAQP7QUJ&X-Amz-Signature=60f1c88c3c433e2815a8b346e9e0a1d7a842bc9e1ffd36a61e76a02788eeabd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCKG764M%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIGO%2FnfJnHYf8FYGnbIYTwMopGqrB98sNRZ2d2WZ5PddxAiEAibwsSnj8t1hBb8BldAWt2lx%2FgdAPz3ysD5KbDDPbdBoq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDF93y5613j4B5AuxeSrcAyGct%2FhATQP6LkUEBPS50IIW1oio3Qi9mmk6QAuLO7Kn%2FHGx3GzOK4PZdoBEBaxmIhbrxCYoHK7ge0TjA77%2FI6UmBRRfpX%2B3TQ3NbC3GuB31TuhIGQ1dAp%2F3T5XZ3V3d8hDhONnZPI3XgDCjkNxr11jPorISXdhiZE2EzreQUC6hqUAsCx5KGEsiQYP%2B1%2Bd7aiH1R3GAdTDNgUQ6U2fG%2BSDgU7XOwCoUhqOjSRAmMbuHyAPBovxdJ3xA5I%2BZZmLHOVVU1Wkuwz2S43xxxrudEkD7kU%2BYrEewkSN8YtbXJipknZjcmi2sSYHnI3q9KTERutD8sSeu6gvdDkmfuFRV6aNeZGEIqPmbA19tO57AOmmCKpDdORXH4%2BC0YVE%2FhsrCdYQ7TiuTjwAR1VjWUr0ZKCj43mt8rNpmtPgy5bmlYuk2Cdm0tD5ngzna7MKlgCqKQGdeY4h5JtYNxMlrxh2U%2BqO0xIAjUr7V2ittvxqceF8g%2B%2BKUCGWM0o3cXigmzE8Pdo%2FYhqpwch7hdV6h66tFR%2Fz9QrfSWtZKIX1QkH1qkSQpBGW7gQrQOi5h0wmxCXYjuf5M%2FIYnU5g6yalgR23Str3%2FWKzJxCaumKRuvQfUexCwA6Rbd6MqzGdf9x83MO7Cg80GOqUBfn81GWXYYqUUwTIIVdZkKtG600V1cK0uIXyfBhbm0Rvkf5uteIre2U9M%2FEE7ZrB3PPb14ZeVwVnfqibXcZDsWpB8b%2BcbohKnDY8gaTFoLundNQcXCd2G%2B0ZrSeVTxKjfCZgum5e4PYTL00J0CvI%2FNcCc4OJ50G1WK9HM0bSV7emFbylmZkluDc48QH6BItmG2hVPmX3ySuHtSXbNplwekAQP7QUJ&X-Amz-Signature=777683157aa2465418d0930410f544093062d58e7ac870020d640c40310e03df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ARPDLUZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIEFt8b9p9hYMMB%2FpdRAz2Oz8K%2BPNBZr5Ce%2Fmik8h7pRsAiEA0mXM78FV7AOE8TAMJxxpAJRPmQWGHLo2EzjOctCVNREq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDMGeS4ImM8jWhlzMoCrcAx7iVDgrY7RmGlIH9tm9Le6t3w0FoPwAJur268JyeQkJU31QSC1lAPaEtQkwS9sV47BsKWjzMUeam0elcG3CnzEwAFtAN1eqP5xk451y9F%2BIlqJavsnttcgvjBiloV4VaOjm%2Fm4WACDstmTFwImn8OyoES8nnYBS%2B0Pij47D%2BYkBwEVxh4sB2GTt8dAx4wnbwc45D5gZusNMznDA5bMDb%2BC4zN0EgibzSdiiGXwolGyrEHs3X1tumJYs4yOOZKgWyyXeChA2uTZFIMeGbihdLHmIt5AachA9%2Bm2bKZ6lzng3vCHNHiRRr808lLarReMDFeayqsu3pF8akhmEE13infe64rMh6pXbsNGDgjc6dbsjt8wy%2BWSB%2BSGHbrZ6AfdW0AMuzHV4lggThyq54NfOb%2BB1MLu3ZjXoqhAKWECv4SPbiaCLjieVq1MVEI5083hiaJvMPaAyEwSK0W2AtuhPZHHbIVUTMZ1A3fkWIjDf9L%2Bj0H9Jz8BQdGVaXOpi%2FFDiyBSYtWI1Sjp6Q%2B%2FnEqo%2BRH9ryM4rmiBN5F%2FKY9P2W4NpgrNOOQ81ZGYXPPPS0i4ZF97w19tNAc4nGRHvSVjr7dbBYEm9x%2FxU57Wk2C9D5gDA4uDrFvYbKkoyFO%2F3MPzDg80GOqUBfcm166vianI6J9oU8revs2cag3K%2Bn8Hqbpy8Kr81asEr%2BEXoEdGPi4vU789so5xn%2F0P%2F8m2bKGcVPe%2BRTTsl7ug3plTCMrcz%2BxK8u%2FYzljKvk8vVAdQrhxPxQ%2FQAMi3NwNy%2BFLINvuDjsuEAo0yi2GdD7AeepfU6K6TRqwMn%2F2BikVwEcc3AxRbm9m5mj2fgJEaVh1gE51K%2FEUplNggF3kjii0Cu&X-Amz-Signature=89123700ab9bb8c5ae2bdc529d4cb7aa17ec830b32dcb64da86183916461a8bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QALFD5T%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDc5FUqnCAhLq0hyCRe%2FP9wQwm4Lyc8EC2fA6Fnf9V8ogIgBIVEd42HY8UW0giCeEu4hHfXJC4Q71MNm4ctzyrU9FAq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDGuL0NpuKGmwkJOa2yrcA1rARHRh2JKoqGwj21DMe2%2BbmPkOm1LsPbMnSJbO1XfaN1qkkFlqnm22nRtqK4AYLbM1swNV3E2u1VGenXrEl7ytTOEjYMfYSs7rPm3Fq4QPxdhYNzOYxGC3K8xiyTSJ72vrDMS59eylZjE2EkfCwf%2BooALA4AWEBR3ihLUc2XsZpIjIVyogjbVFoz0M2S4KCY1UwGIAJtgspSf3I2Q7IKCyHzvqkKrVyuKih3J2sGIAhnVFETyEyDmvX6vUgA0Rkv%2F68sgdeCw5bxaiyL4r4%2FZteRITFvq3xCOOIBdXW1wQlKDxdAMLV39QJxTqy0cVnEN8RItBy4Omn%2BK6XDthxGBltIMeKig5WzzvyleVGjYdCf9OsCdZ3FhMQlMRgArXD56qUKoxxD9%2BcUgVdCXhnW8NTbiT%2FmMgFm0x2J6d1TwPocEt4KWV4JGTaPM1ITR%2Bi6r%2BYwHP1pE5xgZHAX%2BoqW3DH3WIbZzngCTd44nHaP9hd2M%2FYjbQluePKk5Vr%2FOO92eGjIPog3cbHUXG1RUHWFgffSgq%2B%2Bto2jr3LnTteM4U9lSyxG3GMj45Rjj%2Bi56QOYPGyQMboWZsNhiGwL6%2BRmiE0%2FQ9yAne38RNkGy5jmFVRlHhqRH18e8DL%2BR%2FMNfDg80GOqUBSy30msLsuBdybaa2ej94Izj0hwEItkKfKiS%2F%2FeCU%2BZ0sQP%2BhbL6NovFvZHZKogVehcB5MluZkiqgtJ7v8Cn2jgGqWPzpNMxMiVQf%2FNhN0r%2FFDvp%2BGUbGyft8THbhDHcaVn3sG2D9AyopiOb9ip60dQT0QD%2BW6DcR%2BjKoNNYfsq7SsPwwm9voUFFVumsFFBVR%2FPOGOq6D%2Boa1ZvFD9O%2Bix5przbTZ&X-Amz-Signature=468b49bac272a6cc277933b7f6edbb46b4ce59c374b650d3323677a9128e9653&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QALFD5T%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDc5FUqnCAhLq0hyCRe%2FP9wQwm4Lyc8EC2fA6Fnf9V8ogIgBIVEd42HY8UW0giCeEu4hHfXJC4Q71MNm4ctzyrU9FAq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDGuL0NpuKGmwkJOa2yrcA1rARHRh2JKoqGwj21DMe2%2BbmPkOm1LsPbMnSJbO1XfaN1qkkFlqnm22nRtqK4AYLbM1swNV3E2u1VGenXrEl7ytTOEjYMfYSs7rPm3Fq4QPxdhYNzOYxGC3K8xiyTSJ72vrDMS59eylZjE2EkfCwf%2BooALA4AWEBR3ihLUc2XsZpIjIVyogjbVFoz0M2S4KCY1UwGIAJtgspSf3I2Q7IKCyHzvqkKrVyuKih3J2sGIAhnVFETyEyDmvX6vUgA0Rkv%2F68sgdeCw5bxaiyL4r4%2FZteRITFvq3xCOOIBdXW1wQlKDxdAMLV39QJxTqy0cVnEN8RItBy4Omn%2BK6XDthxGBltIMeKig5WzzvyleVGjYdCf9OsCdZ3FhMQlMRgArXD56qUKoxxD9%2BcUgVdCXhnW8NTbiT%2FmMgFm0x2J6d1TwPocEt4KWV4JGTaPM1ITR%2Bi6r%2BYwHP1pE5xgZHAX%2BoqW3DH3WIbZzngCTd44nHaP9hd2M%2FYjbQluePKk5Vr%2FOO92eGjIPog3cbHUXG1RUHWFgffSgq%2B%2Bto2jr3LnTteM4U9lSyxG3GMj45Rjj%2Bi56QOYPGyQMboWZsNhiGwL6%2BRmiE0%2FQ9yAne38RNkGy5jmFVRlHhqRH18e8DL%2BR%2FMNfDg80GOqUBSy30msLsuBdybaa2ej94Izj0hwEItkKfKiS%2F%2FeCU%2BZ0sQP%2BhbL6NovFvZHZKogVehcB5MluZkiqgtJ7v8Cn2jgGqWPzpNMxMiVQf%2FNhN0r%2FFDvp%2BGUbGyft8THbhDHcaVn3sG2D9AyopiOb9ip60dQT0QD%2BW6DcR%2BjKoNNYfsq7SsPwwm9voUFFVumsFFBVR%2FPOGOq6D%2Boa1ZvFD9O%2Bix5przbTZ&X-Amz-Signature=468b49bac272a6cc277933b7f6edbb46b4ce59c374b650d3323677a9128e9653&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MZTOVKO%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T005625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQD04SOfnAT7Bu71crXIPXTNmmGxG1OH%2B3VjEhUyuepKOAIgSIyypM6LB%2B6UjYKALC6UEXW0PsXtClB9XJSP0oVP0K8q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDHnaQkARyUe3U6bSACrcAzD5AsKFWWt9b0H86RGONdWmq%2BLGTWdoQ9ZiATRJDdPCzI9Y2CKsgW7lg1jjGOSfoeXPUEFuQZaBja4ar8weKXMQykLh4siQNIGgmcOPpMLOHQf55c6STwpht6sj9Y%2BQxCCTvmosy4jYGah0orl68MEZCV81llwgRvJ8Nt8QEccpqrVc1zLhW6evKDVlYHpH5A0x%2F4i%2Bw2mszTbbPje9UdlCL8VhejHlTKNSMAX1%2BdCRC1OOfXSDiXscu3K0dhBdq8H18fXHtwmGygBVOQ0nU9m2mw7rbbhMjiD9VPNbLiy3rl9OaafDMwBXFQjb599cxGFiTjDUJV%2BEajWkEAgOnR53tci67zsgSeFpge%2BIZva%2Bs%2FPsqvFQ%2BOpr0RYV%2F%2FhuE4nKYVyAfVGvlo9RuM%2F7X9dddVpvYH%2BF7rpRMI5l06rzeHQkt53WrdkMC4Vh4IZyW2ku7j0ZDmeKXIx0IYtGjIEKdwLee7mkgXf1APVlI6vjfvjyDcWUFERx7hS1YxVp225PT6exOkZ1jFeFEQh79ohwbOvY3pvdUEcWIwmYslJ%2BOcxVm3X7ZDlMBTxeey%2BJU5Ffero095SePxCgUa0VU1vh5WSGtY24%2BafiMWC4t5nx%2Fhz1sKZMqrVNKB87MJrDg80GOqUBv43IIzooMTPaTjA70VUomLCAGZCUNH%2Bvb9FvS6agp9KsM%2Bzz7UR1ZP2pEYS1o5mVKO8MC7H8yV7LWPYAAWWDHg%2BGy802H%2B430od5mUUHOhqu0ukLP1F4AyVU4Trl2FDIlSmRdmUfExitIxCfkIIZ861%2BNXtC5Kc3oMQyNBi1C9nZRp8L5CColKv%2FP4xqZ0EY1sZcMCi0A%2B2cqXM6tWkYcjtcCq7T&X-Amz-Signature=df06002b53b6d661cc95fed05a3bddadb67552f2aeec208ff4d499e1ccbc24c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

