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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4JU65BB%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIA%2BRdaXCHLGP7T%2Fipc%2FwpxyuiZAfCYPVurgxtxZVlWDHAiEAn5k1Nt9vUsDMqy4DrvdIbrtIMncSqbJ5gReSl9KU4fYqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKNBrm8x%2BZNVRkzCdyrcAwy4DyIyxo5RPrQQcoub5rfoBBUV3j0FJjmJRGRpOzMBr1RO%2FZBmwD%2F%2BatphzHBpQz4TnbdSJEj3kXJLqxOkXA5OcWIBB1xAnLcx9z9vmEkWY1ZJgTh7scjQJbaeqv%2F%2FphMqBqBrOTztTrAJ3iMmtQkfqVhx2v52CsGk2EjSnnrE8wlcGl90AxaNzGM9bO9VYB5r1tidhlSeHXy9GD%2F7avTwNybwo3canLHnuVMuBqexBGbIdAvaRddGSTsfAURiAv0lNa7A1c3qAb3jcG1Voi8N5Jrlw5x8Srx1NjrWBOH3F%2BPPcWedX2P7%2BAA6TDtrq4HEhCYimQ%2F%2Bc8z82rbr8VKgeFfXywRY67m8iFkWsqXeRSrpgOSYNA1ULeqImZuzBsq3FADOgvqDmxQcUzKN%2Bohi6O4iwyXKmwXFY6YwFBp%2FDXwJ8IqxDsIqhEDgHUKMYiwX9JnBPCyAE%2FFEOvuwfnbuUh6Q3yuvtpgmz0zG%2Bv7u1o6wHHPPlLjEyswm9lwLDR7%2FTTnUcB4IrKzLTBuo8Ntm9x7BeXudRm0hxSAQMyLnT5oGn41tco3yabZ9l0MLaXiohl0bg7zzELVbqEBk4a16f19zA01oRW1%2Bnt7%2BbO6fuTiAvnDaZDhDFbrBMJbaps0GOqUBp%2BhEB3aKNxtDeIxGfJHoEZCLwi5J77sJpydS7S7IUoTweBI%2B%2FgxPdo1pDWSB57SfdYK%2F3pQULFTFUGsn10goAzQqYUMW3JpCJYb4d%2BMZj53vOvPn0yEch7ZyHexXhOpRq4273jxgqnYChu35k9nu4UWljtk5nS47bUH21ztnram6rdWWbF%2B8G3oLyKDx0nfkWTiGcvHrZl5l8Clepvf5YgpNxriz&X-Amz-Signature=82e99ba06e5f5159640c66ef59ab85d98685dccbc139b73fd25a58ceff0d42bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4JU65BB%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIA%2BRdaXCHLGP7T%2Fipc%2FwpxyuiZAfCYPVurgxtxZVlWDHAiEAn5k1Nt9vUsDMqy4DrvdIbrtIMncSqbJ5gReSl9KU4fYqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKNBrm8x%2BZNVRkzCdyrcAwy4DyIyxo5RPrQQcoub5rfoBBUV3j0FJjmJRGRpOzMBr1RO%2FZBmwD%2F%2BatphzHBpQz4TnbdSJEj3kXJLqxOkXA5OcWIBB1xAnLcx9z9vmEkWY1ZJgTh7scjQJbaeqv%2F%2FphMqBqBrOTztTrAJ3iMmtQkfqVhx2v52CsGk2EjSnnrE8wlcGl90AxaNzGM9bO9VYB5r1tidhlSeHXy9GD%2F7avTwNybwo3canLHnuVMuBqexBGbIdAvaRddGSTsfAURiAv0lNa7A1c3qAb3jcG1Voi8N5Jrlw5x8Srx1NjrWBOH3F%2BPPcWedX2P7%2BAA6TDtrq4HEhCYimQ%2F%2Bc8z82rbr8VKgeFfXywRY67m8iFkWsqXeRSrpgOSYNA1ULeqImZuzBsq3FADOgvqDmxQcUzKN%2Bohi6O4iwyXKmwXFY6YwFBp%2FDXwJ8IqxDsIqhEDgHUKMYiwX9JnBPCyAE%2FFEOvuwfnbuUh6Q3yuvtpgmz0zG%2Bv7u1o6wHHPPlLjEyswm9lwLDR7%2FTTnUcB4IrKzLTBuo8Ntm9x7BeXudRm0hxSAQMyLnT5oGn41tco3yabZ9l0MLaXiohl0bg7zzELVbqEBk4a16f19zA01oRW1%2Bnt7%2BbO6fuTiAvnDaZDhDFbrBMJbaps0GOqUBp%2BhEB3aKNxtDeIxGfJHoEZCLwi5J77sJpydS7S7IUoTweBI%2B%2FgxPdo1pDWSB57SfdYK%2F3pQULFTFUGsn10goAzQqYUMW3JpCJYb4d%2BMZj53vOvPn0yEch7ZyHexXhOpRq4273jxgqnYChu35k9nu4UWljtk5nS47bUH21ztnram6rdWWbF%2B8G3oLyKDx0nfkWTiGcvHrZl5l8Clepvf5YgpNxriz&X-Amz-Signature=82e99ba06e5f5159640c66ef59ab85d98685dccbc139b73fd25a58ceff0d42bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4JYT3SP%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQC6BsnKCqp2VhR9rbWnNLsrDfxgE5OQKqwadxDYAwNDxwIhAP8skee6yTKhui%2BRSrZB2D1NwBRsHoPmLlHk2WvH2u71KogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx2xjL2qOCOtSe40UAq3APWU4Wq6AmF7xMCzk58agaZRZ0a7nDxBIm4ykpM7s86piedlcEhoDpsGVjBAIm3B3sU1EF5nSNH1vNzhCg7Bx%2B89Z5vYw29zX1TsF3KXbyfCSq7SvFsBWjWA3SJ2WOLPnUjf2VjxaHy8sa%2FBgB0%2BgVyVcKtSGWLaNFXjEsp26nqAZ4hGGMdU%2F3pPkFH5Oe4vgE6BBar9dFTKEEQtHIXNajmavbHT7lZv%2FG2a%2By%2B2TqqvQGmNvIzQrGgl%2BKRwL3nqnVifFXT%2BIciBVXeDOuHixrTcN8fXtTuaXElA9E%2FQyXP21jBpylt2xc5WkyLZX7806gNP8JIL3IP0zjzJZbbtfo15Ljc4jOVZA1Vz9fsMsxv2n3CfNl%2FsxKZvIVJQutNr0xbfu9l4AUt6Z5223zWKKTX5aFkmpdSVxgZdQXIINYouX4954J9izeXlAybW6QynVJjfr4qrJROfofI2VkPMibmpItTUJWy7YNghCugHKEd2bxLDojVi6gBLA83ozEhX3Eu3tVQiR%2F0l7lvmQRVM%2FT%2FfwXVNZHXytQe2hzo%2FzCxLKG0MLpMk1miL4WCXXTy0LnsKGg%2F8rQveB8hwrp6La0Tdnlw4H4XrvutVe7HeyrvmLEovBMG81wL%2FAJByjD82abNBjqkAVmHMYV7eAXqU6NSAXkWIRdIGnnG3YAdQpKpT6mC%2Bf2OwvuCggBZ127oQHit0F9%2F%2Bg4yixV0%2BEOhgXVKVUKCQd%2Bt1Pe%2B3ZoIH4egtYzvzsoUKWDeJRQKJXaMlKJGVJqIGlbqbS%2BRRz6AFPjolcGf7HgL9DrbXp2YuwoHwKMlp%2BARuzlF%2BibefWXeMN9hh0MOAkVFrQFRX9g7tHmYW31FsGXI2Tz7&X-Amz-Signature=13cd38ddfeffa531cde5f8169bbec97d28fb77d08cae94b65ffda25d8391e4f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MPGDQ2G%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDejRucdl4vugSk2yyziGMs0fHA85vQM%2FWF7TtorRgy5wIhAIj7KQxj3jIoal%2FlqW7qYM%2B7o7eRuc1NznDYi7K6rAMXKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzRdHcstS52FkOZGbEq3APFt6F6emFF%2FnKF31OTg5knaCTKaggtyI8Fdr62c%2FjOEy0xl7AhUimrMDw1Wf6itLabmfTmh%2FbJnlkl964GI3q0uu4oNU0dZzBfouwBbGd949t%2BnPjBXhfUYPmRQzOJD%2B3st%2FGeQBZzd2zE7DYgbaljkkx5EiYQOSlvUv0LvDKdbYJeXr%2BO601Z02AuN39wwPt9yFZkLZJh%2FgUhltp222qL8P99JjWojcbgyKeCilfNSlajTmWGnAXVpdg2lPyxDGlbjJ71X4Q2WTwXcwASLVVdDlCqKhoJK4mFRSQZkGWbEFh7w097mcQjj9u9YfHEyWlfyJEl85s180l4lC4zO5FN5sZwCO6DV609gJuBO89cb3oNTdwENfoi0xYs%2BVuNLNP80QFitELlplbwBRG2yZ3hQakKJsHHksEVla7JGCs7Rq7gVbOzOr2yD3ICm8ij6cgodfz5WGPpveiwu4%2BP1%2FtafLQhHMkZc4PqcV%2Bj4k86DIbSk3jbpBpbN1ekULvKlTH8oxSkNmAc63NMfzjoFQ5V5Q50HJFQ2fiz76Gk21PhWAYSUcKYz6O3%2F130eSj8ZbCSSQBCSDVqIQqpaZMMc2JIFFsMykoM57jsPjpiwJB3eLRcF6pzYTjDaArEMjCg2qbNBjqkAYYJusHBBzzDlebK5lMeDJTbnda9MOiXN6BVKSOBQCcVqdP%2FMneiIPM%2FAI1Sk2%2BYRQllFNIx9e2hvHYv%2FHCPVDjBZzWh7nzJjxrxhIGwXu%2F%2FpU00W0%2BxTzkfNx9goDOcY9tk63NQS7WXnzInnFop0Hq%2BF%2FelqQIH09eb4H2vamIVXwFuwAMMDnviK08hy0JwOb7aUpXXB2AhRAAuro2wUvI7vhzs&X-Amz-Signature=874469479be7a0462d795b62d2eb4e67201f49ad02ed0840904f796a9fb28b6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MPGDQ2G%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDejRucdl4vugSk2yyziGMs0fHA85vQM%2FWF7TtorRgy5wIhAIj7KQxj3jIoal%2FlqW7qYM%2B7o7eRuc1NznDYi7K6rAMXKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzRdHcstS52FkOZGbEq3APFt6F6emFF%2FnKF31OTg5knaCTKaggtyI8Fdr62c%2FjOEy0xl7AhUimrMDw1Wf6itLabmfTmh%2FbJnlkl964GI3q0uu4oNU0dZzBfouwBbGd949t%2BnPjBXhfUYPmRQzOJD%2B3st%2FGeQBZzd2zE7DYgbaljkkx5EiYQOSlvUv0LvDKdbYJeXr%2BO601Z02AuN39wwPt9yFZkLZJh%2FgUhltp222qL8P99JjWojcbgyKeCilfNSlajTmWGnAXVpdg2lPyxDGlbjJ71X4Q2WTwXcwASLVVdDlCqKhoJK4mFRSQZkGWbEFh7w097mcQjj9u9YfHEyWlfyJEl85s180l4lC4zO5FN5sZwCO6DV609gJuBO89cb3oNTdwENfoi0xYs%2BVuNLNP80QFitELlplbwBRG2yZ3hQakKJsHHksEVla7JGCs7Rq7gVbOzOr2yD3ICm8ij6cgodfz5WGPpveiwu4%2BP1%2FtafLQhHMkZc4PqcV%2Bj4k86DIbSk3jbpBpbN1ekULvKlTH8oxSkNmAc63NMfzjoFQ5V5Q50HJFQ2fiz76Gk21PhWAYSUcKYz6O3%2F130eSj8ZbCSSQBCSDVqIQqpaZMMc2JIFFsMykoM57jsPjpiwJB3eLRcF6pzYTjDaArEMjCg2qbNBjqkAYYJusHBBzzDlebK5lMeDJTbnda9MOiXN6BVKSOBQCcVqdP%2FMneiIPM%2FAI1Sk2%2BYRQllFNIx9e2hvHYv%2FHCPVDjBZzWh7nzJjxrxhIGwXu%2F%2FpU00W0%2BxTzkfNx9goDOcY9tk63NQS7WXnzInnFop0Hq%2BF%2FelqQIH09eb4H2vamIVXwFuwAMMDnviK08hy0JwOb7aUpXXB2AhRAAuro2wUvI7vhzs&X-Amz-Signature=ebe152e1ba200c31a37ae73242027a6432c2678681571cfe559f4f760c5e056f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHCSYAEE%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIHTT1d80vdLtSkqsLIzOIMGnxkM6GsLXcKiIguVzB%2F%2F0AiBHkO%2BU6%2BjkmyOZAc0V2uUvOvl3r%2F%2BVjEux1sRWAHCeASqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZpKHxgQ9IPfZMnZDKtwDbUnwK6O2lIIhHOaqcVbWJFXG2OBEjYSLqJE5e4a9xXz%2F4PRCPLQYxWjae851L4c%2FD8Xkro4V9LBFeGBXbecZg8vB72mIi5%2FELXM5QMZVYQidqMqAiu3RFGhqyHHYRXGNrhDeEDS8j3cq%2FmGMT8lsIN0vXVYw7OuQ%2B2QjZMOkgZz10qq8xTSMhuq7MW8PikgNbHpRHZ9I5kqPhUHIeawu6Gkw7jnTJ%2FzSWLUs2P1VExWHm4RwoqEx33oOUAIpiA9TO9JPJwDAgPNIimhKiHoC1B%2B0Frw4K3iPtnLWM4rL%2Bqv2JP1yXTYyMGenDQakAY35%2FHfG4Zrt5c7vvzJxEHEBZ0m2kY3Y546BZrInJCtj0ndP5%2BH8xmDT4NkKmfKFfq2Ks4pzWs0xXGhfXMsGvB1MW1snjf%2BUOxQXjobOWe85Hj%2B6ApPdtP%2F0m0sGUu7v%2FRcow3%2B4cTjZiYrpL8Es%2FAD5tKlHHpQDaeGBU34nPXA92evtljv2Xc1CiLQVDb1bfMGIW0mxwrydyak1z9yIYil%2BWmWyGwSB4WROerB1ZQMpOqnf3BHlPsv0JwdinpYw0PMwjC7c63GHNmHTqmfU4GjoR9hnDxPB89r9ZVz9TRw7TrkfsTUemrbXd9d2PMUw9tqmzQY6pgE1IdQQVwRA36JUGMJl0gj0ti8o16khYxCctfzUQwQJX%2BF5whnkolrYSysP12gQeHbBcG6d5A0AuvvUUYZweEzq%2BB58Q0FxeWFbXyge8O62HR6ZeBFL0TYL9LKiD4Gf45SgJ8UkSXaHt4CToWJShuCQf0cBzl9PYWhFCwtHpRSsiYysufs%2FnEv%2BCyARzsL7%2FGcGNysJy0yyhAiVGyMzF1dbxN%2FTSjOt&X-Amz-Signature=062fece8bfc6686cde44655be157942e03f51cc9a557975c60051494f5da1462&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AL5LQLB%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCQyzJ3yx%2FX1OYgmYJyhSurCx075TE8wZvujrcnlaNmLAIgPlpFpW1uKWd8vxqOjjbDrEg1AQCVYmzrMIhvOetaoxYqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFkLbmZv2lwedtgjlCrcAz%2BCOGba85i6c0VcZeH%2Fn2Cz2GbFDd8CKNTQtnmzw%2Fjq%2FXBBQxzInkGcE%2Fdr1bN%2BiD%2Bm5rqvANFQue8D91T54VnnwRmUxPAWR1lRDYSZNAL%2FaPbRRQAkDWyu8upI01FEI38ML6%2BebYn1uagxRgF%2BzSsmJ1atSBnRbc1T6d0LNA35%2BHfC6xDCUfUg8KheMqo%2Fc83g4%2FeFgIuHn4XALvWhz9VJ993CBL%2B6JaDfX9%2Fnc%2F0pg%2FopqknahhN8s0gGhT5u1f6VGOaH4wZAQorFdH9wos2G0O9keH1oRb2pUU515TOpGe0iFnfixoGMVQUJt5E0mWdqKgp5fWx7F4HFzfPbkWqqlWBv1RaFSSss6xLkLLoUZn9t%2FyPQOgvve5FOWfDEg5MK85xj%2B5c1xJgmdu4zeVuroIuKXPCvPi6nB%2BimLRE0ePmOHdUY6fTOu0dat8C0%2FJUr%2FwEnUbOcS841UHvHS7IEq7D9xyqvvYLiBPyvA%2FnyYmSSxyGL211ibO7rJ0A%2FaBWTY4t3%2FlQshjDjwVT%2B5ML%2Fi%2F4rBkBg7xd%2FwJnb7qlxywzjOa50R9cOckh%2FuBxC5%2BQ9bzgrs2ztMbL5lrIqWzedHqg40%2BFzkDVUScw53XfvdhelVvb1yJ4%2B1nDGMJraps0GOqUBWHBW3BJAxd2gBcuavjLP1LQ42SXFFPTwfgi%2FFpipYunwpG7%2FT%2BKU%2Bkqrul5oFnC4qdgwbOIcITSGeNypFitZ7yFDrIDBkzSW8ZxZWy2vd2gxoiRI7jGEvQn7mMRyPawJ0K1ye%2FbVQbGS25KCRDZGmIkjh1KlnxMTEPVsM5vpDGMFpPg8piwKGNj1MfnvoHg6MAKXWZaAt%2F2Eva1LV9C9HLquqPXI&X-Amz-Signature=39622ebd8aee7771d800f60c6fe172c26810440bc3480483ff430ec40a9d6311&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSGHG4JU%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIChSgTXZAbK8o4f7FE4lVABVzLw6fyhJerM%2BaProozedAiEApijt5%2FKeWh2EZ9kMLjvTuJdaDvzaqaAhFiUnr2bBk%2BcqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLL4GiKMHto7WsawlyrcA%2BMoCWL1kGiBRGY7qZdzJuhood7FQsQNKr1jKRA3wv3hHL1RfZf5YBlZ02iRpYTzv2A8%2BPy7O40CM94d%2FhkheHc9BcyqDQpVygXuAGIxFOgcxH%2F3O%2Fa62Iq0BhmXDYmZ6%2BJhRRzkhRUYgzv41rnasMc8lSf3%2FA7IYSS4hyvJOhAqLs8kKkzA49NuhdK7HzygcV%2B%2B%2BzWdmvgNx1%2B9VPHyRoL3ArHmVZdq1tWCAp7H9TtG8uOLuzmecvK4YFCZeMOAgb9jgfBkuiNAaii7yxn3kZhRTf46xePde0ja8JHfQu2n0g3U69aTMY86tBQ2jBJC1YoyTSBvMHl2Jac4gNwOMMdjXUnJUzvJNDS0gZM1%2BhSrC0Zk0UeHQJb3yuLQ4nyPVg8B3tBTrKJjFINUkxgkz5k2FZWImdcSvyE0ZYNFq2d%2BqQyN3w6bcXpJyImDk%2F%2B7VaDiGPmIn%2FW6juEuxWVc4jQXLu%2FTCzYGeOrWsOvfvW0pLML2QukTdeISgxAWBUMUsrMLTma6kvB1%2FLcAxjLf9Mn4epVX5Dse3z0DarBkrrnMq1Ic1W73EocfMoCBB4GeUg23XGVNDhGFoJ%2F5z4JHOqPr6Yfe1m4bzs92PH2GPFxX0VRcKwRTd%2F82X9B4MJHaps0GOqUBzpRbBbHfHk4uwarOrotfSaeCY4iMV1C9L8SV0otBJwgrYKPesXJ8eJmbHSPnfNM8xQSBHmyFs%2FYq6lsBJCjyC8kngBjX8a5qxDSCswKb8RmIVjvMzvLke6ULYElGGjTjujtdDg10To%2BZEQ3AIN2I8UWBZLEJZVw%2BCGuSdPhjVHm8KkpTG0lY5CL9KqpGV0MBfAA7RxdUUCLPP78zQMju2g%2FzgSsn&X-Amz-Signature=ceeb38cb6d8d5991a28ab246cec72418fd2aaae364373fd0dff515a965f4c607&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XLAXZMI%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIHU8niYIcaMufVVRTqSwn%2F%2FJvoBkFdnKqaCyQcHSL6FOAiA0bm%2Bj7NBuPk9xcdn0iBBYkkKK6gfEBsxiUxOLYzZ2mSqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOrl8cJrfu2o8JxELKtwD1grqlpl%2FIV02MuJXuVUD2J4gbSNPfDdfCaOADXidz2R%2BuXwapZnY1hpyx3hmAM%2FRy%2B3dw0h%2FCyNQ%2BAa9iRi3ktUkSGBOjORt7EFJ%2B5%2FzPnYvZB7v9GeyzczrF4tNcXnPH7jJ8TI%2FRYScBN1606NH4McAR0Fd2EGM1fTAh8rbzImbCCtvixfGKoIYDKX0Ds%2Btip3kpqNxP9q1py4anhSuA%2B3vb12sG5R%2F1iUvupANNqdQ6GXODKg3qpFXGUXGFooJgUVde9S7haR517D%2F3G3R8V%2FdYnff5E0iKOmvq%2BPjC9GVeCTOD%2BSO2Q4ajJOYSYv1K9H8lAo6xli7LiYpkuIi%2BtG96JNuBDFtE7D3JPCyU3yGoWJ15zxTuhcAEc%2FYr01wxILgF2yIDuISDs2SiRyuXeP984vc%2FsW9%2BdFuugQeHV7Bd1prnPKBxRgdoE4HmiYmjuS4O%2FN31mFWmIUQBExv12N56IkX78yAo6c2gOw%2B6lepm6ZIN6jqY8FxOzhu4NTt7Vstv%2BAMMQdTVGzOBP8irtB4kNxsj7Qu%2BApwV4QXLu7AjNL3jkJlYG92jtw1MgjxyAv3q2cq3jCX0W%2BAqO6aRmnEjNEnfzmYWN2ywtQMZ7Npv4OKNoYOxoJmkvowqL6nzQY6pgGKmDzXLVtQqrmN2Csx3e5zIcpm3bz6%2BnDnreqPrCF8GO2OujhCeo829Zywkg6XZwkmTiWa%2B6d%2B2%2FHRak388xez6mZSDp7Loj37pAUSi5ZZeulBVtJtNvqALYlV%2FUkkZQmNEHrAsH%2BjlnbphiX%2BmRQlvol%2BiB1%2FviKiTw23%2F6xiFWrEJWfVgcX8AZ91KJD1qrVUrCti3SQtJ83fH%2FfJp3jK0RW62UwU&X-Amz-Signature=f70ee1a616b3b85900522668f3413aceb8c0e9a9511afd89121d1658a5f13ead&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XLAXZMI%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIHU8niYIcaMufVVRTqSwn%2F%2FJvoBkFdnKqaCyQcHSL6FOAiA0bm%2Bj7NBuPk9xcdn0iBBYkkKK6gfEBsxiUxOLYzZ2mSqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOrl8cJrfu2o8JxELKtwD1grqlpl%2FIV02MuJXuVUD2J4gbSNPfDdfCaOADXidz2R%2BuXwapZnY1hpyx3hmAM%2FRy%2B3dw0h%2FCyNQ%2BAa9iRi3ktUkSGBOjORt7EFJ%2B5%2FzPnYvZB7v9GeyzczrF4tNcXnPH7jJ8TI%2FRYScBN1606NH4McAR0Fd2EGM1fTAh8rbzImbCCtvixfGKoIYDKX0Ds%2Btip3kpqNxP9q1py4anhSuA%2B3vb12sG5R%2F1iUvupANNqdQ6GXODKg3qpFXGUXGFooJgUVde9S7haR517D%2F3G3R8V%2FdYnff5E0iKOmvq%2BPjC9GVeCTOD%2BSO2Q4ajJOYSYv1K9H8lAo6xli7LiYpkuIi%2BtG96JNuBDFtE7D3JPCyU3yGoWJ15zxTuhcAEc%2FYr01wxILgF2yIDuISDs2SiRyuXeP984vc%2FsW9%2BdFuugQeHV7Bd1prnPKBxRgdoE4HmiYmjuS4O%2FN31mFWmIUQBExv12N56IkX78yAo6c2gOw%2B6lepm6ZIN6jqY8FxOzhu4NTt7Vstv%2BAMMQdTVGzOBP8irtB4kNxsj7Qu%2BApwV4QXLu7AjNL3jkJlYG92jtw1MgjxyAv3q2cq3jCX0W%2BAqO6aRmnEjNEnfzmYWN2ywtQMZ7Npv4OKNoYOxoJmkvowqL6nzQY6pgGKmDzXLVtQqrmN2Csx3e5zIcpm3bz6%2BnDnreqPrCF8GO2OujhCeo829Zywkg6XZwkmTiWa%2B6d%2B2%2FHRak388xez6mZSDp7Loj37pAUSi5ZZeulBVtJtNvqALYlV%2FUkkZQmNEHrAsH%2BjlnbphiX%2BmRQlvol%2BiB1%2FviKiTw23%2F6xiFWrEJWfVgcX8AZ91KJD1qrVUrCti3SQtJ83fH%2FfJp3jK0RW62UwU&X-Amz-Signature=ada7027df5fe3085867d752784bac432e8aa406c5e83b727c8d0ca4dba7fded5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K5UHFRI%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIAFejUqkLQ5oAIlKrH6raOQjYHBvIBCemIQBErkxTWhaAiAFrdXckBuC2yCihQpYjUQYBC%2FU8CWxsu0mEU5qK%2Bt9KCqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYCgvtIq7v4bP6muPKtwDPZXPcpDQg7WfB8%2FjpigQ5OO3narH5lsLcykC1j76tZJUt49Cq3gEKbSog8M5JZAXV4z%2FHlv7qfckTv40sYF9Ik%2FNeTwfDrNi6x%2BEJZRUbwEn5jI%2FN6mzCE0MWu2edXxt9nf7hpflA4CecRU5RVTvw4mDIESfuwLvlpUQ77HSVp5C%2FhHhBN9YITQvH%2BSXKw%2F5lG3E6aEC20TFeudqNzk8pWWjsixm4u9zBubKOYYf7beTIISRGz5dDMXvTCjmoeo9Crs1ITLVNl1docZalve5wxbH2MGRHIRf%2F8mTLAHyF3OI%2Fd1CjUROj15gc2qsM2BXmajTBzhpB3m56QjIZq46NJYLwwGtb4mwz3EZ5Z0R8QG37O0lHklsWvNfa4zRfQ%2FFX3uQUVpQ5bWIcdox4PIfdpTHULhdyYNTFxP77PkoYdf3IKG0fkr%2FL8kT7JfKN%2FAr14h31x4eKvt0xIEBWSbI2lajWUdHlMUtcc%2BP6xq8%2F%2FF1U%2Bm1KmYi539tQ2HUCcOB01kIkvPTyRKaT8UuuK6bbi49fRBrdH9zLZe6k4iGtPavTolN6sxWcjevE7yrbkZxIXmuPkw0W0uBvsKUBRHcM9Ngl7dYCAGgWQYtnqipUD6JMySOMXvJkahUCaUwk9qmzQY6pgE8DTOWpqvW34pXcxXUUp4C25i3i4vkKnEXSC5aMHZHtDl3%2BnUIIpd27Ak4jBy3jX5ZEbAot7hzOnHv0e6gMacrC0aTaSBLqI4SNDyPozOBZYjFqTo2uxYLkAdAx8MPb6pqPuXb0UufncCjX5VeLAu5eN%2Bz5yLjaZS0CFihcWGZ9VaCRcCZ5I7bzhCn9VjwmctRapj0YIKgZ1qgBnXKHuV6In39XLbM&X-Amz-Signature=653a60ca9168e542df186e092d30d639ed6b81b4444392c125cd708e8881e160&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SNGKLJ5%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIEA%2F7PwwF%2FFeJLrVM9BJeABvj0BeEU2FpHscZaxwOeKSAiB87iPdJ4CXhX6s%2Fsjh%2FbpUmQpnpLwzNVgvZxoppVay5SqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM72VLSqa8kJTybjQrKtwDMjgQgKjyNmkc4CYkv6ZBF%2Fak4zVR5KqJLH4bhfAvGp2E0hHp5qkcirYU0kNlw7yhF67qBGvB%2Fy0roFo6GQpZ3WWXO%2F44wSj0SfablvhV1idV21P7nJLEy53nwWZeF93a1x9Iox5M4fGEM%2BtfXVN4y8kdkXRDkFZlqbfrJ%2F34k0ZqpGxogodekhObOuqLCfSqvpsM6CvLb%2BQ3ilweGi%2FO%2BjkLYtPvDzxi29TYRk9HGiN0tgEQDEvRpC3uBi81DcQo%2Bz4YlzPTylqywiq3fvdNi3Ib2Yhgupo8C8ggqStfhL9BiBAAOO%2BlsxgWHdM9eC40dQP91KL5hMQdYzaOlIknGl3lGqaMubCVvpK%2F5OhFaJ0nfhzAPkDvHmUB6Kgc3OVOdGt%2Fw2WRKtDjNgDiTLuSaUsepNk%2BXiRZBgQlHpyVPhqbCNEss2sjV2FblhfAuC7foB6teHttY3t3Zq2y%2F3C8GZRzQfMzs2rHcpsZaL8EKNcINwn8phQBGS%2F%2Bl%2FSw0fWhqIl0Yfi3v58DaxPHtcHo6O00%2Ft7QDV8ohZug8tFeaAAYhMnQBIqBfEJ39r0UCIAc%2Fw0qLmn34fCCYMRUXO8JV1JOauk0K16FxBoYpmSfY2fw9HEcmmYLYadNoMgwnMSnzQY6pgEu0Z0p1h5lig2XpjClZIMHkaI5enu51K%2BBRlPqpOB8%2BZDJTdx7ZPoY6ADS3lG8vGcPkpItyntE3amu3UduhRqysOwYmAS3hXmmKrVr4eb3pi4hBVr8yt%2BLuTuIc67JxpQpkywQwFKbwFq9Dm4UGzDsqFpPGwSSIrl2SU%2Fq%2Bp%2FYh328%2Ba8SBKuogM6VjShUhzBFys%2BPkdoz5opx%2B1zorCz18WExNtmi&X-Amz-Signature=66e6b789c6d9fa2a8da6f001efacebfc3ad2030e7300184a4b748c1ec135c399&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SNGKLJ5%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIEA%2F7PwwF%2FFeJLrVM9BJeABvj0BeEU2FpHscZaxwOeKSAiB87iPdJ4CXhX6s%2Fsjh%2FbpUmQpnpLwzNVgvZxoppVay5SqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM72VLSqa8kJTybjQrKtwDMjgQgKjyNmkc4CYkv6ZBF%2Fak4zVR5KqJLH4bhfAvGp2E0hHp5qkcirYU0kNlw7yhF67qBGvB%2Fy0roFo6GQpZ3WWXO%2F44wSj0SfablvhV1idV21P7nJLEy53nwWZeF93a1x9Iox5M4fGEM%2BtfXVN4y8kdkXRDkFZlqbfrJ%2F34k0ZqpGxogodekhObOuqLCfSqvpsM6CvLb%2BQ3ilweGi%2FO%2BjkLYtPvDzxi29TYRk9HGiN0tgEQDEvRpC3uBi81DcQo%2Bz4YlzPTylqywiq3fvdNi3Ib2Yhgupo8C8ggqStfhL9BiBAAOO%2BlsxgWHdM9eC40dQP91KL5hMQdYzaOlIknGl3lGqaMubCVvpK%2F5OhFaJ0nfhzAPkDvHmUB6Kgc3OVOdGt%2Fw2WRKtDjNgDiTLuSaUsepNk%2BXiRZBgQlHpyVPhqbCNEss2sjV2FblhfAuC7foB6teHttY3t3Zq2y%2F3C8GZRzQfMzs2rHcpsZaL8EKNcINwn8phQBGS%2F%2Bl%2FSw0fWhqIl0Yfi3v58DaxPHtcHo6O00%2Ft7QDV8ohZug8tFeaAAYhMnQBIqBfEJ39r0UCIAc%2Fw0qLmn34fCCYMRUXO8JV1JOauk0K16FxBoYpmSfY2fw9HEcmmYLYadNoMgwnMSnzQY6pgEu0Z0p1h5lig2XpjClZIMHkaI5enu51K%2BBRlPqpOB8%2BZDJTdx7ZPoY6ADS3lG8vGcPkpItyntE3amu3UduhRqysOwYmAS3hXmmKrVr4eb3pi4hBVr8yt%2BLuTuIc67JxpQpkywQwFKbwFq9Dm4UGzDsqFpPGwSSIrl2SU%2Fq%2Bp%2FYh328%2Ba8SBKuogM6VjShUhzBFys%2BPkdoz5opx%2B1zorCz18WExNtmi&X-Amz-Signature=66e6b789c6d9fa2a8da6f001efacebfc3ad2030e7300184a4b748c1ec135c399&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653M2JJTE%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T202524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIAsIAvXd27PaCaH3o66v3vNhkA8w7MgwiLCwNmzv5FoOAiEAulBuKuB8Fmz34Ad2R%2BDdFWH0pRVsV1cRBj1QLIUD8sIqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEBE56va7Odi8hEC7SrcA9sIB8ZI4oTXm30mNHPi3fJ23uZW8yY1s1pSnfKu%2FdR%2FpEsWkwQQT8zngRt6yuFQTRi8Dt0W54bV58y2qCRMohwEExSBnaAfYK1QhKGFWr1UlDxwhzlY%2Fu4ik%2FaepqJn5bpmOW1N%2FqpESus3HRFqrL3LQGWoVNjhSJISjIcAsDBkFWMzQGF1cHuMx%2Fd8ebUT9%2FediDGUbQbI8HpMyGU0eHVMrxqxhIKmHuoo1jCXmAdv3%2BdtwLPC7IG%2FaFdyUV5m3g4xUiIfCp7ZN6NlphYduXDQCLfMA2GTbWmDBkpLobwNOTjBZ%2FhvJuCQomIqWRa%2FoYEbwql3rt2Ya97cIco90X28lEY%2B3m1pq3tfX3%2BQCkbS9YNZi6MOQGid2lyzKc3bnaQDTGSGWFVv%2FiPy9DA9nsNz57UDGHZ4E4Ue6%2BvfUOwsXNnenNKrBokxPJg0UFfgQufsOzYcsqw51cpFbG7TTk2vOwiQacaN5vs5bsz9NKMvS7zCYoSjkqfaTkJIXPjWTOqBqEPq9EKtLehnYh2JWvkT%2BkLqhST7FTyt%2BJ7PoIG2MygalbD4QZQ6VAKSxGzaf40243Drtt6MWmM8fxWyZaIprBRf4R%2FoINkLNvrSZjQPP2%2B78ckPdJSfGwxWMLzaps0GOqUBts7cK42z%2FHIcbRPG9r70hMXm%2B%2BsxLm5kzIdS8echSQfWGu5y9LNAwHQ1dog5vEcoOxkZNO%2BHbr%2FPLDJaFMXVYUUpLh9JepqK1UJdXv4%2F3wU7nxcTzGCEsseTjd6rtybn55%2BbmwyB4Qg8RzCrg97gbi6yzVDvq6YCg6LuLoRSHpmxJQDE466GqlT9cSyWbGpV8PNu7tK9lmLOfc7Vo3kJQO99Aev%2F&X-Amz-Signature=bb6dfb5d3298878ae551820f2e2713a6915de6cb77501fb530ee097021a29002&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

