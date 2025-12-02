---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USVZ6PNB%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T220043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCLQISl1Yd4H8rH%2F5tHOn%2BhSC8k6sXjCGFV4G2LXPBFLAIhAJeRAnvsMp%2FQt8PjgpfaaMhblTkXaq7h9herhYJlUnt7Kv8DCB8QABoMNjM3NDIzMTgzODA1Igxzh9n4K%2B4hq%2B3Og0Qq3AM1tPdhviB8vi2bKkFIxN1oeatKOCQfR4XCg1Y6xezRCBABtg1Acm7itSHgnXloL4sf66TI%2FPuiE%2FzHSD9eoMuPmKUi8wMzGeAL4roqT05uoU3fVm1RYSG7Gdtw1RwvTPvab931biGAxvYI6%2FVRoy3aJ65BwDzk8HyZSCOJStSDlO0fEAZPZyomXCkMyiBTlwknv5PE0kLAXd2d1YXkPCJoUBz%2FZl7xP%2BdmtaGXUaQL91vl8tJ5AhqCHjYGK8H%2BHZK3WDC6K35%2BfQ%2FDkv8JdUXR2LKpaleWG77kZjf61oTwYBKXg5izmdYJiAF1fZ8paFSFNRM%2BTYc52xSbzBn%2FgTybmWJ7%2FaWJlo4of%2FALOKTbgBjUfCgyqZYpfQSQLAQp1b9QXh7o3ORyjE2eeeZra6b1iro%2Fsj%2FAW%2FYEO%2BFLZbLSBLh%2Bz4wBpzETiAUEf0Ou%2FS9b3Iq47PC%2BDyBdrIoWIZaT6DWvbhNB%2FS7P2FSNwmjeflNMNxnOpM9IQ7wc49viuWUYKAojwLnVQ%2BXzFSD9kLpcnAHtyI3XoLudvRY%2Fjdnf1zeXjATzY0OHuIWhfRNwc%2Fs2fM4bIqlcu%2Bu6mespLGxUiAmwwQxWweY7gIu5e6rpOyLh4BEpCniVKB%2BxoTDhtb3JBjqkAUUMZ9NcJ5QO7MMQT%2FNFxlr5lP6t9rDz91b6qK8s5QiuFFGzR6AnycStr5zFWT0OuW4dJKe7BRVsMrbTAESNdb1hcCg03a87sUkeSIWkM2VsIzuL2QgfdfjsOtBgDnBzZdLvLJm3A515%2FxS9UrkHR6ndJahAfJismpqwosTEcwenhngAuG0vPmleEMBw3jYNAiHPBxj2A5kBmOpBRLE%2FI00iiUoF&X-Amz-Signature=093eedcbfc47f4086f436954122596a00a2bcec3431b625f4c20cff60ad4b659&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USVZ6PNB%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T220043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCLQISl1Yd4H8rH%2F5tHOn%2BhSC8k6sXjCGFV4G2LXPBFLAIhAJeRAnvsMp%2FQt8PjgpfaaMhblTkXaq7h9herhYJlUnt7Kv8DCB8QABoMNjM3NDIzMTgzODA1Igxzh9n4K%2B4hq%2B3Og0Qq3AM1tPdhviB8vi2bKkFIxN1oeatKOCQfR4XCg1Y6xezRCBABtg1Acm7itSHgnXloL4sf66TI%2FPuiE%2FzHSD9eoMuPmKUi8wMzGeAL4roqT05uoU3fVm1RYSG7Gdtw1RwvTPvab931biGAxvYI6%2FVRoy3aJ65BwDzk8HyZSCOJStSDlO0fEAZPZyomXCkMyiBTlwknv5PE0kLAXd2d1YXkPCJoUBz%2FZl7xP%2BdmtaGXUaQL91vl8tJ5AhqCHjYGK8H%2BHZK3WDC6K35%2BfQ%2FDkv8JdUXR2LKpaleWG77kZjf61oTwYBKXg5izmdYJiAF1fZ8paFSFNRM%2BTYc52xSbzBn%2FgTybmWJ7%2FaWJlo4of%2FALOKTbgBjUfCgyqZYpfQSQLAQp1b9QXh7o3ORyjE2eeeZra6b1iro%2Fsj%2FAW%2FYEO%2BFLZbLSBLh%2Bz4wBpzETiAUEf0Ou%2FS9b3Iq47PC%2BDyBdrIoWIZaT6DWvbhNB%2FS7P2FSNwmjeflNMNxnOpM9IQ7wc49viuWUYKAojwLnVQ%2BXzFSD9kLpcnAHtyI3XoLudvRY%2Fjdnf1zeXjATzY0OHuIWhfRNwc%2Fs2fM4bIqlcu%2Bu6mespLGxUiAmwwQxWweY7gIu5e6rpOyLh4BEpCniVKB%2BxoTDhtb3JBjqkAUUMZ9NcJ5QO7MMQT%2FNFxlr5lP6t9rDz91b6qK8s5QiuFFGzR6AnycStr5zFWT0OuW4dJKe7BRVsMrbTAESNdb1hcCg03a87sUkeSIWkM2VsIzuL2QgfdfjsOtBgDnBzZdLvLJm3A515%2FxS9UrkHR6ndJahAfJismpqwosTEcwenhngAuG0vPmleEMBw3jYNAiHPBxj2A5kBmOpBRLE%2FI00iiUoF&X-Amz-Signature=093eedcbfc47f4086f436954122596a00a2bcec3431b625f4c20cff60ad4b659&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSN32SAZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T220044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIBHoL0Vf%2FRMuWy9E4bs4PhTbuwdyRzgmc6IgaQJWfmMpAiEA%2BKNuxRA9%2FGvZeqY%2F%2FxgQy%2FvRxCOklpUPp%2FXn6GDBY%2B8q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDB7lVgAXX4Thqn2OZircA%2Fb0G1gUohxr65El19I9m2%2BwnLrR41WQZuX8GDpIWuh%2FKmxKVDRcJYuOSM4RWVEgN3GUuSuqSl8jCe%2B5Q%2FC%2FeKPHEJfPl7WRkUCnFGyBZ6EZ73CfFfwRuBtGBbGaiKOzcLsJm%2BJnSmoHf67vwa6smeFh9Xwp99TEksfGVFfcjIEbvV%2BlQF80lLcxqMuO%2B7HwWwTX7YSrB9h6%2Fe6qBmr0%2BM5%2BpJ6QiFTxGpQl4OnqtZGdmIhenqCjPAQ8uQSZxDPKP27abIlcfHKw7ANt4SzZoSB7AWV%2BCeffQ2q1EW8n6t%2BPE2SM1VgvRbLqzV6JnuzYPdEBcKad8dMICVHnFgcYKpBh7tG9cCtYFVk6XyDqEIV2Xb9n6cyu7ckS4Soc7Fg2EEGwLQe89m%2FPjaiCTiJd3N8r7H%2FfAo1Z38GcP9lMlPFRxfk6BbRMfgmhtA49QA%2Bx7L7fHgdzBqLkZ8OZ%2B1u0oEj2ZeQcK1O9tjVeXMntsf4Ex4BzYpCT%2B3ddeV9utR8LFurqVFKnG0q3lOXvIlRUHDd32Cd%2Bn21phCyQXKJ0nkevU0wY3SZ%2B0%2Fa7Ydm8qJji3nqs%2BwtxGQASmyZbiIOHhssowI6l8Mifp8E4W6uNoarP9H8JLu8tph71yqHHMMq1vckGOqUBHLUHdNTIsYevOWF2G%2FHI4eBxAgMmVjyS2XGbu4%2BPyGFPIe0kjJpV0KVx2j%2FamD42cDzEnkLwEzV5DfnyIhx%2Bl30aQClZ%2F2EyIXpEYu%2FN4TvOdp%2BtJ8ZH%2F0%2Bw3D0fa%2FpGGdbgUGePEn8n%2FDm5Y1tP2xntsFuMg3%2FvA22N%2FLJKeyaRdd%2BAV5mkv7gj%2FsIwLnkjtv%2BBp4D30I%2F2TK2Yy75pc9oOkpe9&X-Amz-Signature=40f113ecdc39340a8561ea67e832cbc4bb2d0f949f9fcc5359054ca5089da73d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSN32SAZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T220044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIBHoL0Vf%2FRMuWy9E4bs4PhTbuwdyRzgmc6IgaQJWfmMpAiEA%2BKNuxRA9%2FGvZeqY%2F%2FxgQy%2FvRxCOklpUPp%2FXn6GDBY%2B8q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDB7lVgAXX4Thqn2OZircA%2Fb0G1gUohxr65El19I9m2%2BwnLrR41WQZuX8GDpIWuh%2FKmxKVDRcJYuOSM4RWVEgN3GUuSuqSl8jCe%2B5Q%2FC%2FeKPHEJfPl7WRkUCnFGyBZ6EZ73CfFfwRuBtGBbGaiKOzcLsJm%2BJnSmoHf67vwa6smeFh9Xwp99TEksfGVFfcjIEbvV%2BlQF80lLcxqMuO%2B7HwWwTX7YSrB9h6%2Fe6qBmr0%2BM5%2BpJ6QiFTxGpQl4OnqtZGdmIhenqCjPAQ8uQSZxDPKP27abIlcfHKw7ANt4SzZoSB7AWV%2BCeffQ2q1EW8n6t%2BPE2SM1VgvRbLqzV6JnuzYPdEBcKad8dMICVHnFgcYKpBh7tG9cCtYFVk6XyDqEIV2Xb9n6cyu7ckS4Soc7Fg2EEGwLQe89m%2FPjaiCTiJd3N8r7H%2FfAo1Z38GcP9lMlPFRxfk6BbRMfgmhtA49QA%2Bx7L7fHgdzBqLkZ8OZ%2B1u0oEj2ZeQcK1O9tjVeXMntsf4Ex4BzYpCT%2B3ddeV9utR8LFurqVFKnG0q3lOXvIlRUHDd32Cd%2Bn21phCyQXKJ0nkevU0wY3SZ%2B0%2Fa7Ydm8qJji3nqs%2BwtxGQASmyZbiIOHhssowI6l8Mifp8E4W6uNoarP9H8JLu8tph71yqHHMMq1vckGOqUBHLUHdNTIsYevOWF2G%2FHI4eBxAgMmVjyS2XGbu4%2BPyGFPIe0kjJpV0KVx2j%2FamD42cDzEnkLwEzV5DfnyIhx%2Bl30aQClZ%2F2EyIXpEYu%2FN4TvOdp%2BtJ8ZH%2F0%2Bw3D0fa%2FpGGdbgUGePEn8n%2FDm5Y1tP2xntsFuMg3%2FvA22N%2FLJKeyaRdd%2BAV5mkv7gj%2FsIwLnkjtv%2BBp4D30I%2F2TK2Yy75pc9oOkpe9&X-Amz-Signature=40f113ecdc39340a8561ea67e832cbc4bb2d0f949f9fcc5359054ca5089da73d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NBQXFX4%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T220041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIGsW5JKT8F2If922Cgq5C7Md4cvCCrqb3wPtw4G7gVeeAiBonehDxKuXGncRaJ7hliXlHqtmgBwnDMbrlNmxijvFpSr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMjvQ9FYp%2FPvQuOrR5KtwDSFLm7Rkjjt6jVddF41MCjLdYA1zNWx%2FahjFWC4hHFlbJwtXDs%2Fvo%2BggUcIE5qwps2cRIb1JoLKeoT45wu3fI2x7OpYpYnNK9RPIfo%2F28VcE6JXEd8gE%2FVIqiNlBgl%2B3o6LkvPg%2B5VzO8pr4rCCIYbCiusgqC8ImD7u7GxEuAIppibv0PSmKLL1egJwMicOTmm6GLT6mq3aaBjdJRJxomY46J%2BrWX%2BPrgClWuThJe13lNXpP%2Bxh%2FtVCputg6kjXqML%2FPrKUDSt51UEyDQicfnXPyVmg%2F33%2BjzAA1SmuipmCGinQc1DvelZc2kx2PejNynffepWx59U13WCpYjPFmzSBRDdTtPB4jK9JJ7SjQLXmg6lUmAhZsobi9NCvTXo1Ma%2FMlzd14UWeW3Dj44LYoQ1%2BUAJU2gs6E7rXzYnU%2FMz%2B%2FjQQgydXTAmZlvHbitrX6kt1dYdHPrmPaJDeuK3rd%2B6KH8d6yVgnLvjJ7o8Z9h%2FGe1X24oOmW2y1m8DF8Ks6uWsdBhl5sMNd5fo9rhuIJx4LGIVOM3EzfEhxCWNpJSKCZJHl8G52qyOd8jBoiq1uUUHvA82E0aSk0SDIQ3tTgld2rPjojgQBsBYFVA%2FgcPica3X%2BqqSp%2BfpcKeBMkw8LW9yQY6pgG0juBH7pEfGTG6DiBvfkudusZ1%2BCiaETdgkcNPGkImjf%2BRsTIgSpxeom7LXXUEOr7Qy8wzqN2VVQ6Jyc4esbdbrbNGxgOTYg91BeUNsXiIq%2FE4dwW8HtzX%2F4gyH7XMMOpxemPTDX9t14ZvHN8JEnDda3HbfxonMKyuLGaq2YlVx9O6XLZBHl9pI8YZ5V1DRtvUOa1k0pYMX7a4jginZ7LZIXgB24Mj&X-Amz-Signature=3156e72668a16aecf14d2c009e584d103f88d9ff5cbad6a3f0601b22ac580432&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZBAKKRY%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T220047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCdNisCj0DT9kWnBh8hQ4lihfcKPhH%2FHqHlgvTTxTMQuAIgfoyX1qpAxKDRHc%2BXCig5yw904wYoHNFYXfDsONb6DDgq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDK3iq7Cw9UoJxlFebyrcA9mu4C3ldrCwSOhL4eIU8NIkAICQiJkkKKFCQNKK7dJwLzwBEOHF2u%2BIzBq2XBCab2cOAzf1%2Bwj0r3zjvI3xKd7zFYkUaulTEPHtSlp%2FUyMPaQ3pi6HXVBQlm%2B%2FSCAu2XRcoJB0tORwhVDIb0Lj1DrUwnVCxoj7EoeBzOCfNI07Cl436o8gdW6HwpLxGBGlQXwdgTA%2FhzqDPg5I%2FzuLS6ZTK3qUWMMLuBwwg%2BHdbZQEmCU%2FDBfmMDt0dQMQJ1JgJVNbi8r3jpLb%2FYqH9vCaU3xzsUx7feVkRq0rriwy8h5NJHFtJdAwq1x1tjtPwsng9tzwgWftdfXArKm87W9hyqxcXZ%2By8dmj43JYlFnNhHrT%2BOnwHUMcmDVaEAFagXYAV0Z%2BaQ7mKM5UNUq7KVWQqGeYdn1Zysvqy8yTKFmts04edhmOilRTB1zNO66vY8Tu5QVePtEbONegqRXdQBfqG%2B3kxjVOu3Eqc6jPOwuek6F0MvmEG4u6%2BNovAg6%2FZ0S2et5NpW9wQUeANo7Ldq5Z3s3JnT5GFvIcAxtZEanMFyxOVuTIjY1ssoOZlV5gbdNuBkM6ILDBbBKsvUrq6oftKo22zsb8tltNyjoidTtn%2B%2B2L0hMMUdemYxpVKT1oTMLG1vckGOqUBIO3rU%2Bqm7Mqrpp%2FmVpdmCTy5kIWFzZ78Vg3AZtiqpsYbz2vZIhutzVT9b%2Bi9sftGTRP7xiPc%2FXvix9hKTm3fYi0baEez8q7pSl49SGnXslCOhb8%2Bje%2BMRbjDpwB%2BxCCVf0eZnDyNJyvTxJQbUYQchGfUMEdPA5KnpBJLNRdqNKJY%2FB90Xsub0MjZXvYTeURG1qwFbqvfUVvs%2B336uc6v3f4UtUpk&X-Amz-Signature=7a4fb02af77d29a97b151da5c5979df167eba545b5402444b76afafbb6af844b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZBAKKRY%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T220047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCdNisCj0DT9kWnBh8hQ4lihfcKPhH%2FHqHlgvTTxTMQuAIgfoyX1qpAxKDRHc%2BXCig5yw904wYoHNFYXfDsONb6DDgq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDK3iq7Cw9UoJxlFebyrcA9mu4C3ldrCwSOhL4eIU8NIkAICQiJkkKKFCQNKK7dJwLzwBEOHF2u%2BIzBq2XBCab2cOAzf1%2Bwj0r3zjvI3xKd7zFYkUaulTEPHtSlp%2FUyMPaQ3pi6HXVBQlm%2B%2FSCAu2XRcoJB0tORwhVDIb0Lj1DrUwnVCxoj7EoeBzOCfNI07Cl436o8gdW6HwpLxGBGlQXwdgTA%2FhzqDPg5I%2FzuLS6ZTK3qUWMMLuBwwg%2BHdbZQEmCU%2FDBfmMDt0dQMQJ1JgJVNbi8r3jpLb%2FYqH9vCaU3xzsUx7feVkRq0rriwy8h5NJHFtJdAwq1x1tjtPwsng9tzwgWftdfXArKm87W9hyqxcXZ%2By8dmj43JYlFnNhHrT%2BOnwHUMcmDVaEAFagXYAV0Z%2BaQ7mKM5UNUq7KVWQqGeYdn1Zysvqy8yTKFmts04edhmOilRTB1zNO66vY8Tu5QVePtEbONegqRXdQBfqG%2B3kxjVOu3Eqc6jPOwuek6F0MvmEG4u6%2BNovAg6%2FZ0S2et5NpW9wQUeANo7Ldq5Z3s3JnT5GFvIcAxtZEanMFyxOVuTIjY1ssoOZlV5gbdNuBkM6ILDBbBKsvUrq6oftKo22zsb8tltNyjoidTtn%2B%2B2L0hMMUdemYxpVKT1oTMLG1vckGOqUBIO3rU%2Bqm7Mqrpp%2FmVpdmCTy5kIWFzZ78Vg3AZtiqpsYbz2vZIhutzVT9b%2Bi9sftGTRP7xiPc%2FXvix9hKTm3fYi0baEez8q7pSl49SGnXslCOhb8%2Bje%2BMRbjDpwB%2BxCCVf0eZnDyNJyvTxJQbUYQchGfUMEdPA5KnpBJLNRdqNKJY%2FB90Xsub0MjZXvYTeURG1qwFbqvfUVvs%2B336uc6v3f4UtUpk&X-Amz-Signature=7a4fb02af77d29a97b151da5c5979df167eba545b5402444b76afafbb6af844b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

