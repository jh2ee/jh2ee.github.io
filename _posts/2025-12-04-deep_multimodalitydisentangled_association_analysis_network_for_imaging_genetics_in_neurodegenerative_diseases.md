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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXT76VPK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCCaBPRDZNhyYBZmtE%2BhDDUEimg1nzQwgTm0W2IqZx6EgIgNCIF4UPgudBin2E10hvRqvv06AsZlylr8FPqf5Wws4Aq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDLgObSiUZttydKEPCSrcA3PwXgVvn560yVOp2n4fBXCmBXm%2FmwYEem3yQYp6ko65YqM%2Bp1kT%2Fy0NZpVKGv8b6S22D4tcOdugOD7dvF6rEFrUkuzN8djfT9kZhs6XMVVxM1Zo6j9xBKovYUJgOgYeksIAjSbRpXNpY%2F2W8snFPzho%2BI0aMbwEu0S15Jt7D%2FgGn0L8Gazq71AEwWZtYpjMFA6FY352F%2BdZRisCCQQYEd1cP4RumsaPMStelF8KjTJe322HVpebiGKC5iAdxbwbfWsClkU%2BPB8d82o3TG4LC%2BIgaYCON9yT4j1irkGso63xk6Kl1WlVrwoggpeD7yztehWCXQzYjdHH%2BdhgfyPXT1LIEjCQd4AR7xCzW2uIlLGQXBowbNNLEHcilEKhSHawRAVhzzBnFqVoEor3OgTE1JubIkeUA219BO6jQSIAfj1s0iju%2BUikAto0XUrH%2FxfGB9yOcyiUTpTWrwIhPQXcYgaXE3bg5NuIWCXDAw49i9XC53R2oyw7R1Z%2Bb7WO7MeNeYSxOJZvKCnbYVBujO3uZZLNp3SjXnTXEvLlkbBcV4ifhHezG%2BGymjx%2BqanHXZQqchKY6fF%2FnvOadmWb12I5SXq0nXEb%2BvalPlDpZj%2Bvd%2Flumzgxb87wa5A0JRWuMNWyms8GOqUBDEQ3k95%2Fe%2BAXNtBmphriPeu5T1gAlkqwfuW%2BjZuOGqSMJ2wP4NE4zhFTXVKcQa7aw%2BW38rfq1v3Rp6WFt2Erwj%2FXMonfmvK77zAwrkf1WxiopmDFK07zriiYEBEoVQ1WvzKzE%2B4aBE06Lk66ioMOiz5AzKvNHtLHZ5Nph5%2FtRx63bd3%2BvluZHmDjjZ%2B%2BLuUkmUnrGWcVrkpkO9fnufdVv%2BWMM4X7&X-Amz-Signature=a06ba57f274fc9a74617241ddd65b77a5f7d0eab30262413ec388e70b15a441b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXT76VPK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCCaBPRDZNhyYBZmtE%2BhDDUEimg1nzQwgTm0W2IqZx6EgIgNCIF4UPgudBin2E10hvRqvv06AsZlylr8FPqf5Wws4Aq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDLgObSiUZttydKEPCSrcA3PwXgVvn560yVOp2n4fBXCmBXm%2FmwYEem3yQYp6ko65YqM%2Bp1kT%2Fy0NZpVKGv8b6S22D4tcOdugOD7dvF6rEFrUkuzN8djfT9kZhs6XMVVxM1Zo6j9xBKovYUJgOgYeksIAjSbRpXNpY%2F2W8snFPzho%2BI0aMbwEu0S15Jt7D%2FgGn0L8Gazq71AEwWZtYpjMFA6FY352F%2BdZRisCCQQYEd1cP4RumsaPMStelF8KjTJe322HVpebiGKC5iAdxbwbfWsClkU%2BPB8d82o3TG4LC%2BIgaYCON9yT4j1irkGso63xk6Kl1WlVrwoggpeD7yztehWCXQzYjdHH%2BdhgfyPXT1LIEjCQd4AR7xCzW2uIlLGQXBowbNNLEHcilEKhSHawRAVhzzBnFqVoEor3OgTE1JubIkeUA219BO6jQSIAfj1s0iju%2BUikAto0XUrH%2FxfGB9yOcyiUTpTWrwIhPQXcYgaXE3bg5NuIWCXDAw49i9XC53R2oyw7R1Z%2Bb7WO7MeNeYSxOJZvKCnbYVBujO3uZZLNp3SjXnTXEvLlkbBcV4ifhHezG%2BGymjx%2BqanHXZQqchKY6fF%2FnvOadmWb12I5SXq0nXEb%2BvalPlDpZj%2Bvd%2Flumzgxb87wa5A0JRWuMNWyms8GOqUBDEQ3k95%2Fe%2BAXNtBmphriPeu5T1gAlkqwfuW%2BjZuOGqSMJ2wP4NE4zhFTXVKcQa7aw%2BW38rfq1v3Rp6WFt2Erwj%2FXMonfmvK77zAwrkf1WxiopmDFK07zriiYEBEoVQ1WvzKzE%2B4aBE06Lk66ioMOiz5AzKvNHtLHZ5Nph5%2FtRx63bd3%2BvluZHmDjjZ%2B%2BLuUkmUnrGWcVrkpkO9fnufdVv%2BWMM4X7&X-Amz-Signature=a06ba57f274fc9a74617241ddd65b77a5f7d0eab30262413ec388e70b15a441b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662J6YC4E3%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIAvvcAWbO7ZeEXaQJ7zSGpUWbrSAzuPXug8lxkUFtMu8AiEAsptP4fcAZe0kUlJJtMErfqLrNwZ%2BEjs3fRZGA9hA9pwq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDG3QwRzt5LrqQOcbHyrcA9RtI9HGjSBkOupVqBCOs3qMGKRh6Twt4IBQcLPJ6Nob7X0CF2ZQracMY1UqqJ7IdNAKkFdgebRgkzRoLypMDksoOyTP6vfehKbsimqcncydXkefdmrYZX3Vuqwfw3uG4t1dCy%2FHDdMWRCYWUkdzAisnaWsLWxzglVPom7Y3Lj%2FTnozJdVgDBgPwjWhAmFhromuo%2BpVL59mOTol%2B%2FywIYLI%2FdZenZuM7%2FLdZ1hBBHg%2BBXlzTGPNwilDUSZe6Y26ydIeBBpCdjGusYxviFiFDetcsZt0ZzJpjCdr%2B32JCR2kVB%2FQhXqb9cEC9ZRaZc7SyCL5gmwcCAiJ%2BHnfAi7Oyc747n%2Bv4UKKvkN%2FV7gfiQnbFPbj6qMGOza1gNxq1DfM1OaA7hNx4aFH0mZxAu%2BHat%2F59Vgw8Jqjdd8%2B3zTj0PZh%2FFbyq7OZttoBcAQ5ZcqqpjNVnDdCLoBVSpD0h5Cms%2BLdYdzm8T9dMJLc4kncrmDhy5ohiZDJdusUgYcxfmz78x%2FSH1O7Dx4Wp9fwVexXN%2FL0NbfaDt0olSOS%2Bl8W9w%2FSDX%2FFZrzUlXqu4Q1laXAKLGt0vEcP7CWerhOSYGc%2B5YwwK3fJEYjn55Okn%2Fy4EBGRPbOT7xQ0ZB07KWhSHMOO0ms8GOqUBZH%2BXVZfO9ljAohM6E%2BJ%2FxfgNby1S5tbp1SgJIuBy7k9W8OrKBvQSZjyERS144ponALw8eI2Vr7HYJQyYLR9DeO5d6NtchiqSNIF93bP9AyP9iAgAWi4x%2Bo5WxJvUBrrz3TF%2BHM4JGTWuJCyshepS341vngqdVWCFShKtZQUWYwTLF5BgS3IDu0t3DimZ0qAPKOHe9J8zJ%2FG%2FZIQsQlLtgsbHCTMw&X-Amz-Signature=c3a1696bfc6777c84df97229f2870a288068b7bdecdc25aa1587fc101c98e52b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQ6EZXSJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFJ5UOfEyCdt8S7S%2FLRoxKHAfpS6Qg%2BqOqUaBUmTVkjHAiBsU%2FuX%2FgDZwjsAR0mRbHLVZekvCm4kqNgT%2BYAWKS8TzSr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMipIvlnj2gZxbthEIKtwDXei0b5d%2B8S%2FxheFcpmSJ4VStX5QF7XA%2FWKrqD3o3RcttvRsHms6qR3h8jwN295XNhZdUHz5ug1T30qUtdCUua6a3i%2FzRxRNd0em5dyZjYTyiFhGOB4cyKYBmcGgvKZsKAAH72osZG19yWjG%2BYa8FVZnw6%2FLdfMcWJ1z8JMh6QCc%2BKk5irvoWGJ0yLXAOaru0sxnwgBlLR4P2kwe4FvzCLvCWHcouomtQRHeVp76oNQrOZtDYdVrQB30PoA2Y7Xxy0gEq3sLPfRWruI4i8LB2P8d%2BZzslm%2FqDZinsnRtn55J%2FEOPCVDIr4aEsRhLNNXpBGcfAa01iYkfYnrcB5Fcr%2B5uuh4tsYKH2FAFrg%2BUE45Ajlw3caQXjOGZlAo2bKsYz5wedaC%2BntiOx14xYQ5nXgHlhng%2FNtrJPXIXUetUmiZxcfychg%2B7H%2Fz3%2B3OFC7c8rshzQCpHPbwvVDC9zPgQN6THVm%2B2wn9EYEbqwKNYJDl%2Bf9OIzeZCRrtOhorl1WdSS7OLa8kjwGS3I4gwtiHbl3RR%2FKK8YLvlcHrfkjZ6s%2BJySEiMJ7XoOwa5V8CQls3VmcungB%2FQMDlRSOTDDnVBVGHb%2B9Aq4C3YqMOCWZ7%2BJcTCH2gBMJTrV401Q7%2FkwibKazwY6pgFzgS2CO68U1zL6G3yVDK2S0%2FMSrWEp2eNWx2HtSsYagQFLS2%2BP8%2FH%2F0zdpwiw%2B4g2X10mzzzKRRYaMsMEKMYScXEp8ZEU3gpCpx6zbOD1JfeWZrtI%2BKQLKvnD0bWPlUdvt%2Bk1FYIYdKftBcBTsR5JbQLbmtAspR%2FR%2BAQdg%2Bhjw0AnFTkbyhK1BLtrnTNiWNQkx%2ByGlgKUvNOxuwRz2zHGqlucRAZqB&X-Amz-Signature=88827acede0115e96646108897e2996a55e0c3bf2ed70c8baed50c405dadaff1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQ6EZXSJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFJ5UOfEyCdt8S7S%2FLRoxKHAfpS6Qg%2BqOqUaBUmTVkjHAiBsU%2FuX%2FgDZwjsAR0mRbHLVZekvCm4kqNgT%2BYAWKS8TzSr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMipIvlnj2gZxbthEIKtwDXei0b5d%2B8S%2FxheFcpmSJ4VStX5QF7XA%2FWKrqD3o3RcttvRsHms6qR3h8jwN295XNhZdUHz5ug1T30qUtdCUua6a3i%2FzRxRNd0em5dyZjYTyiFhGOB4cyKYBmcGgvKZsKAAH72osZG19yWjG%2BYa8FVZnw6%2FLdfMcWJ1z8JMh6QCc%2BKk5irvoWGJ0yLXAOaru0sxnwgBlLR4P2kwe4FvzCLvCWHcouomtQRHeVp76oNQrOZtDYdVrQB30PoA2Y7Xxy0gEq3sLPfRWruI4i8LB2P8d%2BZzslm%2FqDZinsnRtn55J%2FEOPCVDIr4aEsRhLNNXpBGcfAa01iYkfYnrcB5Fcr%2B5uuh4tsYKH2FAFrg%2BUE45Ajlw3caQXjOGZlAo2bKsYz5wedaC%2BntiOx14xYQ5nXgHlhng%2FNtrJPXIXUetUmiZxcfychg%2B7H%2Fz3%2B3OFC7c8rshzQCpHPbwvVDC9zPgQN6THVm%2B2wn9EYEbqwKNYJDl%2Bf9OIzeZCRrtOhorl1WdSS7OLa8kjwGS3I4gwtiHbl3RR%2FKK8YLvlcHrfkjZ6s%2BJySEiMJ7XoOwa5V8CQls3VmcungB%2FQMDlRSOTDDnVBVGHb%2B9Aq4C3YqMOCWZ7%2BJcTCH2gBMJTrV401Q7%2FkwibKazwY6pgFzgS2CO68U1zL6G3yVDK2S0%2FMSrWEp2eNWx2HtSsYagQFLS2%2BP8%2FH%2F0zdpwiw%2B4g2X10mzzzKRRYaMsMEKMYScXEp8ZEU3gpCpx6zbOD1JfeWZrtI%2BKQLKvnD0bWPlUdvt%2Bk1FYIYdKftBcBTsR5JbQLbmtAspR%2FR%2BAQdg%2Bhjw0AnFTkbyhK1BLtrnTNiWNQkx%2ByGlgKUvNOxuwRz2zHGqlucRAZqB&X-Amz-Signature=13d2932be9e06fce538ff037fe59ef510c8a4c0e2e51fd786f0f9ad83127305b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAD5GZDK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCwdntljK%2BGvtKSmXd5hnsDDomo47TYwjS9t0fSGowzUQIgCTbZBVfEr8Z3zq7wTW4MsUkal6NMNplcVIKlH1B8KWEq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDGeBgzvz4FMwjtT6AircA10OPPr9tek%2F21Zy8Co76iBj747Q6DKReB0IxxvFxNla8jorOoWBaI9WnLyC9uNgH1UuX0DPOYW37Xrt5AmWU05HVnPKm%2FhTubxVJkmgAmGsaKW2LyPP2RzmDyfUoIB5QoxR3i%2BudfeoZtL8vS3oITc%2F2atSjwjH2qApg4AweVtlV%2B5gNEhiBXvUvwLe%2F5ldlF2GWQ%2B%2BtuqpDozT%2F6g3V2OAYJWzHsWTgX%2FOVUM1YFsRS%2F7DlDbHcEe5vu4kuA2TyrRxhTmeCdd8BGYCNllUtEAc4H6fFm51dp9%2FD7zUxdZLLEzD9jyAeGt%2FV%2FEVcf2JMxQF8zD3gavERkSKynxL9dg2N9KvEHTP2Mtctw82jrL0Ccx1CAvtWFKtGmCHt5rb36Weix%2F%2Bt34kn%2FlsWimwl%2FTIomNZsAa0mL1IbPAB5ZV0F4TE3RnDqvaUOieSD1sxCi57eSjONEEmFxaBCQjr7K4SqNsOH7uMx%2BgWRovDLg%2BTL6sawPD99yFQb9tlUMNrt6VLtaGVUXG5NUJ68aB5UMMEDK48VTqeU%2F2adgoS4kR%2B0hqb00ax9kQQag4a0C8YvAQD7vWqYO8KRO6cFaPuIMcJaEWftS59Qq7dFw4u8O4VDTgXx%2BZe0zrSnz2OMKGyms8GOqUB2QwiSzOUKbs9ubdj6nBO8Xy8pmnU8AxyfE5a9AmwMgtL2U03MSXluLPJdt37PBI17abSRdH%2Fp%2FYIWB8lkhO69Lo8u8h06LWBSQZQ4p%2F2KsIug2AJQDcRYyke3Cv8ROnP1HuVne4%2FfLEyM3PgagfliyL4AF88T0Cf2phdyvpANkjglvvl3G7tf7YSmaTi4j%2BdDHdTosFRfnKydE7DcirU1jPndhqU&X-Amz-Signature=7b4de2d6561ea412dd56e9c294b49f9e6a60519f24c7c7f21797f2ea61cb5f57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS3PRPOD%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIFNYjXNCsj5%2F7HUsDqjozy7PTUVVJSyCR05l4XWpEnCiAiEAuoAmmz7e9%2Fdg%2FKOqHI9WWaBVUEzfjG974RaDU%2FXxockq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDHuejbeeX9Acl5rrQircA%2F8jbdZLxp%2Bfc6ZBwGstNRsWdkyg8m%2ByraM%2FI9lEJSMI7E4%2F8xvJX7dojghaomC1UpxSQolEy3kOPRbMphBOC7AemK1%2FN3yYp7Jt4AvKnCTSH6LyBdLbavQ0jpy5HuTIzrR1RlTl4SsCpNA4LTYRZivvYKyE6DP5MTK%2FxJ0FJb%2Fdv6AHTomRVg4nBKgJD2sgixE5uS4Dy%2BwJ1re33Ug5kGypEgheh0vGYAaDEYC3Fd7Uv%2BPByVbZxbZUtRlQxMtGpSpfwX5rurunqVW20Fq%2Bc%2FMiDz7obIow60Om1ue4EQgF%2BsQnzUNiUl3Og1ufkGMg6tj%2FFJzuJSYZHMHRqn8WPex7yJ%2FWDeMrXDzEEiHwmtMUPHnuIHR3bOHB8Wfp7MBL7MMDdD4P3vtxzzwzOw%2FB0QybEGMjXJJp1acjDYcKfD%2BKh8aUJzSBdL4lPq1UDZPJlLrj72TRscO6IcIT%2FaLh5MI8ovXP11V73GErCEIaVI0ulXNXkdHEzMjmv%2BDSGIccFRKmryfJhOQIbQg0%2BoJAkPDqhc2fD4ngL1DglPg3CwsMWlb9ehniispsbULgVQIN7k3W46sK2opHirzWp4RJ2vhHiZutHUTUf1s0nRyV182Pnduhh79MymAXovX8MNSzms8GOqUBsDWQcz1l%2F%2B%2B7Wbh3JSfLSgOM7z1a20ZjLkqBADUKbI0t0HmYqVMjBdfP3GgZx7hlkJj8JrxZj70mOmTDkl4OO3r4DwU9IoGu4BEhjZEWVB9hkr63zZOe%2FjC1FWrTspHblgDvBKWPG%2FiAGkJiFkw98PCw%2FbYwLUsdq3mCJIAkgX5w9sFxbungR3QjI7%2FskA0VNpplfx2SjC7oZXLUG3tZ8%2FUR%2BNN0&X-Amz-Signature=ece9794fa2e4c74fcfbafbc9cea8bfcb08f2414e9ea65cede9ac1b60d16e89c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642FLWBJ7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIAaHK8NEI%2BSGkKRg7i%2Fkunsac9yCjh5V0vW%2FlYSIXBA9AiBrE5IPIbN9VEQWvZRZ%2Bh3MLkJ1BCv5C%2Bkz%2F4DdyPb9myr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIM9sCxlGAbzyIxqdh%2BKtwDDgWRa8QSEqYZyxutHBHd2eHsPjK6fFnqArC96XBdXxba2Xgu5j5%2FHSm4AyEeLBeKgAPZGzi2gG01MPssSJ59s7k56Gzjm9DUkFYDOFncc8aoyEgxuRSinH%2BP5jca5B9LTOTYf5gQe%2BLhHMWZBXGiHEJHus6NRCtDJsoRQtZqGBT8nX8S%2F3g9pcxQd6mPPkkb27R4eNGdSmZPaZcxOdB9Otu1E0lhVwBs38cpkCi0BvJYHJVhmU935jNxFmy22muSsMeF5Qu%2F2StlbgocreWzp2R8RTOYerrgzVUVURPzzSACkKj4r8uqpY71uEiZSPanwHD0mgRhvaJPs6TmgWlPBLUjoATCzi0ZCXJ3%2B9i7UHP021Mr7%2FPoNtsMGCF68IjAb479BwNZ1oKJchgwdR2hqq%2F%2BxKEPOrTDuVzxIHOCz37gStnXfHxdS9D3l2Fi2V8IHvMJeto6VYJD5F1ksvuaz7HSyFQi4%2FF8fCNMHh77gKf25W2HUDboO8vzYhxyvHwzWnt5XMhshcL58QkR5VoFP8l03hPAvSpDcG8kST%2FWJRrLXIBRRI4tXTg9%2By7%2Fx5ZPt6g4%2BQytEd9rNWn2jHhx0cFzyJQkqgKEMtbIWO4IyKMYtFSSwM0IDaZpQlgwlLKazwY6pgF7QVcQ7Vs4%2FoNBjEExP1%2FdbYSM9q5mLMLllzBf87pyaKI4VqwjeLhRKIZaWOO2Ya3cai5ev6Yqb%2BhWx18LDs6Nux9C3LeZd%2BWkR7%2FycxYAS9NALbGIts8G2nyp2%2FzTK1Lhyitmz0cQVlne24zJcUn9%2BtBmPtQQbHNq3vFWUjSYPKZAicY464guPazG89Efyo4pFK%2BInfEFulxsTBxHkHCQyR0oFXZl&X-Amz-Signature=b5b9a271cb69936eb416c1997c26f6ebc4625cd454eb8f23296b5bba91801922&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675G4232T%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCKPug8wxwJ0h1y58hghcZcDDM2XmpsZMNTnfCUVZTh2QIgPuCZJJR6eKmUXbvNrWA0xSIOJVlGBRUgKMy2HqxpLasq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDNyWGXL%2BltNPnD1hpircAydWCOtGBRmsMAwzxit4C8HJf4lAk6Krz95HhPPPsmqXarYKbeAPWacEae1j37hjr6vTcwjSh8I3dvKHgSkCdsIHO7ESjCeLh8oJ8UsWkMxda3%2BwrG3ikwbBr4bMhbPH5RZd%2FimGZE2gSLKDKmHaqnxKRrvIWo5WAdHXJ6wKdomAWzkaCM010sSv7C%2BXin2UsKTcGsEsKhHUdNTrGjOgHPYr4r0Tam8wmyyEks4h%2BswHuqcz8fQEkyqVDc584UxB%2BoOhY3rarZU2Fj0LwOY3gh45akJXvpZLWmJ%2FhnrFqdZ%2Bck78ypoxepqvyBvlooY2eJT4NPhrUjUbFuUhZ%2B5mXWmUSWB48yS6A7gKqkfT7IkMqybTkXsSCjYlaAM2Dc3DKC7JRks0y2GoL9TNKAWbvKq0daA1guYHkEqugVBBOx9bt%2BhgPJUDGCxZ9SRSL6fFt%2FCZo7QBJo1YWANR8s5T7T8X74EGuLev4PQ%2BJL03gcKNA7OtIzP0zNoEKZvwA%2FRpyXjlUEHjB%2B3DgrKP59nqGgdmY0QgUrHpkxkrg20K%2BxoMWlJwpCw5y0B8FONmMoGqtIH5LZucz6AVuYAmUvy8tOB14xo6EW6S%2F7moLJb%2Fzqx0QSM3rfWuCP5z4z6hMLOyms8GOqUB%2BivYjkism%2BeSqtm5B3Aq4nTH0%2BtfmMdLcr9jVrmNpFFXXPb6677fJCrjtZL%2BqvYjlX1EVnH6iCcIQPwUaUZC8bQKla4Vze5BXJ9Utbpnf5kkHCthMRyhKGpoHZF451lpHZRwqcQrbuACIz2gUNUa32lQhtPMwX5%2Fbm%2BT07743gqevnnSOHBf2BTAE%2BMnOKb%2FrFWVMkMjabQeGl1CrkVtxkTAylSM&X-Amz-Signature=668b9ceeb314939b0118cb21258a5c24195e603edd96cad740f0239552955897&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675G4232T%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCKPug8wxwJ0h1y58hghcZcDDM2XmpsZMNTnfCUVZTh2QIgPuCZJJR6eKmUXbvNrWA0xSIOJVlGBRUgKMy2HqxpLasq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDNyWGXL%2BltNPnD1hpircAydWCOtGBRmsMAwzxit4C8HJf4lAk6Krz95HhPPPsmqXarYKbeAPWacEae1j37hjr6vTcwjSh8I3dvKHgSkCdsIHO7ESjCeLh8oJ8UsWkMxda3%2BwrG3ikwbBr4bMhbPH5RZd%2FimGZE2gSLKDKmHaqnxKRrvIWo5WAdHXJ6wKdomAWzkaCM010sSv7C%2BXin2UsKTcGsEsKhHUdNTrGjOgHPYr4r0Tam8wmyyEks4h%2BswHuqcz8fQEkyqVDc584UxB%2BoOhY3rarZU2Fj0LwOY3gh45akJXvpZLWmJ%2FhnrFqdZ%2Bck78ypoxepqvyBvlooY2eJT4NPhrUjUbFuUhZ%2B5mXWmUSWB48yS6A7gKqkfT7IkMqybTkXsSCjYlaAM2Dc3DKC7JRks0y2GoL9TNKAWbvKq0daA1guYHkEqugVBBOx9bt%2BhgPJUDGCxZ9SRSL6fFt%2FCZo7QBJo1YWANR8s5T7T8X74EGuLev4PQ%2BJL03gcKNA7OtIzP0zNoEKZvwA%2FRpyXjlUEHjB%2B3DgrKP59nqGgdmY0QgUrHpkxkrg20K%2BxoMWlJwpCw5y0B8FONmMoGqtIH5LZucz6AVuYAmUvy8tOB14xo6EW6S%2F7moLJb%2Fzqx0QSM3rfWuCP5z4z6hMLOyms8GOqUB%2BivYjkism%2BeSqtm5B3Aq4nTH0%2BtfmMdLcr9jVrmNpFFXXPb6677fJCrjtZL%2BqvYjlX1EVnH6iCcIQPwUaUZC8bQKla4Vze5BXJ9Utbpnf5kkHCthMRyhKGpoHZF451lpHZRwqcQrbuACIz2gUNUa32lQhtPMwX5%2Fbm%2BT07743gqevnnSOHBf2BTAE%2BMnOKb%2FrFWVMkMjabQeGl1CrkVtxkTAylSM&X-Amz-Signature=5578e84f1426d171ef334edd594b09c0b16d6f54f6df336bb1c8707f732b07dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YF4ADQE%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQC%2Fi1QEyTkdJKKScJF0%2FlLBDp5O3cZ7NobqthGAooFvIQIhANgFsTwKPcQ4Td%2F7ViLqbFiUtwGYjX7tZB0XuN9IhF9AKv8DCCcQABoMNjM3NDIzMTgzODA1Igyr44fjjAXKJfXbzEAq3APtcQN4ZEcbYlHsVjkqMXSQ64ZvaUMcWpsHsBOQhosGfnG6EEPh1Oze0hzfGGUK9SI3CIu2WidcwiO1FcE9Dtl%2Berubu4O2GfJn8umBEALrZBgZI5dZhX7z3URLBfhMAhd%2B3An07eB4GGBjYghocxuCMRiYfECuQ4nZaSdRN1qsjcoQ%2FlwpNd6m17787eyl73OeRy0HmMJ%2Bv1Sg68fjV5uOMJjgHKpwwDCN%2BTsEOW4pWPIKUX%2FflhgWZ1oxrD4kv92HO6YelAAdNvXVyxDIejepv%2FOic1cUyDfx%2BjFRRJA95u5m8twYZEx1mQ9CTtUzeybdHRFZ6gGx%2FOaUv9CQh7bnDptGRMVwPOg3Aj%2FYscsQGhiWixlyuVOYjytUSmi%2FyDpJxxvOxgeXx3%2F0%2Frjig1we2ph1Klo8P8oXnqqhI7byipHMyEg%2FxdK0sTnex5%2Fpcy%2BuOzLHWUXxH29YfEn%2FOckNswW%2FJclTtGlEiAqKgj%2Fq1pT0%2ByRALsQL2E9%2BLXkoyI7Wa5Wvv0Vg7Z8VqMcZlPyaxpQTPeS2B5bCITS3Z1jdqye1EntudxQGsUmSEfajrUAinC39CNivVc3qRrmCcR%2Fb8sTvYQ8ENQgXrx7POGB4a%2FPeBBe9bClmRM1CNTCGtJrPBjqkAXDzfl0SpzKUtzG7fd1ZLRapqJAahizU04IEviGBAhpvHYXTmpzUSu1viyf7pW%2BbXEtdPL8qDwRWMSBelnZyrwf6S4010k5l9JZf1J%2Fhk0sHYN%2BlMJBsYI%2FNf8I8ROZdlL%2Fx7%2B%2BvctC2%2F0WIseM5%2FyHDnJLMQQYAF7limntyOcuIUoqSWGQeW9Qj%2BOm5lv5wHcAZPkOVikgHD1FMegGikI74CPQ2&X-Amz-Signature=b6b6794b86fa62a4897bdf64bfd8cc118298c602261a2227afa5bbcd17c15953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y6AYVMD%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIEJ4Ar1k40y5JaYcQJqHgHGokKt8tG1QiVrCrcAoUc94AiEAxD6lHWAAOK6i83srZjmwSgzwfJCqdA8hgjfnkmQHZ14q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDEG7cDdQOd8KVHwwzCrcA7%2BjyodoxVErQTWU1eZ26o42iodWXpS6Rv9TGWB4PEhl1UbdW%2F4OY%2BfZyYmU%2FUPQUW6fYZGfCeEENcaNAMeRuFmvB%2BpW9fGFRG5J%2BjbeAg0YKCJMywNcL9NXMs0ljU6qj0YougtnegUhOxVYLmDLMAhMEfqYjxo8sTF1Ns7LwoGo8fxwTBdLX%2FrwVQtXHywKcePaytukIeKssYlVpYlVElKUkGffJyPBhJyl6zKS4jsFPSDhHRM6gCx%2BruxZ%2BOpZQVbbMozKXsa37c1RePyLb3Gy6j%2BcZj30m6Dqr9OBGj3Pkfyie%2F3EbXRtNawpNqvFO%2FFdKLd%2F2%2BFd%2FNA5JlYVaPl%2FdUyRXRg%2B4EeZ%2BlXhEoFFX2G4pA9YarRQI0UtXK8Zvb5csFFiQCqJtVw1wx2Ji5sa99DDEsN3LkY%2BSHB4hgakuhx4wPwGg5xH4GddHPkvDn6r3Ii5RMOGGQWy6ukzF4i9LrHOZ1RPZQz0Mp4DK3pQcJeSHIoS0sStzkppGMg2vDyr2lAV9N1y49NTQ6pxQlRMYUKi3vGYUwXxWlgIg0w666o2JCQ5KYaRhuoHw77ovTNDDCzr6SyFD0MwnvPSzeRxjG89AMKLHK7zcm0hD%2FlO%2FKvyFjSjDjmiCUhWMOaxms8GOqUBIIq7LVA9t2P0VroKkuH9Q6nVNQi9TrGLtSL7tBzMU4%2FPpPUMHJMfQBEZlF7ubetR60Ni%2BSzGhKAonzTfXiU84%2BEHdY81jjnpjNsIaOD9Ttukm29HmHox19LuNSYk8dsncpbjiyZIwbYoXlEmHhVg%2BANbiS%2Br1FQ1JbmWnXi5OZUlrEWiEAJ4rDNMRqwVc5sYgT8w%2BbK5cryBB4wXHe9oG8JO6X1%2F&X-Amz-Signature=7ec4e73f7f71ee35afb2fa4829866a93128c28a8b08845742fae56db75cb7211&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y6AYVMD%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIEJ4Ar1k40y5JaYcQJqHgHGokKt8tG1QiVrCrcAoUc94AiEAxD6lHWAAOK6i83srZjmwSgzwfJCqdA8hgjfnkmQHZ14q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDEG7cDdQOd8KVHwwzCrcA7%2BjyodoxVErQTWU1eZ26o42iodWXpS6Rv9TGWB4PEhl1UbdW%2F4OY%2BfZyYmU%2FUPQUW6fYZGfCeEENcaNAMeRuFmvB%2BpW9fGFRG5J%2BjbeAg0YKCJMywNcL9NXMs0ljU6qj0YougtnegUhOxVYLmDLMAhMEfqYjxo8sTF1Ns7LwoGo8fxwTBdLX%2FrwVQtXHywKcePaytukIeKssYlVpYlVElKUkGffJyPBhJyl6zKS4jsFPSDhHRM6gCx%2BruxZ%2BOpZQVbbMozKXsa37c1RePyLb3Gy6j%2BcZj30m6Dqr9OBGj3Pkfyie%2F3EbXRtNawpNqvFO%2FFdKLd%2F2%2BFd%2FNA5JlYVaPl%2FdUyRXRg%2B4EeZ%2BlXhEoFFX2G4pA9YarRQI0UtXK8Zvb5csFFiQCqJtVw1wx2Ji5sa99DDEsN3LkY%2BSHB4hgakuhx4wPwGg5xH4GddHPkvDn6r3Ii5RMOGGQWy6ukzF4i9LrHOZ1RPZQz0Mp4DK3pQcJeSHIoS0sStzkppGMg2vDyr2lAV9N1y49NTQ6pxQlRMYUKi3vGYUwXxWlgIg0w666o2JCQ5KYaRhuoHw77ovTNDDCzr6SyFD0MwnvPSzeRxjG89AMKLHK7zcm0hD%2FlO%2FKvyFjSjDjmiCUhWMOaxms8GOqUBIIq7LVA9t2P0VroKkuH9Q6nVNQi9TrGLtSL7tBzMU4%2FPpPUMHJMfQBEZlF7ubetR60Ni%2BSzGhKAonzTfXiU84%2BEHdY81jjnpjNsIaOD9Ttukm29HmHox19LuNSYk8dsncpbjiyZIwbYoXlEmHhVg%2BANbiS%2Br1FQ1JbmWnXi5OZUlrEWiEAJ4rDNMRqwVc5sYgT8w%2BbK5cryBB4wXHe9oG8JO6X1%2F&X-Amz-Signature=7ec4e73f7f71ee35afb2fa4829866a93128c28a8b08845742fae56db75cb7211&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFV627AR%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T223048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQD3SRapeCtkmXZhnW1PB72iAzETwR4Y%2BmR1giZT06wXXwIgHZLSnQ64p7gxmdwB2DgjAJynLlYwX9QpEHGupgPtXh4q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDAiZpXQqfAQTpMcEhCrcA1Zi0EU2pF82h9LBor5TOO8Vvq52ugAvcz4wHBq7dP9%2BQIJ7LNEiFm0%2BdcR7I09BEK%2F5EsxWwhlKKjO4wSXl1JoE2TWZJKHX4I5ywpvhV3qBbW1vJLB87iVipeDK%2BRBQMDGyShx70ZmyJH0jpY8zWJ5Efs3bcF%2FrhEnWlief22P8AW5JIlJXFMyABvBdFQqAhfpd3t%2Ba%2FEEK3YP%2BPbq4bCpY4OLnl%2FCwAsHrKfagCgdl532w9SAAweqmQM2rSDIDOJEc3OGRrHbzyQ8Z9IhR7PLhcHc%2F2GMdcM7TS1ritdeKRsoE09F7xJuKwR1vHoZk1IqPz2YFsOiYU7O3WKY9INc2zSqo4aTxNjxWuZjowFDCecUVTAN2D6M15JoYeQKKLzsmtRszvJxNm4KIMtrWWOokw%2BAcFEQFX5LB8FImb02bn3uYjUrSd0JwvdeFqAggIB7Jvyl1Q6R0xXOE9pUjt%2F9FuFKY7VALf%2FJCAg5z6ediwXSPyMb0dwjmyjwk8US8DUz0tKveIB21uHXh1PXo%2FgpDDvAu0dj%2B6bfin%2FcSBPaiJHciF7DJ%2B7jrL89Lbrbpvc3sZBcGiFiGEYoFQJ5WKJVG6MapxRJ76eFh01KOiV3GAF4KkfSFcigpYFn4MMSyms8GOqUBm46tNQ1GKGNu6Ai5MR9bcux9LAFztsofcMfTx%2FcRe6jSJdL9nKQvsaIjzknZFyl7RMA9K2SSJXNV1EBcauRf2pYJ9g3pSgQp0iISgqWhTcwrBLPlQ8A6gJiAlybFKvYcZm%2BbAXW%2FVHFRWHMJEuAGsKYOuHAhGCHuToktx5VkDn50loctBvjAQlRPg4AruMObcl%2B1ZCDI0C%2FqBVxIZwVYxf6ls4%2F%2F&X-Amz-Signature=976270ce709072bff435c73fef9726bbab1d30b649652e7fea07b3fdeb9b48d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

